import { useContext, useState } from 'react';
import { AuthContext } from '../../store/auth-context';

export interface ImageLinkFormProps {
	imageUrl: string;
	onInputChange: React.ChangeEventHandler<HTMLInputElement>;
	calcFaceBoxes: (regions: any) => void;
}

export default function ImageLinkForm({
	imageUrl,
	onInputChange,
	calcFaceBoxes,
}: ImageLinkFormProps) {
	const [isLoading, setIsLoading] = useState(false);
	const { user, updateEntries } = useContext(AuthContext);

	const handleSubmit = async () => {
		setIsLoading(true);
		try {
			const rawResponse = await fetch(
				'http://localhost:3000/api/process-image',
				{
					method: 'post',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						id: user.id,
						image: imageUrl,
					}),
				}
			);

			const res = await rawResponse.json();
			updateEntries(Number(res.updatedEntries.entries));
			calcFaceBoxes(res.regions);
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<div className='flex flex-col items-center gap-2 m-4'>
			<p className='text-xl text-emerald-900'>
				{'Give me an image file and I will detect any faces.'}
			</p>
			<div className='flex gap-2 justify-center p-2 rounded-lg bg-emerald-400'>
				<input
					className='text-lg p-2 text-center shadow-md rounded-md border border-emerald-200 w-80 text-white focus:outline-none focus:ring-2 focus:ring-emerald-100'
					value={imageUrl}
					onChange={onInputChange}
					type='text'
				/>
				<button
					className='rounded-md shadow-md w-2/5 hover:scale-105 text-lg bg-emerald-200 text-emerald-900 cursor-pointer'
					onClick={handleSubmit}>
					{isLoading ? 'Loading...' : 'Detect'}
				</button>
			</div>
		</div>
	);
}
