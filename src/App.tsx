import { useEffect, useState } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import type { Engine } from '@tsparticles/engine';
import { loadSlim } from '@tsparticles/slim';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import type { BoundingBox } from './lib/types';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import AuthContextProvider from './store/auth-context';

const MODEL_ID = 'face-detection';

function getRequestOptions(
	imageUrl: string = 'https://samples.clarifai.com/metro-north.jpg'
) {
	// Your PAT (Personal Access Token) can be found in the Account's Security section
	const PAT = 'f782de4964284310b33de271e42ae653';
	// Specify the correct user_id/app_id pairings
	// Since you're making inferences outside your app's scope
	const USER_ID = 'igrossberg23';
	const APP_ID = 'face-detection';
	// To use image bytes, assign its variable
	// const IMAGE_BYTES_STRING = '/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAAoACgDASIAAhEBAxEB/8QAGQAAAgMBAAAAAAAAAAAAAAAAAAYDBQcE/8QAMBAAAQMDAwMDAgQHAAAAAAAAAQIDBAAFEQYSIQcTMTJBURRhCBYikSNScXKhsdH/xAAZAQACAwEAAAAAAAAAAAAAAAAFBgIDBAf/xAAtEQABAwMBBgQHAQAAAAAAAAABAgMRAAQhMQUSE0FRYQaBocEUFiJCcrHR8P/aAAwDAQACEQMRAD8A3+RYY1unSYzCS0ttZUkAgktn0q5yT7jPyDUC4wdGwycH5U2Kt9ZQ7VI1qw5PkvQy3CSVPpf7aQjuKyFH25xzn3pHn3TVNy01Hl2hyy6YdkSpKsS9sl/6RlI3rRu3dxWd6spwnAGPIJTfl925fcLaoSDHXvyo6i9SlCQrU9wKln3OyWiaDN1RAbW3kKbSd7gPtwMkH/tTWy9afuy1iPfnXMAblITwkE4yf08cn3pSbYt1uts24XH6fUbiLAuY1MWyGkLEmUW0rcCRvUpQ5CtwKQCPgi4S1ZbDe4sd9NntDEe79m3uOBLTr0IR9jzodSMqUpTu9JJ8owD7UTT4ZCfv9PbP7860m+s+HBSrejWRuz2kAxoesGYxTW/Zlpkwo1vkuSly3UgKWQUhHJUvIHsAaKTemF8XE6sWmxyZkiaZrMh1jv8ArQNpUVqB8FW0njHqx4zRVVhsph1KlKk5xQ+7uHmikaSJrQerMByet2IwvtuTLa4xv2k7Rk84H9x/esHv92d01boenLXGcuiWrFIhLlpbcaQ2/JdK3VJCkAq2pAR7Zz7YxWudY9fxNIdQbNGkR5TyX4aisNNpUMFZAzkj4NK0jq9ZpbLr0PSlzkhrlZDaQlP3P8Q4/ap3F87bPucJEkx/hHv60b2TYXLrKN5sramYECSQRk9M6c6zmJ+eb5Hi22M7cnWGIQgFLbX0zSo4PDa1YBcTgDyMjJ/qbGPabH08SJt1Uzc9QqRliGg5QySPKvgc+TyfYDmmTUWpNYz7ctxoQdPQshCktupckDJUPUcJT6DwMq8YyaQ9VL0pCS8zapcq4SVOBZmPDO8/cnknlWcDBwn4NYnPjLkQ+qE9OtOVlYpeVHDCEkkkJyT+SuQzy5Y0ru6Ez511/Efa5s1fdkOtyVurIxgdlQAA9gOKKPwolU7remU5hCGYEgo38KUv9I/0TRTDYJCWQBSF4rIN/CRgAR0iTpVD1j1g/qDqJcJqlKcjB9bcda142MpOEJAzgeMnjyTSyze5KEuNRpDoDvC0oe4X9iAeaKKFK+oya6fbOqYbDTeEiAPKpHdS3gBLYc7RQkp3ApQog+cq8nwPJrljzxnPZbUfnugn/NFFRgEVch9xKsH0H8pg6e3x3T3UC1ajaZITGkJLoS4MKbOUrzz/ACKVRRRVzVwtoQmhG1NkWu0HuI+JI8u/Kv/Z';

	const raw = JSON.stringify({
		user_app_id: {
			user_id: USER_ID,
			app_id: APP_ID,
		},
		inputs: [
			{
				data: {
					image: {
						url: imageUrl,
						// "base64": IMAGE_BYTES_STRING
					},
				},
			},
		],
	});

	const requestOptions = {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			Authorization: 'Key ' + PAT,
		},
		body: raw,
	};

	return requestOptions;
}

