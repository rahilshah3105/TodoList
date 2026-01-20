import React, { createContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import confetti from 'canvas-confetti';

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
    const [todos, setTodos] = useState(() => {
        const saved = localStorage.getItem('todos');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                // Migration logic for old data structure
                return parsed.map(t => ({
                    ...t,
                    text: t.text || t.todo || "", // Handle legacy 'todo' property
                    priority: t.priority || "Medium",
                    category: t.category || "Personal"
                }));
            } catch (e) {
                console.error("Failed to parse todos", e);
                return [];
            }
        }
        return [];
    });
    const [query, setQuery] = useState('');
    const [filter, setFilter] = useState('all'); // all, active, completed

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const addTodo = (text, priority = 'Medium', category = 'Personal', dueDate = '') => {
        const newTodo = {
            id: uuidv4(),
            text,
            isCompleted: false,
            priority, // Low, Medium, High
            category,
            dueDate,
            createdAt: new Date().toISOString(),
        };
        setTodos((prev) => [newTodo, ...prev]);
    };

    const deleteTodo = (id) => {
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
    };

    const toggleTodo = (id) => {
        setTodos((prev) => {
            const newTodos = prev.map((todo) =>
                todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
            );

            // Check if all completed for confetti
            const allCompleted = newTodos.length > 0 && newTodos.every(t => t.isCompleted);
            if (allCompleted) {
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 }
                });
            }
            return newTodos;
        });
    };

    const editTodo = (id, newText, newPriority, newCategory, newDueDate) => {
        setTodos((prev) =>
            prev.map((todo) =>
                todo.id === id ? { ...todo, text: newText, priority: newPriority, category: newCategory, dueDate: newDueDate } : todo
            )
        );
    };

    const filteredTodos = todos.filter((todo) => {
        const todoText = todo.text || ""; // Safety check
        const matchesQuery = todoText.toLowerCase().includes(query.toLowerCase());
        const matchesFilter =
            filter === 'all'
                ? true
                : filter === 'active'
                    ? !todo.isCompleted
                    : todo.isCompleted;
        return matchesQuery && matchesFilter;
    });

    const stats = {
        total: todos.length,
        completed: todos.filter((t) => t.isCompleted).length,
        active: todos.filter((t) => !t.isCompleted).length,
    };

    return (
        <TodoContext.Provider
            value={{
                todos,
                filteredTodos,
                query,
                setQuery,
                filter,
                setFilter,
                addTodo,
                deleteTodo,
                toggleTodo,
                editTodo,
                stats
            }}
        >
            {children}
        </TodoContext.Provider>
    );
};
