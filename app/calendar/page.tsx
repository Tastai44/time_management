'use client';
import { format, addDays, startOfWeek } from "date-fns";
import { useState } from "react";
import TaskCard from "../components/TaskCard";
import ProtectedRoute from "../components/protectRoute";
import { IUser } from "../interfaces/User";

export default function Page() {
    const [status, setStatus] = useState("All");
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [weekNumber, setWeekNumber] = useState(0);
    const getWeekDays = (weekOffset: number) => {
        const startDate = addDays(startOfWeek(new Date()), weekOffset * 7);
        return Array.from({ length: 7 }, (_, index) => addDays(startDate, index));
    };

    const handleNextWeek = () => setWeekNumber((prev) => prev + 1);
    const handlePrevWeek = () => setWeekNumber((prev) => prev - 1);
    const showWeek = getWeekDays(weekNumber);
    const handleChangeStatus = (value: string) => {
        setStatus(value);
    };

    return (
        <ProtectedRoute>
            {
                (user: IUser, projects) => <>
                    <div className="flex flex-col">
                        <div className="flex justify-center items-center mb-6">
                            <div className="text-3xl font-bold text-gray-800 dark:text-white">Tasks</div>
                        </div>
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <button
                                    onClick={handlePrevWeek}
                                    className="text-[12px] px-3 py-1 text-black dark:text-white rounded-full shadow-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200"
                                >
                                    &larr; Previous
                                </button>
                                <button
                                    onClick={handleNextWeek}
                                    className="text-[12px] px-3 py-1 text-black dark:text-white rounded-full shadow-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200"
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
                                            key={date.getTime()}
                                            className={`flex flex-col items-center justify-center p-2 md:p-3 lg:p-4 rounded-lg cursor-pointer transition-all 
                                                ${isSelected
                                                    ? "bg-purple-600 text-white border border-purple-600"
                                                    : "bg-white dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 border dark:border-gray-700 dark:text-gray-200"
                                                }
                                                w-[60px] sm:w-[80px] md:w-[100px] lg:w-[120px] 
                                                h-[70px] sm:h-[90px] md:h-[110px] lg:h-[130px]`}
                                            onClick={() => setSelectedDate(date)}
                                        >
                                            <span className="text-xs sm:text-sm md:text-base lg:text-lg font-bold text-center">
                                                {format(date, "MMM dd")}
                                            </span>
                                            <span className="text-[10px] sm:text-xs md:text-sm lg:text-base">
                                                {format(date, "EEE")}
                                            </span>
                                        </div>

                                    );
                                })}
                            </div>
                        </div>
                        <div className="flex flex-row gap-3 justify-between mt-5">
                            <button onClick={() => handleChangeStatus("All")} className={`flex justify-center items-center ${status == "All" ? "bg-purple-500 text-white font-bold" : "bg-gray-100 dark:bg-gray-800 text-black dark:text-gray-200"} p-1 rounded-lg  w-20 text-[12px]`}>All</button>
                            <button onClick={() => handleChangeStatus("Todo")} className={`flex justify-center items-center ${status == "Todo" ? "bg-purple-500 text-white font-bold" : "bg-gray-100 dark:bg-gray-800 text-black dark:text-gray-200"} p-1 rounded-lg w-20 text-[12px]`}>To do</button>
                            <button onClick={() => handleChangeStatus("Doing")} className={`flex justify-center items-center ${status == "Doing" ? "bg-purple-500 text-white font-bold" : "bg-gray-100 dark:bg-gray-800 text-black dark:text-gray-200"} p-1 rounded-lg w-20 text-[12px]`}>Doing</button>
                            <button onClick={() => handleChangeStatus("Done")} className={`flex justify-center items-center ${status == "Done" ? "bg-purple-500 text-white font-bold" : "bg-gray-100 dark:bg-gray-800 text-black dark:text-gray-200"} p-1 rounded-lg w-20 text-[12px]`}>Done</button>
                        </div>

                        {
                            projects
                                .some((data) => data.status === status) ? (
                                projects
                                    .filter((data) => data.status === status &&
                                        (format(data.startDate, "yyyy-MM-dd") <= format(selectedDate, "yyyy-MM-dd")) &&
                                        (format(data.endDate, "yyyy-MM-dd") >= format(selectedDate, "yyyy-MM-dd"))
                                    )
                                    .map((project, index) => (
                                        <a key={project.id} href={`/project?id=${project.id}`}>
                                            <TaskCard
                                                key={index}
                                                projectName={project.projectName}
                                                groupName={project.groupName}
                                                description={project.description}
                                                endDate={project.endDate}
                                                status={project.status} /* Fixed: Use project.status */
                                            />
                                        </a>
                                    ))
                            ) : status == "All" ? (
                                projects.filter((data) =>
                                    (format(data.startDate, "yyyy-MM-dd") <= format(selectedDate, "yyyy-MM-dd")) &&
                                    (format(data.endDate, "yyyy-MM-dd") >= format(selectedDate, "yyyy-MM-dd"))
                                ).map((project, index) => (
                                    <a key={project.id} href={`/project?id=${project.id}`}>
                                        <TaskCard
                                            key={index}
                                            projectName={project.projectName}
                                            groupName={project.groupName}
                                            description={project.description}
                                            endDate={project.endDate}
                                            status={project.status} /* Fixed: Use project.status */
                                        />
                                    </a>
                                ))
                            ) : (
                                <div className="flex justify-center text-3xl mt-[130px] text-gray-300 dark:text-gray-600">
                                    There is no data to show
                                </div>
                            )

                        }
                    </div>
                </>
            }
        </ProtectedRoute>
    );
}