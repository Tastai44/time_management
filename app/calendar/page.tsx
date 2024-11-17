'use client';
import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter();
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div
                    onClick={() => router.back()}
                    className="text-gray-600 hover:text-gray-900 cursor-pointer transition duration-200"
                >
                    <i className="fa-solid fa-arrow-left text-lg"></i>
                </div>
                <div className="text-xl font-bold text-gray-800">Tasks</div>
                <div className="relative text-purple-800 cursor-pointer hover:text-purple-600 active:text-purple-900 transition duration-200">
                    {/* Bell Icon */}
                    <i className="fa-solid fa-bell text-3xl"></i>

                    {/* Notification Badge */}
                    <div className="absolute top-0 right-0 w-4 h-4 bg-purple-600 rounded-full border-2 border-white text-white text-[8px] text-center flex justify-center">1</div>
                </div>
            </div>
        </div>
    );
}