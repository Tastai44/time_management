import React from 'react';

export default function TaskCard() {
    return (
        <div className="flex flex-col w-full rounded-lg bg-white mt-5 p-4 shadow-md">
            <div className="flex flex-row justify-between items-center">
                <div className="text-sm text-gray-600">Grocery shopping app design</div>
                <div className="flex items-center justify-center p-2 bg-pink-100 rounded-lg">
                    <i className="fa-solid fa-briefcase text-[#F478B8] text-[16px]"></i>
                </div>
            </div>
            <div className="mt-2 text-lg font-bold text-gray-800">Market Research</div>
            <div className="flex flex-row justify-between items-center mt-4">
                <div className="flex items-center text-gray-500 text-sm">
                    <span className="mr-2 text-lg">
                        <i className="fa-regular fa-clock"></i>
                    </span>
                    <span>10:00 AM</span>
                </div>
                <div className="bg-purple-100 text-purple-700 text-xs font-semibold py-1 px-3 rounded-lg">Done</div>
            </div>
        </div>

    );
}
