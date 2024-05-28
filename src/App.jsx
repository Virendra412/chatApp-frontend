import { useState,useContext } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from '@chakra-ui/react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'

import  ChatPage  from './pages/ChatPage'
import HomePage  from './pages/HomePage'

function App() {


  
  return (
    <>
    <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/chats' element={<ChatPage />} />
      </Routes>
    </>
  )
}

export default App
