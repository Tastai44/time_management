'use client';
import NotiCard from "../components/NotiCard";


export default function Page() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Title Section */}
            <div className="flex justify-center items-center mb-8">
                <div className="text-3xl font-extrabold text-gray-900 tracking-wide">
                    Notifications
                </div>
            </div>

            {/* Search & Filter Section */}
            <div className="flex flex-row justify-between items-center bg-white p-4 rounded-lg shadow-md">
                <div className="relative w-2.5/4">
                    {/* Search Icon inside Input */}
                    <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5"></i>
                    <input
                        type="text"
                        className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-300 transition duration-200"
                        placeholder="Search notifications..."
                    />
                </div>
                <div className="flex gap-4">
                    <select
                        className="p-3 rounded-lg text-purple-950 focus:outline-none transition duration-200"
                    >
                        <option value="day">Today</option>
                        <option value="month">Month</option>
                        <option value="year">Year</option>
                    </select>
                </div>
            </div>

            {/* Notification Cards */}
            <div className="space-y-6">
                <NotiCard />
                {/* Additional NotiCard components can be added here if needed */}
            </div>
        </div>
    );
}
