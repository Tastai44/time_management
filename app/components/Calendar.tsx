import React, { useState } from "react";
import { format, addDays, startOfWeek } from "date-fns";

const Calendar = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [weekNumber, setWeekNumber] = useState(0);

    const getWeekDays = (weekOffset: number) => {
        const startDate = addDays(startOfWeek(new Date()), weekOffset * 7);
        return Array.from({ length: 7 }, (_, index) => addDays(startDate, index));
    };

    const handleNextWeek = () => setWeekNumber((prev) => prev + 1);
    const handlePrevWeek = () => setWeekNumber((prev) => prev - 1);

    const showWeek = getWeekDays(weekNumber);

    return (
        <div>
            <div className="flex justify-between items-center mb-2">
                <button
                    onClick={handlePrevWeek}
                    className="text-[12px] px-3 py-1 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-full shadow-md hover:from-purple-600 hover:to-indigo-600 transition-all duration-200"
                >
                    &larr; Previous
                </button>
                <button
                    onClick={handleNextWeek}
                    className="text-[12px] px-3 py-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full shadow-md hover:from-indigo-600 hover:to-purple-600 transition-all duration-200"
                >
                    Next &rarr;
                </button>
            </div>

            <div className="flex flex-row justify-between gap-1 w-full">
                {showWeek.map((date) => {
                    const isSelected =
                        format(date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd");
                    return (
                        <div
                            key={date.getTime()} // Use a unique key
                            // Updated className logic in Calendar.tsx
                            className={`flex flex-col items-center p-1 rounded-lg cursor-pointer transition-all
                                ${isSelected
                                    ? "bg-purple-600 text-white text-center border border-purple-600"
                                    : "bg-white dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-center border dark:border-gray-700 dark:text-gray-200"
                                }
                            `}
                            onClick={() => setSelectedDate(date)}
                        >
                            <span className="text-[14px] font-bold">{format(date, "MMM dd")}</span>
                            <span className="text-[12px]">{format(date, "EEE")}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Calendar;
