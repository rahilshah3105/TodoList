import React from 'react';
import { useTodos } from '../hooks/useTodos';

const TodoStats = () => {
    const { stats } = useTodos();
    const percentage = stats.total === 0 ? 0 : Math.round((stats.completed / stats.total) * 100);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-sky-500 dark:bg-primary-600 text-white p-6 rounded-2xl shadow-lg shadow-sky-500/20 dark:shadow-primary-500/20 transform hover:-translate-y-1 transition-transform duration-300">
                <h3 className="text-2xl font-bold mb-1">{stats.total}</h3>
                <p className="text-sky-100 font-medium">Total Tasks</p>
            </div>

            <div className="bg-purple-500 dark:bg-purple-600 text-white p-6 rounded-2xl shadow-lg shadow-purple-500/20 transform hover:-translate-y-1 transition-transform duration-300">
                <h3 className="text-2xl font-bold mb-1">{stats.active}</h3>
                <p className="text-purple-100 font-medium">Active Tasks</p>
            </div>

            <div className="bg-pink-500 text-white p-6 rounded-2xl shadow-lg shadow-pink-500/20 transform hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden">
                <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-1">{percentage}%</h3>
                    <p className="text-pink-100 font-medium">Completed</p>
                </div>
                <div
                    className="absolute bottom-0 left-0 h-1 bg-white/30 transition-all duration-1000"
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
};

export default TodoStats;
