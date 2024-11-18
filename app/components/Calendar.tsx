import React, { useState } from "react";
import { format, addDays, startOfWeek } from "date-fns";

const Calendar = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    // Get the current week (start from Sunday)
    const currentWeek = Array.from({ length: 5 }, (_, index) =>
        addDays(startOfWeek(new Date()), index)
    );

    return (
        <div className="flex flex-row justify-center gap-4 w-full">
            {currentWeek.map((date) => {
                const isSelected = format(date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd");
                return (
                    <div
                        key={date.getTime()} // Use a unique key
                        className={`flex flex-col items-center p-1 rounded-lg cursor-pointer transition-all
                        ${isSelected ? "bg-purple-600 text-white text-center" : "bg-gray-100 hover:bg-gray-200 text-center"}
                        `}
                        onClick={() => setSelectedDate(date)}
                    >
                        <span className="text-[16px] font-bold">{format(date, "MMM dd")}</span>
                        <span className="text-[14px]">{format(date, "EEE")}</span>
                    </div>
                );
            })}
        </div>
    );
};

export default Calendar;
