import React from 'react';
import Image from 'next/image';
// import prisma from './lib/db';

export default async function page() {
	// const project = await prisma.project.findMany({
	// 	where: { ownerId: "cm3r00rmq000056tl5kwgllct" },
	// 	include: { owner: true }, // Include the associated owner data
	// });

	return (
		<div className='flex flex-col items-center justify-center h-[85vh] text-center gap-y-3'>
			<div>
				<Image
					src="/preview.jpg"
					alt="Landscape picture"
					width={300}
					height={200}
					className='rounded-lg'
					priority
				/>
			</div>

			<div className='mt-4'>
				<div className='text-[20px] font-bold'>
					Time management
				</div>
				<div className='text-[14px] mt-2'>
					This productive tool is designed to help you better manage your task project-wise conveniently!
				</div>
			</div>

			<button
				className='mt-4 bg-[#9d00ff] text-white p-2 rounded-lg font-bold w-full'>
				Let&apos;s Start
			</button>
		</div>

	);
}
