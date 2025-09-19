import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './components/NavBar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Body from './Body'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'
import { Provider } from 'react-redux'
import appStore from './redux/store'
import Profile from './pages/Profile'
import Connections from './pages/Connections'


function App() {

  return (
    <Provider store={appStore}>
    <BrowserRouter basename='/'>
      <Routes>
        <Route path="/" element={<Body/>}>
          <Route path="/" element={<Login/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/connections" element={<Connections/>}/>


        </Route>
      </Routes>
    </BrowserRouter>
    </Provider>
  )
}

export default App
