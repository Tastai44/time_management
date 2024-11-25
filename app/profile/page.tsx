'use client';
import Image from 'next/image';
import ProtectedRoute from '../components/protectRoute';
import { IUser } from '../interfaces/User';
import { useState } from 'react';
export default function Page() {
    const [isEdit, setIsEdit] = useState(false);
    return (
        <ProtectedRoute>
            {
                (user: IUser, projects) =>
                    <>
                        <div className="flex flex-col">
                            {/* Title Section */}
                            <div className="flex flex-col justify-center items-center mb-10 gap-6">
                                <div className='relative flex flex-row  justify-end items-center w-full mb-8'>
                                    <div></div>
                                    <div className="absolute left-1/2 transform -translate-x-1/2 text-3xl font-extrabold text-gray-900 tracking-wide text-center">
                                        Profile
                                    </div>
                                    <div>
                                        {
                                            !isEdit ? (
                                                <div onClick={() => setIsEdit(true)}><i className="fa-regular fa-pen-to-square text-[18px]"></i></div>
                                            ) : (
                                                <div onClick={() => setIsEdit(false)}><i className="fa-regular fa-floppy-disk text-[18px]"></i></div>
                                            )
                                        }
                                    </div>
                                </div>


                                <div className="relative">
                                    <Image
                                        src="/output.jpg"
                                        alt="Landscape picture"
                                        width={120}
                                        height={120}
                                        className="rounded-full shadow-lg ring-4 ring-purple-500 w-auto h-auto"
                                        priority
                                    />
                                </div>
                            </div>

                            {/* Profile Details */}
                            {
                                !isEdit ? (
                                    <div className="text-center">
                                        <div className="text-lg font-semibold text-gray-900">{user.name}</div>
                                        <div className="text-sm text-gray-700">{user.email}</div>
                                    </div>
                                ) : (
                                    <div className='flex flex-col gap-1 w-70%'>
                                        <input type="text" name='name' className={`mt-1 block w-full p-2 border border-purple-500 rounded-xl bg-white outline-none`} defaultValue={user.name} />
                                        <input type="text" name="email" className={`mt-1 block w-full p-2 border border-purple-500 rounded-xl bg-white outline-none`} defaultValue={user.email} />
                                    </div>
                                )
                            }




                            <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-1/2 mx-auto mt-5 mb-[15vh]">
                                <div className="text-lg font-semibold text-gray-900 mb-4">Task Status</div>

                                <div className="flex flex-col gap-4">
                                    <div className="flex justify-between items-center p-4 bg-blue-100 rounded-lg shadow-sm">
                                        <div className="text-md font-medium text-blue-700">Todo</div>
                                        <div className="text-md font-semibold text-blue-900">
                                            {projects.filter((data) => data.status == "Todo").length} tasks</div>
                                    </div>

                                    <div className="flex justify-between items-center p-4 bg-yellow-100 rounded-lg shadow-sm">
                                        <div className="text-md font-medium text-yellow-700">Doing</div>
                                        <div className="text-md font-semibold text-yellow-900">
                                            {projects.filter((data) => data.status == "Doing").length} tasks</div>
                                    </div>

                                    <div className="flex justify-between items-center p-4 bg-green-100 rounded-lg shadow-sm">
                                        <div className="text-md font-medium text-green-700">Done</div>
                                        <div className="text-md font-semibold text-green-900">
                                            {projects.filter((data) => data.status == "Done").length} tasks</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
            }
        </ProtectedRoute>
    );
}
