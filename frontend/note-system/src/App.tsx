import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Note from './components/note.tsx'


function App() {
  const [count, setCount] = useState(0)
  return (
    <>
    <Note />
   </>
  )
}

export default App
