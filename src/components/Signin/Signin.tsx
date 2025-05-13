import { useContext, useState } from 'react';
import TextInput from '../general/TextInput';
import Button from '../general/Button';
import { isValidName, isValidPassword } from '../../lib/validation';
import { AuthContext } from '../../store/auth-context';

export interface SigninProps {
	onRouteChange: (route: string) => void;
}

export default function Signin({ onRouteChange }: SigninProps) {
	const [formData, setFormData] = useState({ username: '', password: '' });
	const [error, setError] = useState({ username: false, password: false });
	const [errorText, setErrorText] = useState('');
	const { signIn } = useContext(AuthContext);

	const handleFormChange =
		(name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
			setFormData((prev) => ({ ...prev, [name]: e.target.value }));
		};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!isValidName(formData.username)) {
			setError((prev) => ({ ...prev, username: true }));
			setErrorText('Please enter a valid username');
			return;
		} else {
			setError((prev) => ({ ...prev, username: false }));
		}

		if (!isValidPassword(formData.password)) {
			setError((prev) => ({ ...prev, password: true }));
			setErrorText('Please enter a valid password');
			return;
		} else {
			setError((prev) => ({ ...prev, password: false }));
		}

		// http request to backend with formData
		console.log(formData);
		onRouteChange('home');
		signIn({ username: formData.username });
	};

	return (
		<div className='rounded-md shadow-md border border-emerald-950 w-96 self-center p-4 flex flex-col gap-4'>
			<h1 className='text-2xl mb-4'>Sign In</h1>
			<form onSubmit={handleSubmit}>
				<TextInput
					title='User Name'
					name='username'
					error={error.username}
					value={formData.username}
					onChange={handleFormChange}
				/>
				<TextInput
					title='Password'
					name='password'
					error={error.password}
					type='password'
					value={formData.password}
					onChange={handleFormChange}
				/>
				{errorText && <p className='text-red-600 text-md'>{errorText}</p>}
				<Button>Sign In</Button>
			</form>
		</div>
	);
}
