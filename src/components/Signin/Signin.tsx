import { useContext, useState } from 'react';
import TextInput from '../general/TextInput';
import Button from '../general/Button';
import { AuthContext } from '../../store/auth-context';

export interface SigninProps {
	onRouteChange: (route: string) => void;
}

export default function Signin({ onRouteChange }: SigninProps) {
	const [formData, setFormData] = useState({ email: '', password: '' });
	const [errorText, setErrorText] = useState('');
	const { signIn } = useContext(AuthContext);

	const handleFormChange =
		(name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
			setFormData((prev) => ({ ...prev, [name]: e.target.value }));
		};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			const rawResponse = await fetch('http://localhost:3000/api/signin', {
				method: 'post',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});

			if (!rawResponse.ok) throw new Error('Invalid Credentials');

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
			<h1 className='text-2xl mb-4'>Sign In</h1>
			<form onSubmit={handleSubmit}>
				<TextInput
					title='Email'
					name='email'
					value={formData.email}
					onChange={handleFormChange}
				/>
				<TextInput
					title='Password'
					name='password'
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
