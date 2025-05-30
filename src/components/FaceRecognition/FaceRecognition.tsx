import type { BoundingBox } from '../../lib/types';
import './FaceRecognition.css';

export interface FaceRecognitionProps {
	image: string;
	boxes: BoundingBox[];
}

export default function FaceRecognition({
	image,
	boxes,
}: FaceRecognitionProps) {
	if (image.length < 1) return null;

	return (
		<div className='relative w-max mx-auto'>
			<img
				id='input-image'
				alt='face detection result image'
				width='500'
				height='auto'
				src={image}
			/>
			{boxes.map((box) => (
				<div
					className='bounding-box'
					key={box.id}
					style={{
						...box,
					}}></div>
			))}
		</div>
	);
}
