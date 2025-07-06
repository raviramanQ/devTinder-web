import { useState } from 'react'
import NavBar from './navBar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Profile from './Profile'
import Login from './Login'
import Body from './Body' 
function App() {

  return (
    <>
      <BrowserRouter basename='/'>
      <Routes>
      <Route path='/' element={<Body></Body>}>
        <Route path='/login' element={<Login></Login>}/>
        <Route path='/profile' element={<Profile></Profile>}/>
      </Route>
      </Routes>
      </BrowserRouter>    
    </>
  )
}

export default App
