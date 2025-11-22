import React, { useState } from "react";
import { useAuth } from "../auth.jsx";
import { useNavigate, Link } from "react-router-dom";
import bg from "../assets/web_bg.png";

export default function Signup() {
  const { signup } = useAuth();
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const submit = async () => {
    if (!email || !pass) {
      alert("Please fill all fields.");
      return;
    }

    try {
      // default role = buyer
      await signup(email, pass, "buyer");
      alert("Account created successfully.");
      nav("/profile");
    } catch (err) {
      console.error(err);
      alert("Signup failed. Try again.");
    }
  };

  return (
    <div
      className="page-wrapper"
      style={{
        backgroundImage: `url(${bg})`,
      }}
    >
      <h2>Create Account</h2>

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

        {/* SIGNUP BUTTON */}
        <button
          onClick={submit}
          style={{ marginTop: 20, width: "100%" }}
        >
          Sign Up
        </button>

        <div style={{ marginTop: 12, textAlign: "center" }}>
          <span className="small">Already have an account?</span>{" "}
          <Link to="/login" style={{ color: "#ffd369" }}>
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
