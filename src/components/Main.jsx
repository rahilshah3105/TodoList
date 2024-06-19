import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Main = () => {

    const [todo, setTodo] = useState("");
    const [todos, setTodos] = useState([]);
    const [showFinished, setshowFinished] = useState(true);

    useEffect(() => {
        if (localStorage.getItem("todos")) {
            setTodos(JSON.parse(localStorage.getItem("todos")));
        }
    }, [])

    const saveToLS = () => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }

    const handleChange = (e) => {
        setTodo(e.target.value);
    }

    const handleEdit = (e, id) => {
        let t = todos.filter(i => i.id === id);
        setTodo(t[0].todo);
        let newTodos = todos.filter((todo) => todo.id !== id);
        setTodos(newTodos);
        document.querySelector("#add-save").innerHTML = "Save";
        saveToLS();
    }

    const handleDelete = (e, id) => {
        if (confirm("Are you sure you want to delete this todo?")) {
            let newTodos = todos.filter((todo) => todo.id !== id);
            setTodos(newTodos);
        }
        saveToLS();
    };

    const handleAdd = () => {
        setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
        setTodo("");
        console.log(todos);
        saveToLS();
    }

    const handleCheckbox = (e) => {
        let id = e.target.name;
        let index = todos.findIndex((todo) => todo.id === id);
        let todoCopy = [...todos];
        todoCopy[index].isCompleted = !todoCopy[index].isCompleted;
        setTodos(todoCopy);
        saveToLS();
    }

    const toggleFinished = (e) => {
        setshowFinished(!showFinished);
        saveToLS();
        if (isCompleted) {

        }
    }

    return (
        <>
            <div className="container mx-auto my-5 rounded-xl p-5 min-h-[80vh] w-full bg-slate-500">
                <h1 className="text-3xl font-bold mb-10">My Tasks - Manage your todos at one place</h1>
                <h1 className="text-2xl font-bold my-2">
                    Add a Todo
                </h1>
                <input onChange={handleChange} value={todo} type="text" name="text" id="todo" placeholder="Add a todo" className="w-full md:w-1/3 my-2 p-2 py-2.5 rounded-md" />
                <button onClick={handleAdd} id='add-save' disabled={todo.length <= 1} className='bg-blue-700 font-semibold rounded-lg px-10 py-2 m-2 hover:bg-blue-950 hover:scale-110 duration-150 mx-5 text-lg disabled:bg-blue-500'>Add</button>
                <h2 className="text-2xl font-bold my-8">
                    <input type="checkbox" onChange={() => setshowFinished(!showFinished)} checked={showFinished} className="w-5 h-5 items-center" name="show-finished" />
                    <span className='pl-5'>
                        Show Finished Todos
                    </span>
                </h2>
                <div className='h-[1px] bg-black opacity-15 w-5/6 mx-auto'></div>
                <h2 className="text-2xl font-bold my-8">
                    TODO LIST
                </h2>
                {todos.length === 0 && <h1 className="text-2xl font-bold my-8">No Todos Found</h1>}
                {todos.map((item) => {
                    return (showFinished || !item.isCompleted) && <div className="todo flex justify-center my-10 items-center" key={item.id}>
                        <div className="flex gap-8 items-center md:w-3/4">
                            <input type="checkbox" onChange={handleCheckbox} name={item.id} checked={todo.isCompleted} className="w-5 h-5 items-center" />
                            <div className={`todo-item pr-5 md:w-11/12 flex justify-start text-lg ${item.isCompleted ? "line-through" : ""}`}>{item.todo}</div>
                        </div>
                        <div className="right flex gap-5 items-center">
                            <i onClick={(e) => handleEdit(e, item.id)} className="fa fa-trash bg-blue-950 p-2 rounded-lg cursor-pointer hover:scale-110 text-lg font-semibold flex items-center"><FaEdit /></i>
                            <i onClick={(e) => handleDelete(e, item.id)} className="fa fa-check bg-blue-950 p-2 rounded-lg cursor-pointer hover:scale-110 text-lg font-semibold flex items-center"><MdDelete /></i>
                        </div>
                    </div>
                })}
            </div>
        </>
    )
}

export default Main
