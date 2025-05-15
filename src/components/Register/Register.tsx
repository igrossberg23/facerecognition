import { useContext, useState } from 'react';
import TextInput from '../general/TextInput';
import Button from '../general/Button';
import {
	isValidEmail,
	isValidName,
	isValidPassword,
} from '../../lib/validation';
import { AuthContext } from '../../store/auth-context';

export interface RegisterProps {
	onRouteChange: (route: string) => void;
}

export default function Register({ onRouteChange }: RegisterProps) {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
	});
	const [error, setError] = useState({
		name: false,
		email: false,
		password: false,
	});
	const [errorText, setErrorText] = useState('');
	const { signIn } = useContext(AuthContext);

	const handleFormChange =
		(name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
			setFormData((prev) => ({ ...prev, [name]: e.target.value }));
		};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!isValidName(formData.name)) {
			setError((prev) => ({ ...prev, name: true }));
			setErrorText('Please enter a valid name');
			return;
		} else {
			setError((prev) => ({ ...prev, name: false }));
		}

		if (!isValidEmail(formData.email)) {
			setError((prev) => ({ ...prev, email: true }));
			setErrorText('Please enter a valid email address');
			return;
		} else {
			setError((prev) => ({ ...prev, email: false }));
		}

		if (!isValidPassword(formData.password)) {
			setError((prev) => ({ ...prev, password: true }));
			setErrorText('Please enter a valid password');
			return;
		} else {
			setError((prev) => ({ ...prev, password: false }));
		}

		try {
			const rawResponse = await fetch('http://localhost:3000/api/register', {
				method: 'post',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});

			const res = await rawResponse.json();
			signIn(res);
			onRouteChange('home');
		} catch (error) {
			console.log(error);
			setErrorText('Invalid Credentials');
		}
	};

	return (
		<div className='rounded-md shadow-md border border-emerald-950 w-96 self-center p-4 flex flex-col gap-4'>
			<h1 className='text-2xl mb-4'>Register</h1>
			<form onSubmit={handleSubmit}>
				<TextInput
					title='Your Name'
					name='name'
					error={error.name}
					value={formData.name}
					onChange={handleFormChange}
				/>
				<TextInput
					title='Email'
					name='email'
					error={error.email}
					value={formData.email}
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
				<Button>Register</Button>
			</form>
		</div>
	);
}