function App() {
	const [initParticles, setInitParticles] = useState(false);
	const [inputImage, setInputImage] = useState('');
	const [boxes, setBoxes] = useState<BoundingBox[]>([]);
	const [route, setRoute] = useState('signin');

	// this should be run only once per application lifetime
	useEffect(() => {
		initParticlesEngine(async (engine: Engine) => {
			// you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
			// this loads the tsparticles package bundle, it's the easiest method for getting everything ready
			// starting from v2 you can add only the features you need reducing the bundle size
			//await loadAll(engine);
			//await loadFull(engine);
			await loadSlim(engine);
			//await loadBasic(engine);
		}).then(() => {
			setInitParticles(true);
		});
	}, []);

	const calcFaceBoxes = (regions: any) => {
		const imageEl = document.getElementById('input-image');
		if (!(imageEl instanceof HTMLImageElement))
			throw new Error('Failed to find img element with id #image-element');

		const width = imageEl.width;
		const height = imageEl.height;

		setBoxes(
			regions.map((region: any) => {
				const boundingBox = region.region_info.bounding_box;
				const leftCol = boundingBox.left_col * width;
				const rightCol = width - boundingBox.right_col * width;
				const topRow = boundingBox.top_row * height;
				const bottomRow = height - boundingBox.bottom_row * height;

				return {
					left: leftCol,
					right: rightCol,
					top: topRow,
					bottom: bottomRow,
				};
			})
		);
	};

	const handleSubmit = () => {
		fetch(
			`https://api.clarifai.com/v2/models/${MODEL_ID}/outputs`,
			getRequestOptions(inputImage)
		)
			.then((response) => response.json())
			.then((result) => {
				const regions = result.outputs[0].data.regions;

				calcFaceBoxes(regions);

				regions.forEach((region: any) => {
					// Accessing and rounding the bounding box values
					const boundingBox = region.region_info.bounding_box;
					const topRow = boundingBox.top_row.toFixed(3);
					const leftCol = boundingBox.left_col.toFixed(3);
					const bottomRow = boundingBox.bottom_row.toFixed(3);
					const rightCol = boundingBox.right_col.toFixed(3);

					region.data.concepts.forEach((concept: any) => {
						// Accessing and rounding the concept value
						const name = concept.name;
						const value = concept.value.toFixed(4);

						console.log(
							`${name}: ${value} BBox: ${topRow}, ${leftCol}, ${bottomRow}, ${rightCol}`
						);
					});
				});
			})
			.catch((error) => console.log('error', error));
	};

	const handleRouteChange = (route: string) => {
		setRoute(route);
	};

	return (
		<>
			<AuthContextProvider>
				<div id='App'>
					<Navigation onRouteChange={handleRouteChange} />
					<Logo />
					{route === 'home' ? (
						<>
							<Rank />
							<ImageLinkForm
								imageUrl={inputImage}
								onInputChange={(e: React.ChangeEvent<HTMLInputElement>) =>
									setInputImage(e.currentTarget.value)
								}
								onButtonSubmit={handleSubmit}
							/>
							<FaceRecognition
								boxes={boxes}
								image={inputImage}
							/>
						</>
					) : route === 'signin' ? (
						<Signin onRouteChange={handleRouteChange} />
					) : (
						<Register onRouteChange={handleRouteChange} />
					)}
				</div>
			</AuthContextProvider>
			{initParticles && (
				<Particles
					id='tsparticles'
					options={{
						fpsLimit: 120,
						interactivity: {
							events: {
								onClick: {
									enable: true,
									mode: 'push',
								},
								onHover: {
									enable: true,
									mode: 'repulse',
								},
								resize: { enable: true },
							},
							modes: {
								push: {
									quantity: 4,
								},
								repulse: {
									distance: 200,
									duration: 0.4,
								},
							},
						},
						particles: {
							color: {
								value: '#e5f6e4',
							},
							links: {
								color: '#3d9638',
								distance: 250,
								enable: true,
								opacity: 0.5,
								width: 1,
							},
							move: {
								direction: 'none',
								enable: true,
								outModes: {
									default: 'bounce',
								},
								random: false,
								speed: 6,
								straight: false,
							},
							number: {
								density: {
									enable: true,
								},
								value: 80,
							},
							opacity: {
								value: 0.5,
							},
							shape: {
								type: 'circle',
							},
							size: {
								value: { min: 1, max: 5 },
							},
						},
						detectRetina: true,
					}}
				/>
			)}
		</>
	);
}

export default App;
