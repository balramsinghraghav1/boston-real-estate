import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Properties from './pages/Properties.jsx'
import Calculator from './pages/Calculator.jsx'
import Profile from './pages/Profile.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'

export default function App(){
  return (
    <div className="app">
      <Header/>
      <div className="page">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/properties" element={<Properties/>}/>
          <Route path="/calculator" element={<Calculator/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
        </Routes>
      </div>
    </div>
  )
}

function Header(){
  return (
    <header className="site-header">
      <div className="brand">Boston Real Estate</div>
      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/properties">Properties</Link>
        <Link to="/calculator">Calculator</Link>
      </nav>
      <div className="auth">
        <Link to="/login" className="btn">Login / Signup</Link>
      </div>
    </header>
  )
}
