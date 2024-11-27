'use client';
import { useRouter } from "next/navigation";
import React from 'react';
import ProtectedRoute from "./protectRoute";
import { IUser } from "../interfaces/User";

export default function OverallProgrss() {
    const router = useRouter();
    return (
        <ProtectedRoute>
            {(user: IUser, projects) =>
                <div className="flex items-center justify-between bg-purple-600 text-white p-6 rounded-2xl shadow-lg w-full mt-5">
                    <div>
                        <p className="text-lg font-semibold">Your today&apos;s task</p>
                        <p className="text-sm mt-1">almost done!</p>
                        <button onClick={() => router.push("/calendar")} className="bg-white text-purple-600 font-bold text-sm px-4 py-2 mt-4 rounded-full shadow hover:bg-gray-100">
                            View Task
                        </button>
                    </div>
                    <div className="relative flex items-center justify-center w-24 h-24">
                        <svg className="absolute w-full h-full" viewBox="0 0 36 36">
                            <path
                                className={`text-[#9F7AEA]`}
                                strokeWidth="3"
                                stroke="currentColor"
                                fill="none"
                                d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                            <path
                                className={`text-[#FFFFFF]`}
                                strokeWidth="3"
                                strokeLinecap="round"
                                stroke="currentColor"
                                fill="none"
                                strokeDasharray={`${(projects.filter((data) => data.status == "Done").length / projects.length) * 100}, 100`}
                                d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                        </svg>
                        <div className="text-lg font-bold text-white">{(projects.filter((data) => data.status == "Done").length / projects.length) * 100}%</div>
                    </div>
                </div>
            }
        </ProtectedRoute>
    );
}
