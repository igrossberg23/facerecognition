import { useContext } from 'react';
import { AuthContext } from '../../store/auth-context';

export default function Rank() {
	const { user } = useContext(AuthContext);

	return (
		<div>
			<p className='text-emerald-900 text-2xl'>
				{`${user.name}, you have submitted `}
				<span className='text-4xl'>{user.entries}</span>
				{' images'}
			</p>
		</div>
	);
}
