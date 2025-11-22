import React, { useState } from "react";
import { useAuth } from "../auth.jsx";
import { Link, useNavigate } from "react-router-dom";
import bg from "../assets/web_bg.png";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setErr("");

    try {
      await login(email, pw);
      nav("/");
    } catch (error) {
      console.error(error);
      setErr("Invalid email or password");
    }
  };

  return (
    <div
      className="page-wrapper"
      style={{
        backgroundImage: `url(${bg})`,
        backdropFilter: "blur(12px)",
      }}
    >
      <div className="glass-card" style={{ maxWidth: 450, margin: "auto", marginTop: 60 }}>
        <h2 style={{ marginBottom: 10 }}>Login</h2>

        {err && (
          <div
            style={{
              background: "rgba(255, 80, 80, 0.2)",
              padding: 10,
              borderRadius: 8,
              marginBottom: 10,
              color: "#ffb2b2",
            }}
          >
            {err}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label style={{ marginTop: 14 }}>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
          />

          <button type="submit" style={{ marginTop: 20, width: "100%" }}>
            Login
          </button>
        </form>

        <p style={{ marginTop: 14, fontSize: 14 }}>
          Don't have an account?{" "}
          <Link to="/signup" style={{ color: "#ffd68a" }}>
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}
