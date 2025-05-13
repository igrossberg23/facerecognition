export interface ButtonProps {
	children: React.ReactNode;
	onClick?: () => void;
}

export default function Button({ children, onClick }: ButtonProps) {
	return (
		<button
			className='border rounded-md hover:shadow-md cursor-pointer p-2 hover:bg-emerald-950 hover:text-emerald-50'
			onClick={onClick}>
			{children}
		</button>
	);
}
