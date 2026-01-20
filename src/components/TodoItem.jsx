import React, { forwardRef } from 'react';
import { useTodos } from '../hooks/useTodos';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';
import { motion } from 'framer-motion';
import clsx from 'clsx';

const TodoItem = forwardRef(({ todo, onEdit }, ref) => {
    const { toggleTodo, deleteTodo } = useTodos();

    const priorityColors = {
        Low: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
        Medium: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
        High: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    };

    return (
        <motion.div
            layout
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="group flex flex-col sm:flex-row items-center justify-between p-4 mb-3 bg-gray-100 dark:bg-slate-800 rounded-xl shadow-sm border border-gray-300 dark:border-gray-700 hover:shadow-md transition-all duration-200"
        >
            <div className="flex items-center gap-4 w-full sm:w-auto overflow-hidden">
                <button
                    onClick={() => toggleTodo(todo.id)}
                    className="text-2xl text-gray-400 hover:text-primary-500 transition-colors flex-shrink-0"
                >
                    {todo.isCompleted ? (
                        <MdCheckBox className="text-primary-500" />
                    ) : (
                        <MdCheckBoxOutlineBlank />
                    )}
                </button>

                <div className="flex flex-col overflow-hidden">
                    <span
                        className={clsx(
                            'text-lg font-medium truncate transition-all duration-200',
                            todo.isCompleted ? 'text-gray-400 line-through' : 'text-gray-900 dark:text-gray-200'
                        )}
                    >
                        {todo.text}
                    </span>
                    <div className="flex gap-2 text-xs mt-1">
                        <span className={clsx('px-2 py-0.5 rounded-md font-medium', priorityColors[todo.priority])}>
                            {todo.priority}
                        </span>
                        <span className="bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 px-2 py-0.5 rounded-md">
                            {todo.category}
                        </span>
                        {todo.dueDate && (
                            <span className="text-gray-400 flex items-center">
                                Due: {new Date(todo.dueDate).toLocaleDateString()}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-2 mt-4 sm:mt-0 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button
                    onClick={() => onEdit(todo)}
                    className="p-2 text-gray-500 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                >
                    <FaEdit />
                </button>
                <button
                    onClick={() => deleteTodo(todo.id)}
                    className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                >
                    <FaTrash />
                </button>
            </div>
        </motion.div>
    );
});

export default TodoItem;
