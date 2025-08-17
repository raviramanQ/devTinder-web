import { useState } from 'react'
import NavBar from './components/NavBar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Profile from './components/Profile'
import Login from './components/Login'
import Body from './components/Body' 
import { Provider } from 'react-redux'
import appStore from './utils/appStore'
import Feed from './components/Feed'
import Connections from './components/Connections'
import Requests from './components/Requests'
function App() {

  return (
    <>
    <Provider store = {appStore}>
      <BrowserRouter basename='/'>
      <Routes>
      <Route path='/' element={<Body></Body>}>
        <Route path='/login' element={<Login></Login>}/>
        <Route path='/profile' element={<Profile></Profile>}/>
        <Route path='/connections' element={<Connections></Connections>}/>
        <Route path='/requests' element={<Requests></Requests>}/>
        <Route path='/feed' element={<Feed></Feed>}/>
      </Route>
      </Routes>
      </BrowserRouter> 
    </Provider>   
    </>
  )
}

export default App
