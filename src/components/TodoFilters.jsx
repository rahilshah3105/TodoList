import React from 'react';
import { useTodos } from '../hooks/useTodos';
import clsx from 'clsx';
import { IoSearch } from "react-icons/io5";

const TodoFilters = () => {
    const { filter, setFilter, query, setQuery } = useTodos();

    const filters = ['all', 'active', 'completed'];

    return (
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-6">
            <div className="flex gap-2 bg-gray-100 dark:bg-slate-800 p-1 rounded-xl">
                {filters.map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={clsx(
                            'px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all duration-200',
                            filter === f
                                ? 'bg-blue-600 text-white shadow-md hover:bg-blue-700'
                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-slate-700'
                        )}
                    >
                        {f}
                    </button>
                ))}
            </div>

            <div className="relative w-full md:w-auto">
                <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search items..."
                    className="pl-10 pr-4 py-2 rounded-xl bg-gray-200 dark:bg-slate-700 border-none focus:ring-2 focus:ring-primary-500/50 w-full md:w-64 text-sm text-gray-700 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
                />
            </div>
        </div>
    );
};

export default TodoFilters;
