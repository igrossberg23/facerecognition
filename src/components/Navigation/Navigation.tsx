import { useContext } from 'react';
import { AuthContext } from '../../store/auth-context';

export interface NavigationProps {
	onRouteChange: (route: string) => void;
}

export default function Navigation({ onRouteChange }: NavigationProps) {
	const { isSignedIn, signOut } = useContext(AuthContext);

	const handleSignOut = () => {
		// Talk to backend

		signOut();
		onRouteChange('signin');
	};

	return (
		<nav className='flex justify-end gap-2'>
			{isSignedIn ? (
				<p
					onClick={handleSignOut}
					className='text-lg p-3 underline cursor-pointer hover:scale-105 rounded-md hover:border-emerald-900 border text-emerald-900'>
					Sign Out
				</p>
			) : (
				<>
					<p
						onClick={() => onRouteChange('signin')}
						className='text-lg p-3 underline cursor-pointer hover:scale-105 rounded-md hover:border-emerald-900 border text-emerald-900'>
						Sign In
					</p>
					<p
						onClick={() => onRouteChange('register')}
						className='text-lg p-3 underline cursor-pointer hover:scale-105 rounded-md hover:border-emerald-900 border text-emerald-900'>
						Register
					</p>
				</>
			)}
		</nav>
	);
}
