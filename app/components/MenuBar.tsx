import React from 'react';
import Link from 'next/link';

export default function MenuBar() {
    return (
        <div className="bg-white fixed bottom-0 w-full shadow-lg rounded-t-3xl">
            <div className="relative flex justify-between items-center px-6 py-2">
                {/* Menu Items with Hover and Active States */}
                <div className="text-purple-800 cursor-pointer hover:text-purple-600 active:text-purple-900 transition duration-200">
                    <Link href="/home"><i className="fas fa-home text-xl"></i></Link>
                </div>
                <div className="text-purple-800 cursor-pointer hover:text-purple-600 active:text-purple-900 transition duration-200">
                    <i className="fas fa-calendar-alt text-xl"></i>
                </div>

                {/* Floating Center Button with Hover and Active States */}
                <div className="w-12 h-12 bg-purple-600 rounded-full shadow-lg flex justify-center items-center hover:bg-purple-500 active:bg-purple-700 cursor-pointer transition duration-200">
                    <button className="text-white text-2xl">+</button>
                </div>

                <div className="text-purple-800 cursor-pointer hover:text-purple-600 active:text-purple-900 transition duration-200">
                    <i className="fas fa-file-alt text-xl"></i>
                </div>
                <div className="text-purple-800 cursor-pointer hover:text-purple-600 active:text-purple-900 transition duration-200">
                    <i className="fas fa-users text-xl"></i>
                </div>
            </div>
        </div>
    );
}
