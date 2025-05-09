import Tilt from 'react-parallax-tilt';
import logo from './logo.png';

export default function Logo() {
	return (
		<div className='m-4 mt-0'>
			<Tilt
				className='shadow-lg w-max cursor-pointer rounded-2xl'
				style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
				<img
					src={logo}
					className='p-4'
					height={150}
					width={150}
				/>
			</Tilt>
		</div>
	);
}
