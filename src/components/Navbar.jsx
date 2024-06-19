import React from 'react'

const Navbar = () => {
    return (
        <>
            <nav className="flex justify-between bg-gray-700 py-2 px-5">
                <div className='flex gap-2'>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy85A5DrA9ZuHJVkLWXZdw6b-fkuBUMlnIbQ&s" alt="" width={30} />
                    <span className='flex items-center font-bold'>My TODOS</span>
                </div>
                <ul className='flex gap-8'>
                    <li className='cursor-pointer hover:scale-110 font-bold'>Home</li>
                    <li className='cursor-pointer hover:scale-110 font-bold'>Your Tasks</li>
                </ul>
            </nav>
        </>
    )
}

export default Navbar
