import React, { useState } from "react";
import { useAuth } from "../auth.jsx";
import { useNavigate, Link } from "react-router-dom";
import bg from "../assets/web_bg.png";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const submit = async () => {
    if (!email || !pass) return alert("Please enter email and password.");

    try {
      await login(email, pass);
      alert("Login successful.");
      nav("/profile");
    } catch (err) {
      alert("Invalid credentials.");
      console.log(err);
    }
  };

  return (
    <div
      className="page-wrapper"
      style={{
        backgroundImage: `url(${bg})`,
      }}
    >
      <h2>Login</h2>

      <div
        className="glass-card"
        style={{
          maxWidth: "450px",
          margin: "40px auto",
          padding: "30px",
        }}
      >
        {/* EMAIL */}
        <label>Email</label>
        <input
          type="email"
          placeholder="example@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* PASSWORD */}
        <label style={{ marginTop: 15 }}>Password</label>
        <input
          type="password"
          placeholder="Your password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />

        {/* SUBMIT BUTTON */}
        <button
          onClick={submit}
          style={{ marginTop: 20, width: "100%" }}
        >
          Login
        </button>

        <div style={{ marginTop: 12, textAlign: "center" }}>
          <span className="small">Don't have an account?</span>{" "}
          <Link to="/signup" style={{ color: "#ffd369" }}>
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
}
