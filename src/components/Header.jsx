import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth.jsx";

/**
 * Simple header — sticky at top
 * Make sure you DO NOT render a second header anywhere in pages (remove extra header tags)
 */
export default function Header(){
  const { user, userDoc, logout } = useAuth();

  return (
    <header className="header">
      <div style={{display:'flex', alignItems:'center', width:'100%'}}>
        <div className="brand">Boston Real Estate</div>

        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/properties">Properties</Link>
          {userDoc?.role === 'buyer' && <Link to="/favorites">Favorites</Link>}
          {userDoc?.role === 'buyer' && <Link to="/calculator">Calculator</Link>}
          {userDoc?.role === 'dealer' && <Link to="/dashboard">Your Properties</Link>}
          {userDoc?.role === 'dealer' && <Link to="/upload">Upload</Link>}
        </nav>

        <div className="actions">
          {!user && <Link to="/login"><button className="btn-nav">Login</button></Link>}
          {!user && <Link to="/signup"><button className="btn-nav">Signup</button></Link>}
          {user && <Link to="/profile"><button className="btn-nav">Profile</button></Link>}
          {user && <button className="btn-nav" onClick={logout}>Logout</button>}
        </div>
      </div>
    </header>
  );
}
