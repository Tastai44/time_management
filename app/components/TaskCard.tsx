import React from 'react';
import { format } from "date-fns";
interface IProps {
    projectName: string;
    description: string;
    endDate: string;
    status: string;
}

export default function TaskCard(props: IProps) {
    return (
        <div className="flex flex-col w-full rounded-lg bg-white mt-5 p-4 shadow-md">
            <div className="flex flex-row justify-between items-center">
                <div className="text-sm text-gray-600">{props.projectName}</div>
                <div className="flex items-center justify-center p-2 bg-pink-100 rounded-lg">
                    <i className="fa-solid fa-briefcase text-[#F478B8] text-[16px]"></i>
                </div>
            </div>
            <div className="mt-2 text-lg font-bold text-gray-800">{props.description}</div>
            <div className="flex flex-row justify-between items-center mt-4">
                <div className="flex items-center text-gray-500 text-sm">
                    <span className="mr-2 text-lg">
                        <i className="fa-regular fa-clock"></i>
                    </span>
                    <span>{format(props.endDate, "hh:mm a")}</span>
                </div>
                <div className="bg-purple-100 text-purple-700 text-xs font-semibold py-1 px-3 rounded-lg">{props.status}</div>
            </div>
        </div>

    );
}
