import React, { useState } from 'react';
import { useTodos } from '../hooks/useTodos';
import { IoAdd } from 'react-icons/io5';

const TodoInput = () => {
    const { addTodo } = useTodos();
    const [text, setText] = useState('');
    const [priority, setPriority] = useState('Medium');
    const [category, setCategory] = useState('Personal');
    const [dueDate, setDueDate] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!text.trim()) return;
        addTodo(text, priority, category, dueDate);
        setText('');
        setIsExpanded(false);
    };

    return (
        <div className="mb-8">
            <form onSubmit={handleSubmit} className="bg-gray-50 dark:bg-slate-800 p-4 rounded-2xl shadow-lg border border-gray-300 dark:border-gray-700 transition-all duration-300">
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onFocus={() => setIsExpanded(true)}
                        placeholder="Add a new task..."
                        className="flex-1 bg-gray-100 dark:bg-slate-700 border border-gray-300 dark:border-transparent focus:ring-0 text-lg px-4 text-gray-900 dark:text-gray-100 placeholder-gray-500 rounded-lg py-2"
                    />
                    <button
                        type="submit"
                        disabled={!text.trim()}
                        className="bg-primary-600 hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed text-white p-3 rounded-xl transition-all duration-200 transform active:scale-95 shadow-md"
                    >
                        <IoAdd className="text-xl" />
                    </button>
                </div>

                {isExpanded && (
                    <div className="mt-4 px-4 pb-2 flex flex-wrap gap-4 animate-fade-in border-t border-gray-100 dark:border-gray-800 pt-4">
                        <select
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                            className="bg-gray-50 dark:bg-gray-800 border-none rounded-lg text-sm px-3 py-1.5 focus:ring-2 focus:ring-primary-500/50 dark:text-gray-200"
                        >
                            <option value="Low">Low Priority</option>
                            <option value="Medium">Medium Priority</option>
                            <option value="High">High Priority</option>
                        </select>

                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="bg-gray-50 dark:bg-gray-800 border-none rounded-lg text-sm px-3 py-1.5 focus:ring-2 focus:ring-primary-500/50 dark:text-gray-200"
                        >
                            <option value="Personal">Personal</option>
                            <option value="Work">Work</option>
                            <option value="Shopping">Shopping</option>
                            <option value="Fitness">Fitness</option>
                        </select>

                        <input
                            type="date"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            className="bg-gray-50 dark:bg-gray-800 border-none rounded-lg text-sm px-3 py-1.5 focus:ring-2 focus:ring-primary-500/50 dark:text-gray-200"
                        />
                    </div>
                )}
            </form>
        </div>
    );
};

export default TodoInput;
