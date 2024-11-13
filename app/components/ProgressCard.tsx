import React from 'react';

interface cardType {
    taskGroup: string;
    projectName: string;
}

export default function ProgressCard(props: cardType) {
    return (
        <div className="bg-[#FFFFFF] p-4 rounded-lg shadow-md w-60">
            <div className="flex items-center space-x-2 justify-between">
                <div className="text-sm font-medium text-gray-600">{props.taskGroup}</div>
                <div className="bg-pink-100 text-pink-600 p-1 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M16 7V5a2 2 0 00-2-2H10a2 2 0 00-2 2v2M3 13h18M5 13v6a2 2 0 002 2h10a2 2 0 002-2v-6" />
                    </svg>
                </div>
            </div>
            <div className="mt-2 text-lg font-semibold text-gray-800">{props.projectName}</div>
        </div>
    );
}


// <div className="bg-red-50 p-4 rounded-lg shadow-md w-60">
//                         <div className="flex items-center space-x-2">
//                             <div className="text-sm font-medium text-gray-600">Personal Project</div>
//                             <div className="bg-orange-100 text-orange-600 p-1 rounded-full">
//                                 <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                     <path d="M4 7h16M4 11h16m-7 4h7" />
//                                 </svg>
//                             </div>
//                         </div>
//                         <div className="mt-2 text-lg font-semibold text-gray-800">Uber Eats redesign challenge</div>
//                         <div className="mt-4 bg-gray-200 rounded-full h-2">
//                             <div className="bg-red-500 h-2 rounded-full w-2/4"></div>
//                         </div>
//                     </div>

//                     {/* Add more cards here if needed */}
//                     <div className="bg-yellow-50 p-4 rounded-lg shadow-md w-60">
//                         <div className="flex items-center space-x-2">
//                             <div className="text-sm font-medium text-gray-600">Extra Project</div>
//                             <div className="bg-yellow-100 text-yellow-600 p-1 rounded-full">
//                                 <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                     <path d="M4 6h16M4 10h16m-7 4h7" />
//                                 </svg>
//                             </div>
//                         </div>
//                         <div className="mt-2 text-lg font-semibold text-gray-800">New project concept</div>
//                         <div className="mt-4 bg-gray-200 rounded-full h-2">
//                             <div className="bg-yellow-500 h-2 rounded-full w-1/4"></div>
//                         </div>
//                     </div>