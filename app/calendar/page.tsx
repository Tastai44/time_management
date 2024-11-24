'use client';
import Calendar from "../components/Calendar";
import { useState } from "react";
import TaskCard from "../components/TaskCard";

export default function Page() {
    const [status, setStatus] = useState(1);

    const handleChangeStatus = (value: number) => {
        setStatus(value);
    };
    return (
        <div className="flex flex-col">
            <div className="flex justify-center items-center mb-6">
                <div className="text-3xl font-bold text-gray-800">Tasks</div>
            </div>
            <Calendar />
            <div className="flex flex-row gap-3 justify-between mt-5">
                <button onClick={() => handleChangeStatus(1)} className={`flex justify-center items-center ${status == 1 ? "bg-purple-500 text-white font-bold" : "bg-gray-100 text-black"} p-1 rounded-lg  w-20 text-[12px]`}>All</button>
                <button onClick={() => handleChangeStatus(2)} className={`flex justify-center items-center ${status == 2 ? "bg-purple-500 text-white font-bold" : "bg-gray-100 text-black"} p-1 rounded-lg w-20 text-[12px]`}>To do</button>
                <button onClick={() => handleChangeStatus(3)} className={`flex justify-center items-center ${status == 3 ? "bg-purple-500 text-white font-bold" : "bg-gray-100 text-black"} p-1 rounded-lg w-20 text-[12px]`}>In Progress</button>
                <button onClick={() => handleChangeStatus(4)} className={`flex justify-center items-center ${status == 4 ? "bg-purple-500 text-white font-bold" : "bg-gray-100 text-black"} p-1 rounded-lg w-20 text-[12px]`}>Compleated</button>
            </div>
            <TaskCard />
        </div>
    );
}