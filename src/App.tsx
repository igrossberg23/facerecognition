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
			throw new Error('Failed to find img element with id #input-image');

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
					id: region.id,
					left: leftCol,
					right: rightCol,
					top: topRow,
					bottom: bottomRow,
				};
			})
		);
	};

	const handleRouteChange = (route: string) => {
		setRoute(route);
	};

	useEffect(() => {
		setBoxes([]);
	}, [inputImage]);

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
								calcFaceBoxes={calcFaceBoxes}
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
