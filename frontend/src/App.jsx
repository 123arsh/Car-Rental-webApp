import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signup from './components/auth/signup'
import Home from './components/home'
import Login from './components/auth/login'
import Navigation from './components/subComponents/navigation'
import Hero from './components/hero'
const App = () => {
  return (
    <div>
    <Navigation/>
    <Hero />
    {/* <div className='h-screen w-full'></div>
    <div className='h-screen w-full'></div>
    <div className='h-screen w-full'></div> */}

    {/* <BrowserRouter>
      <Routes>
      <Route path='/' element={ <Home /> }/>
        <Route path='/signup' element={ <Signup /> }/>
        <Route path='/login' element={ <Login /> }/>
      </Routes>
    </BrowserRouter> */}
    </div>
  )
}

export default App