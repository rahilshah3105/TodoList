import React from 'react';
import { useTodos } from '../hooks/useTodos';
import TodoItem from './TodoItem';
import { AnimatePresence, motion } from 'framer-motion';

const TodoList = ({ onEdit }) => {
    const { filteredTodos } = useTodos();

    if (filteredTodos.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center opacity-60">
                <img
                    src="https://cdni.iconscout.com/illustration/premium/thumb/empty-state-2130362-1800926.png"
                    alt="No tasks"
                    className="w-48 mb-4 mix-blend-multiply dark:mix-blend-normal"
                />
                <p className="text-xl font-medium text-gray-500 dark:text-gray-400">No tasks found</p>
                <p className="text-sm text-gray-400">Add a new task to get started</p>
            </div>
        );
    }

    return (
        <div className="space-y-2">
            <AnimatePresence mode='popLayout'>
                {filteredTodos.map((todo) => (
                    <TodoItem key={todo.id} todo={todo} onEdit={onEdit} />
                ))}
            </AnimatePresence>
        </div>
    );
};

export default TodoList;
