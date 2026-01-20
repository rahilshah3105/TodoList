import React, { useState } from 'react';
import { useTodos } from '../hooks/useTodos';
import TodoInput from './TodoInput';
import TodoFilters from './TodoFilters';
import TodoList from './TodoList';
import TodoStats from './TodoStats';

const Main = () => {
    const { editTodo } = useTodos();
    // Simple edit mode state could be handled here or in a modal
    // For now, we will just use prompt or a simple mechanism, 
    // but proper 'Edit' mode often requires the input to be populated.
    // Given the component structure, we might want to pass 'edit item' to TodoInput.
    // However, for simplicity and modularity let's stick to the plan:
    // The TodoInput handles creation. Editing can be inline or via a modal.
    // Let's implement a simple prompt-based edit in TodoContext for now, OR better:
    // Pass the item to be edited to a separate state which pops up a modal?
    // Let's stick to basic "Delete" and "Toggle" for now as key features, 
    // and maybe "Edit" updates the text via a prompt for simplicity in this turn,
    // or we can skip complex edit logic to keep it clean.
    // Actually, let's allow TodoInput to handle edits if we pass state?
    // No, let's keep it simple: "Edit" will just prompt execution for now 
    // to save time on building a modal, unless I want to Wow the user.
    // Let's do a prompt for now to ensure reliability first.

    const handleEdit = (todo) => {
        const newText = prompt("Update task:", todo.text);
        if (newText && newText.trim() !== "") {
            editTodo(todo.id, newText, todo.priority, todo.category, todo.dueDate);
        }
    }

    return (
        <main className="container mx-auto px-4 py-8 max-w-4xl">
            <header className="mb-8 text-center sm:text-left">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    Good Day!
                    <span className="text-primary-700 dark:text-primary-500 ml-2"> Ready to work?</span>
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Manage your tasks efficiently and get things done.
                </p>
            </header>

            <TodoStats />

            <TodoInput />

            <div className="bg-gray-50 dark:bg-slate-800 rounded-2xl shadow-xl p-6 border-2 border-gray-300 dark:border-gray-700">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Your Tasks</h2>
                </div>

                <TodoFilters />

                <TodoList onEdit={handleEdit} />
            </div>
        </main>
    )
}

export default Main
