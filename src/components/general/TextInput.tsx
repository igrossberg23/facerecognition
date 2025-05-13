export interface TextInputProps {
	title: string;
	type?: string;
	name: string;
	error?: boolean;
	value: string;
	onChange: (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function TextInput({
	title,
	type = 'text',
	name,
	error = false,
	value,
	onChange,
}: TextInputProps) {
	return (
		<div className='m-2 flex flex-col text-left'>
			<p className={`${error && 'text-red-600'}`}>{title}</p>
			<input
				className={`text-lg p-2 text-center shadow-md rounded-md border w-80 text-white focus:outline-none focus:ring-2 focus:ring-emerald-100 ${
					error ? 'border-red-600' : 'border-emerald-900'
				}`}
				type={type}
				name={name}
				value={value}
				onChange={onChange(name)}
			/>
		</div>
	);
}
