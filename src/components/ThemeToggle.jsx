import React from 'react';
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useTheme } from '../hooks/useTheme';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
            aria-label="Toggle Dark Mode"
        >
            {theme === 'light' ? (
                <MdDarkMode className="text-2xl text-gray-700" />
            ) : (
                <MdLightMode className="text-2xl text-yellow-400" />
            )}
        </button>
    );
};

export default ThemeToggle;
