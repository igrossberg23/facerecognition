import { useContext } from 'react';
import { AuthContext } from '../../store/auth-context';

export default function Rank() {
	const { username } = useContext(AuthContext);

	return (
		<div>
			<div className='text-emerald-900 text-2xl'>
				{`${username}, your current rank is...`}
			</div>
			<div className='text-emerald-900 text-4xl'>{'#5'}</div>
		</div>
	);
}
