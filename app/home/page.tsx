'use client';
import { useRouter } from "next/navigation";
import Image from 'next/image';
import ProgressCard from '../components/ProgressCard';
import TaskGroupCard from '../components/TaskGroupCard';
import ProtectedRoute from '../components/protectRoute';
import { IUser } from '../interfaces/User';
import { useState } from 'react';
import OverallProgrss from "../components/OverallProgrss";

export default function Page() {
    const router = useRouter();
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

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
            {(user: IUser, projects) => <div>
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

                <OverallProgrss />

                <div className="flex items-center space-x-2 mt-5 mb-3">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">In Progress</h2>
                    <div className="bg-purple-100 text-purple-600 text-[12px] font-medium px-2 py-0.5 rounded-full">
                        {projects.filter((data) => data.status === "Doing" || data.status == "Todo").length}
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <div className="flex space-x-4 w-max">
                        {projects.filter((data) => data.status === "Doing" || data.status == "Todo").length !== 0 ? (
                            projects
                                .filter((data) => data.status === "Doing" || data.status === "Todo")
                                .map((data) => (
                                    <a key={data.id} href={`/project/${data.id}`}>
                                        <ProgressCard
                                            taskGroup={data.groupName}
                                            projectName={data.projectName}
                                        />
                                    </a>
                                ))
                        ) : (
                            <div>Good job! You have no work left.</div>
                        )}
                    </div>
                </div>
                <div className="flex items-center space-x-2 mt-5 mb-3">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">Task Groups</h2>
                </div>
                {projects.map((data) => (
                    data.groupName === "Work" ? (
                        <div key={`work-${data.id}`} className="mb-3">
                            <TaskGroupCard
                                groupName={data.groupName}
                                taskNumber={projects.filter((data) => data.groupName === "Work").length}
                                completeTask={projects.filter((data) => data.groupName === "Work" && data.status === "Done").length}
                            />
                        </div>
                    ) : data.groupName === "Personal" ? (
                        <div key={`personal-${data.id}`} className="mb-3">
                            <TaskGroupCard
                                groupName={data.groupName}
                                taskNumber={projects.filter((data) => data.groupName === "Personal").length}
                                completeTask={projects.filter((data) => data.groupName === "Personal" && data.status === "Done").length}
                            />
                        </div>
                    ) : (
                        <div key={`others-${data.id}`} className="mb-3">
                            <TaskGroupCard
                                groupName={data.groupName}
                                taskNumber={projects.filter((data) => data.groupName === "Others").length}
                                completeTask={projects.filter((data) => data.groupName === "Others" && data.status === "Done").length}
                            />
                        </div>
                    )
                ))}

            </div>}
        </ProtectedRoute>
    );
}
