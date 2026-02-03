import Link from 'next/link';
import Image from 'next/image';

export default async function page() {
	return (
		<div className='flex flex-col items-center justify-center min-h-[80vh] text-center gap-y-8 max-w-md mx-auto mt-10'>
			<div className="relative group">
				<div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-600 rounded-xl blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
				<Image
					src="/preview.jpg"
					alt="App Preview"
					width={300}
					height={300}
					className='rounded-xl shadow-2xl relative'
					priority
				/>
			</div>

			<div className='space-y-4 max-w-lg'>
				<h1 className='text-4xl font-extrabold tracking-tight sm:text-5xl text-primary'>
					Time Management
				</h1>
				<p className='text-muted-foreground text-lg leading-relaxed font-medium'>
					This productive tool is designed to help you better manage your task project-wise conveniently!
				</p>
			</div>

			<Link
				href="/login"
				className='
					bg-primary 
					text-primary-foreground 
					py-3.5 
					px-6 
					rounded-full 
					font-semibold 
					text-lg 
					hover:shadow-lg 
					hover:shadow-primary/20 
					hover:-translate-y-0.5 
					transition-all 
					duration-300 
					block 
					text-center
					w-[300px]
				'
			>
				Let&apos;s Start
			</Link>
		</div>
	);
}
