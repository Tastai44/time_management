'use client';
import { useRouter } from "next/navigation";
import Image from 'next/image';
import ProgressCard from '../components/ProgressCard';
import TaskGroupCard from '../components/TaskGroupCard';
import ProtectedRoute from '../components/protectRoute';
import { IUser } from '../interfaces/User';
import { useEffect, useState } from 'react';
import { IProject } from '../interfaces/Project';
import { getProjectByUserId } from '../api/project';

export default function Page() {
    const router = useRouter();
    const percentage = 10;
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference * (1 - percentage / 100);
    const [projects, setProjects] = useState<IProject[] | null>(null); // Initialize as null for loading check
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        const fetchProjects = async () => {
            if (userId) {
                const data = await getProjectByUserId(userId);
                setProjects(data);
            }
        };
        fetchProjects();
    }, []);

    const toggleDropdown = () => {
        setIsDropdownVisible((prev) => !prev);
    };

    const handleLogout = () => {
        toggleDropdown();
        localStorage.removeItem("token");
        router.push("/login");
    };

    return (
        <ProtectedRoute>
            {(user: IUser) => (
                <div>
                    {!projects ? (
                        // Loading Skeleton displayed while fetching data
                        <div className="space-y-4">
                            <div className="w-3/4 h-6 bg-gray-300 rounded-md animate-pulse"></div>
                            <div className="w-1/2 h-4 bg-gray-300 rounded-md animate-pulse"></div>
                            <div className="w-full h-40 bg-gray-300 rounded-lg animate-pulse"></div>
                        </div>
                    ) : (
                        // Render UI once projects are loaded
                        <>
                            <div className="flex flex-row justify-between items-center">
                                <div className="flex gap-5">
                                    <div>
                                        <h3>Hello!</h3>
                                        <div className="text-[20px] font-bold">{user.name}</div>
                                    </div>
                                </div>
                                <div className="relative text-purple-800 cursor-pointer hover:text-purple-600 active:text-purple-900 transition duration-200">
                                    <div className="relative inline-block">
                                        <div onClick={toggleDropdown} className="cursor-pointer">
                                            <Image
                                                src="/output.jpg"
                                                alt="Profile Picture"
                                                width={45}
                                                height={45}
                                                className="rounded-full w-auto h-auto"
                                                priority
                                            />
                                        </div>
                                        {isDropdownVisible && (
                                            <div
                                                className="absolute right-0 mt-2 bg-white border rounded shadow-lg z-20"
                                                style={{ minWidth: "150px" }}
                                            >
                                                <ul>
                                                    <a href="/profile">
                                                        <li
                                                            onClick={toggleDropdown}
                                                            className="p-2 hover:bg-gray-100 cursor-pointer flex items-center"
                                                        >
                                                            <i className="fas fa-user mr-2"></i> Profile
                                                        </li>
                                                    </a>
                                                    <li
                                                        onClick={handleLogout}
                                                        className="p-2 hover:bg-gray-100 cursor-pointer flex items-center"
                                                    >
                                                        <i className="fas fa-sign-out-alt mr-2"></i> Logout
                                                    </li>
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between bg-purple-600 text-white p-6 rounded-2xl shadow-lg w-full mt-5">
                                <div>
                                    <p className="text-lg font-semibold">Your today&apos;s task</p>
                                    <p className="text-sm mt-1">almost done!</p>
                                    <button className="bg-white text-purple-600 font-bold text-sm px-4 py-2 mt-4 rounded-full shadow hover:bg-gray-100">
                                        View Task
                                    </button>
                                </div>
                                <div className="relative flex items-center justify-center w-24 h-24">
                                    <svg className="absolute w-full h-full transform -rotate-90">
                                        <circle
                                            cx="50%"
                                            cy="50%"
                                            r={radius}
                                            strokeWidth="10"
                                            stroke="#9F7AEA"
                                            fill="transparent"
                                        />
                                        <circle
                                            cx="50%"
                                            cy="50%"
                                            r={radius}
                                            strokeWidth="10"
                                            stroke="#FFFFFF"
                                            fill="transparent"
                                            strokeDasharray={circumference}
                                            strokeDashoffset={offset}
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                    <div className="text-lg font-bold text-white">{percentage}%</div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2 mt-5 mb-3">
                                <h2 className="text-xl font-bold text-gray-800">In Progress</h2>
                                <div className="bg-purple-100 text-purple-600 text-[12px] font-medium px-2 py-0.5 rounded-full">
                                    {projects.filter((data) => data.status === "Doing" || data.status == "Todo").length}
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <div className="flex space-x-4 w-max">
                                    {projects.filter((data) => data.status === "Doing" || data.status == "Todo").length !== 0 ? (
                                        projects.filter((data) => data.status === "Doing" || data.status == "Todo").map((data, index) => (
                                            <ProgressCard
                                                key={index}
                                                taskGroup={data.groupName}
                                                projectName={data.projectName}
                                            />
                                        ))
                                    ) : (
                                        <div>Good job! You have no work left.</div>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center space-x-2 mt-5 mb-3">
                                <h2 className="text-xl font-bold text-gray-800">Task Groups</h2>
                            </div>
                            {projects.map((data, index) => (
                                data.groupName == "Work" ? (
                                    <div key={index} className="flex flex-col">
                                        <TaskGroupCard taskGroup={data.groupName} taskNumber={projects.filter((data) => data.groupName == "Work").length} completeTask={projects.filter((data) => data.groupName == "Work" && data.status == "Completed").length} />
                                    </div>
                                ) : data.groupName == "Personal" ? (
                                    <div className="flex flex-col">
                                        <TaskGroupCard taskGroup={data.groupName} taskNumber={projects.filter((data) => data.groupName == "Personal").length} completeTask={projects.filter((data) => data.groupName == "Personal" && data.status == "Completed").length} />
                                    </div>
                                ) : (
                                    <div className="flex flex-col">
                                        <TaskGroupCard taskGroup={data.groupName} taskNumber={projects.filter((data) => data.groupName == "Others").length} completeTask={projects.filter((data) => data.groupName == "Others" && data.status == "Completed").length} />
                                    </div>
                                )
                            ))}

                        </>
                    )}
                </div>
            )}
        </ProtectedRoute>
    );
}
