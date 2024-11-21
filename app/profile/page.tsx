import Image from 'next/image';
import { getUserById } from '../api/user';
export default async function Page() {
    const userData = await getUserById();

    // console.log(userData);

    return (
        <div className="flex flex-col">
            {/* Title Section */}
            <div className="flex flex-col justify-center items-center mb-10 gap-6">
                <div className='flex flex-row justify-between w-full items-center'>
                    <div><i className="fa-solid fa-arrow-left text-[18px]"></i></div>
                    <div className="text-3xl font-extrabold text-gray-900 tracking-wide text-center">
                        Profile
                    </div>
                    <div><i className="fa-regular fa-pen-to-square text-[18px]"></i></div>
                </div>
                <div className="relative">
                    <Image
                        src="/output.jpg"
                        alt="Landscape picture"
                        width={120}
                        height={120}
                        className="rounded-full shadow-lg ring-4 ring-purple-500 w-auto h-auto"
                        priority
                    />
                </div>
            </div>

            {/* Profile Details */}
            <div className="text-center mb-6">
                <div className="text-lg font-semibold text-gray-900">{userData?.name}</div>
                <div className="text-sm text-gray-700">{userData?.email}</div>
            </div>

            {/* Progress Section */}
            <div className="flex flex-col gap-5 mb-10">
                <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between font-bold">
                        <div className="text-gray-800 font-medium">Incomplete</div>
                        <div className="text-gray-600 text-sm">0%</div>
                    </div>
                    <div className="flex h-2 mb-4 rounded-full bg-gray-200">
                        <div className="flex flex-col justify-center bg-blue-500 text-xs leading-none text-center text-white rounded-full" style={{ width: '0%' }}></div>
                    </div>
                </div>

                <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between font-bold">
                        <div className="text-gray-800 font-medium">To Do</div>
                        <div className="text-gray-600 text-sm">50%</div>
                    </div>
                    <div className="flex h-2 mb-4 rounded-full bg-gray-200">
                        <div className="flex flex-col justify-center bg-blue-500 text-xs leading-none text-center text-white rounded-full" style={{ width: '50%' }}></div>
                    </div>
                </div>
                <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between font-bold">
                        <div className="text-gray-800 font-medium">Complete</div>
                        <div className="text-gray-600 text-sm">100%</div>
                    </div>
                    <div className="flex h-2 mb-4 rounded-full bg-gray-200">
                        <div className="flex flex-col justify-center bg-green-500 text-xs leading-none text-center text-white rounded-full" style={{ width: '100%' }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
