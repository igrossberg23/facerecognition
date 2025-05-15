import { createContext, useState } from 'react';
import type { User } from '../lib/types.ts';

const emptyUser = {
	name: '',
	email: '',
	entries: -1,
	id: -1,
};

const initAuth = {
	isSignedIn: false,
	user: emptyUser,
	updateEntries: (newEntries: number) => {
		newEntries;
	},
	signIn: (user: User) => {
		user;
	},
	signOut: () => {},
};

interface AuthContextType {
	isSignedIn: boolean;
	user: User;
	updateEntries: (newEntries: number) => void;
	signIn: (user: User) => void;
	signOut: () => void;
}

export const AuthContext = createContext<AuthContextType>(initAuth);

export default function AuthContextProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [isSignedIn, setIsSignedIn] = useState(false);
	const [user, setUser] = useState(emptyUser);

	const signIn = (user: User) => {
		setIsSignedIn(true);
		setUser(user);
	};

	const signOut = () => {
		setIsSignedIn(false);
		setUser(emptyUser);
	};

	const updateEntries = (newEntries: number) => {
		setUser((prev) => ({ ...prev, entries: newEntries }));
	};

	return (
		<AuthContext.Provider
			value={{
				isSignedIn,
				user,
				updateEntries,
				signIn,
				signOut,
			}}>
			{children}
		</AuthContext.Provider>
	);
}
