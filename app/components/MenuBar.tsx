'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MenuBar() {
    const router = usePathname();
    return (
        <div className="bg-[#DFD5FC] fixed bottom-0 w-full shadow-lg rounded-t-3xl">
            <div className="relative flex justify-between items-center px-6 py-4">
                {/* Menu Items */}
                <div
                    className={`cursor-pointer transition duration-200 ${router == '/home' ? 'text-purple-900' : 'text-[#B5A0F3] hover:text-purple-600 active:text-purple-900'
                        }`}
                >
                    <Link href="/home"><i className="fas fa-home text-xl"></i></Link>
                </div>
                <div className="text-[#B5A0F3] cursor-pointer hover:text-purple-600 active:text-purple-900 transition duration-200">
                    <i className="fas fa-calendar-alt text-xl"></i>
                </div>

                <div />

                {/* Floating Center Button */}
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 ">
                    <div className='bg-[#F8FDFA] w-14 h-14 rounded-full shadow-lg flex justify-center items-center'>
                        <div className="w-12 h-12 bg-purple-600 rounded-full shadow-lg flex justify-center items-center hover:bg-purple-500 active:bg-purple-700 cursor-pointer transition duration-200">
                            <button className="text-white text-3xl">+</button>
                        </div>
                    </div>

                </div>

                <div className="text-[#B5A0F3] cursor-pointer hover:text-purple-600 active:text-purple-900 transition duration-200">
                    <i className="fas fa-file-alt text-xl"></i>
                </div>
                <div className="text-[#B5A0F3] cursor-pointer hover:text-purple-600 active:text-purple-900 transition duration-200">
                    <i className="fas fa-users text-xl"></i>
                </div>
            </div>
        </div>
    );
}

