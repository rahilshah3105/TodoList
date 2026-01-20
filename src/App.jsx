import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Main from './components/Main'

import { ThemeProvider } from './context/ThemeContext'
import { TodoProvider } from './context/TodoContext'

function App() {
  return (
    <ThemeProvider>
      <TodoProvider>
        <Navbar />
        <Main />
      </TodoProvider>
    </ThemeProvider>
  )
}

export default App
