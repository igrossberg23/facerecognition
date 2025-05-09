export default function ImageLinkForm() {
	return (
		<div className='flex flex-col items-center gap-2 m-4'>
			<p className='text-xl text-emerald-900'>
				{'Give me an image file and I will detect any faces.'}
			</p>
			<div className='flex gap-2 justify-center p-2 rounded-lg bg-emerald-400'>
				<input
					className='text-lg p-2 text-center shadow-md rounded-md border border-emerald-200 w-80 text-white focus:outline-none focus:ring-2 focus:ring-emerald-100'
					type='text'
				/>
				<button className='rounded-md shadow-md w-2/5 hover:scale-105 text-lg bg-emerald-200 text-emerald-900 cursor-pointer'>
					Detect
				</button>
			</div>
		</div>
	);
}
