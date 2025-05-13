import { createContext, useState } from 'react';

const initAuth = {
	isSignedIn: false,
	username: '',
	signIn: ({ username }: { username: string }) => {
		username;
	},
	signOut: () => {},
};

interface AuthContextType {
	isSignedIn: boolean;
	username: string;
	signIn: ({ username }: { username: string }) => void;
	signOut: () => void;
}

export const AuthContext = createContext<AuthContextType>(initAuth);

export default function AuthContextProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [isSignedIn, setIsSignedIn] = useState(false);
	const [username, setUsername] = useState('');

	const signIn = ({ username }: { username: string }) => {
		setIsSignedIn(true);
		setUsername(username);
	};

	const signOut = () => {
		setIsSignedIn(false);
		setUsername('');
	};

	return (
		<AuthContext.Provider
			value={{
				isSignedIn,
				username,
				signIn,
				signOut,
			}}>
			{children}
		</AuthContext.Provider>
	);
}
