import React from 'react';

interface ITaskGroup {
    taskGroup: string;
    taskNumber: number;
    completeTask: number;
}

export default function TaskGroupCard(props: ITaskGroup) {
    const offset = (props.completeTask / props.taskNumber) * 100;
    return (
        <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-lg w-full max-w-md">
            {/* Icon and Text */}
            <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-12 h-12 bg-pink-100 rounded-lg">
                    <i className="fa-solid fa-briefcase text-[#F478B8] text-[20px]"></i>
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">{props.taskGroup}</h3>
                    <p className="text-sm text-gray-500">{props.taskNumber} Tasks</p>
                </div>
            </div>

            {/* Circular Progress */}
            <div className="relative flex items-center justify-center w-12 h-12">
                <svg className="absolute w-full h-full" viewBox="0 0 36 36">
                    <path
                        className="text-pink-100"
                        strokeWidth="3"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                        className="text-pink-500"
                        strokeWidth="3"
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="none"
                        strokeDasharray={`${offset}, 100`}
                        d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                </svg>
                <span className="absolute text-sm font-semibold text-pink-500">{offset}%</span>
            </div>
        </div>

    );
}
