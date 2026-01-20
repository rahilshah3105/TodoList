import React from 'react';
import ThemeToggle from './ThemeToggle';
import { MdCheckCircle } from "react-icons/md";

const Navbar = () => {
    return (
        <nav className="sticky top-0 z-50 bg-white shadow-sm dark:bg-slate-900 border-b border-gray-200 dark:border-gray-800">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <div className='flex items-center gap-3'>
                    <MdCheckCircle className="text-3xl text-primary-600" />
                    <span className='font-bold text-xl tracking-tight text-gray-900 dark:text-white'>
                        Task<span className="text-primary-600">Master</span>
                    </span>
                </div>
                <div className='flex items-center gap-4'>
                    <ThemeToggle />
                </div>
            </div>
        </nav>
    )
}

export default Navbar
