
import React from 'react';
import { BrowserRouter,Routes,Route,Link } from 'react-router-dom';
import Home from './pages/Home';
import Properties from './pages/Properties';
import Detail from './pages/Detail';
import Upload from './pages/Upload';
import Dashboard from './pages/Dashboard';
import Edit from './pages/Edit';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Favorites from './pages/Favorites';
import Calculator from './pages/Calculator';
import Profile from './pages/Profile';
import { AuthProvider, useAuth } from './auth.jsx';

function Header(){
  const { user, userDoc, logout } = useAuth();
  return (
    <header className="header">
      <div className="container" style={{display:'flex',alignItems:'center'}}>
        <div className="brand">Boston Real Estate</div>
        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/properties">All Properties</Link>
          {userDoc?.role==='dealer' && <Link to="/dashboard">Your Properties</Link>}
          {userDoc?.role==='dealer' && <Link to="/upload">Upload</Link>}
          {userDoc?.role==='buyer' && <Link to="/favorites">My Favorites</Link>}
          {userDoc?.role==='buyer' && <Link to="/calculator">Calculator</Link>}
        </nav>
        <div className="top-actions">
          {!user && <Link to="/login"><button>Login</button></Link>}
          {!user && <Link to="/signup"><button>Signup</button></Link>}
          {user && <Link to="/profile"><button>Profile</button></Link>}
          {user && <button onClick={logout}>Logout</button>}
        </div>
      </div>
    </header>
  );
}

export default function App(){
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header/>
        <div className="container">
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/properties" element={<Properties/>}/>
            <Route path="/properties/:id" element={<Detail/>}/>
            <Route path="/upload" element={<Upload/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/edit/:id" element={<Edit/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/favorites" element={<Favorites/>}/>
            <Route path="/calculator" element={<Calculator/>}/>
            <Route path="/profile" element={<Profile/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
