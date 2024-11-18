import React from 'react';
import { format } from "date-fns";

export default function NotiCard() {
    return (
        <div className="flex flex-col w-full rounded-lg bg-white mt-5 p-4 shadow-md">
            <div className="flex flex-row justify-between items-center">
                <div className="text-sm text-gray-600">Reminder!</div>
                <div className="flex items-center justify-center p-2 bg-pink-100 rounded-lg">
                    <i className="fa-solid fa-triangle-exclamation text-[#F478B8] text-[16px]"></i>
                </div>
            </div>
            {/* Date come from database */}
            <div className="mt-2 text-lg font-bold text-gray-800">{format(Date(), "MMM dd")} is deadling for &quot;Market Research&quot;</div>
            <div className="flex flex-row justify-between items-center mt-4">
                <div className="flex items-center text-gray-500 text-sm">
                    <span className="mr-2 text-lg">
                        <i className="fa-regular fa-clock"></i>
                    </span>
                    <span>Deadline at: 10:00 AM</span>
                </div>
                <div className="bg-pink-200 text-pink-600 text-xs font-semibold py-1 px-3 rounded-lg">In progress</div>
            </div>
        </div>

    );
}
