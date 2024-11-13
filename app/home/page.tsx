import Image from 'next/image';
import ProgressCard from '../components/ProgressCard';

export default function Page() {
    const percentage = 10; // Dynamic percentage
    const radius = 40; // Radius of the circle
    const circumference = 2 * Math.PI * radius; // Total circumference of the circle
    const offset = circumference * (1 - percentage / 100);
    return (
        <div>
            <div className="flex flex-row justify-between">
                <div className="flex gap-5">
                    <div>
                        <Image
                            src="/output.jpg"
                            alt="Landscape picture"
                            width={59}
                            height={50}
                            className='rounded-full'
                        />
                    </div>
                    <div>
                        <h3>Hello!</h3>
                        <div className="text-[20px] font-bold">Name</div>
                    </div>
                </div>
                <div className="text-purple-800 cursor-pointer hover:text-purple-600 active:text-purple-900 transition duration-200">
                    <i className="fa-solid fa-bell text-xl"></i>
                </div>
            </div>

            <div className="flex items-center justify-between bg-purple-600 text-white p-6 rounded-2xl shadow-lg w-full max-w-sm mt-5">
                <div>
                    <p className="text-lg font-semibold">Your today&apos;s task</p>
                    <p className="text-sm mt-1">almost done!</p>
                    <button className="bg-white text-purple-600 font-bold text-sm px-4 py-2 mt-4 rounded-full shadow hover:bg-gray-100">
                        View Task
                    </button>
                </div>

                <div className="relative flex items-center justify-center w-24 h-24">
                    {/* Scale */}

                    {/* Background Circle */}
                    <svg className="absolute w-full h-full transform -rotate-90">
                        <circle
                            cx="50%"
                            cy="50%"
                            r={radius}
                            strokeWidth="10"
                            stroke="#9F7AEA" // Background circle (light gray)
                            fill="transparent"
                        />
                        <circle
                            cx="50%"
                            cy="50%"
                            r={radius}
                            strokeWidth="10"
                            stroke="#FFFFFF" // Progress circle (purple)
                            fill="transparent"
                            strokeDasharray={circumference}
                            strokeDashoffset={offset}
                            strokeLinecap="round"
                        />
                    </svg>

                    {/* Percentage Text */}
                    <div className="text-lg font-bold text-white">{percentage}%</div>
                </div>
            </div>

            <div className="flex items-center space-x-2 mt-5 mb-3">
                <h2 className="text-xl font-bold text-gray-800">In Progress</h2>
                <div className="bg-purple-100 text-purple-600 text-[12px] font-medium px-2 py-0.5 rounded-full">
                    6
                </div>
            </div>
            <div className="overflow-x-auto">
                <div className="flex space-x-4 w-max">
                    <ProgressCard taskGroup={'Office Project'} projectName={'Grocery shopping app design'} />
                    <ProgressCard taskGroup={'Office Project'} projectName={'Grocery shopping app design'} />
                    <ProgressCard taskGroup={'Office Project'} projectName={'Grocery shopping app design'} />
                </div>
            </div>

            <div className="flex items-center space-x-2 mt-5 mb-3">
                <h2 className="text-xl font-bold text-gray-800">Task Groups</h2>
                <div className="bg-purple-100 text-purple-600 text-[12px] font-medium px-2 py-0.5 rounded-full">
                    6
                </div>
            </div>

        </div>
    );
}