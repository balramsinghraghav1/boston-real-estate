import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Properties from "./pages/Properties";
import Detail from "./pages/Detail";
import Upload from "./pages/Upload";
import Dashboard from "./pages/Dashboard";
import Edit from "./pages/Edit";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Favorites from "./pages/Favorites";
import Profile from "./pages/Profile";
import Calculator from "./pages/Calculator";
import { AuthProvider, useAuth } from "./auth.jsx";

function Header() {
  const { user, userDoc, logout } = useAuth();

  return (
    <header className="header">
      <div className="header-container">

        {/* BRAND */}
        <div className="brand">Boston Real Estate</div>

        {/* NAVIGATION */}
        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/properties">Properties</Link>

          {userDoc?.role === "dealer" && (
            <>
              <Link to="/dashboard">Your Properties</Link>
              <Link to="/upload">Upload</Link>
            </>
          )}

          {userDoc?.role === "buyer" && <Link to="/favorites">Favorites</Link>}

          <Link to="/calculator">Calculator</Link>
        </nav>

        {/* RIGHT SECTION */}
        <div className="top-actions">
          {!user && (
            <>
              <Link to="/login"><button className="btn-nav">Login</button></Link>
              <Link to="/signup"><button className="btn-nav">Signup</button></Link>
            </>
          )}

          {user && <Link to="/profile"><button className="btn-nav">Profile</button></Link>}
          {user && <button className="btn-nav" onClick={logout}>Logout</button>}
        </div>
      </div>
    </header>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />

        {/* MAIN CONTENT WRAPPER */}
        <div className="page-wrapper">
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/properties" element={<Properties />} />
            <Route path="/properties/:id" element={<Detail />} />

            <Route path="/upload" element={<Upload />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/edit/:id" element={<Edit />} />

            <Route path="/favorites" element={<Favorites />} />

            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            <Route path="/profile" element={<Profile />} />
            <Route path="/calculator" element={<Calculator />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
