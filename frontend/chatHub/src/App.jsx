import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register';
import Navbar from './pages/NavBar';
import ChatRoom from './pages/ChatRoom';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>

          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/chat' element={<ChatRoom/>}/>

        </Routes>
      </Router>
    </>
  )
}

export default App
