import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../auth.jsx";
import bg from "../assets/web_bg2.png";

export default function Signup() {
  const { signup } = useAuth();
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [role, setRole] = useState("buyer"); // default buyer
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !pass) {
      alert("Please enter email and password.");
      return;
    }
    if (!["buyer", "dealer"].includes(role)) {
      alert("Please select a valid role.");
      return;
    }

    try {
      setLoading(true);
      // signup(email, password, role) — auth.jsx creates the userDoc with role
      await signup(email.trim(), pass, role);
      alert("Account created successfully.");
      nav("/profile");
    } catch (err) {
      console.error("Signup error:", err);
      const msg = (err && err.message) || "Signup failed. Try again.";
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="page-wrapper"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <h2 style={{ color: "white", textAlign: "left", marginLeft: 12 }}>
        Create account
      </h2>

      <div
        className="glass-card"
        style={{
          maxWidth: 520,
          margin: "20px auto",
          padding: 26,
        }}
      >
        <form onSubmit={handleSubmit}>
          <label style={{ fontWeight: 600 }}>Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label style={{ marginTop: 12, fontWeight: 600 }}>Password</label>
          <input
            type="password"
            placeholder="Minimum 6 characters"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            minLength={6}
            required
          />

          <label style={{ marginTop: 12, fontWeight: 600 }}>
            Role (choose one)
          </label>
          
          {/* UPDATED SELECT ELEMENT */}
          <select 
            value={role} 
            onChange={(e) => setRole(e.target.value)}
            style={{
                color: "black",           // Text is black
                backgroundColor: "white", // Background is white
                padding: "10px",          // Added padding for better look
                borderRadius: "5px",      // Rounded corners
                border: "none",           // Remove default border
                width: "100%",            // Full width
                cursor: "pointer",
                marginTop: "5px"
            }}
          >
            {/* Options will inherit Black Text / White BG from the select style above */}
            <option value="buyer">Buyer</option>
            <option value="dealer">Dealer</option>
          </select>

          <button
            type="submit"
            style={{ marginTop: 18, width: "100%" }}
            disabled={loading}
          >
            {loading ? "Creating account..." : "Create account"}
          </button>

          <div style={{ marginTop: 12, textAlign: "center" }}>
            <small style={{ color: "#ddd" }}>
              By creating an account you agree to the terms. Already have an
              account?{" "}
              <Link to="/login" style={{ color: "#ffd369", textDecoration: "none" }}>
                Login
              </Link>
            </small>
          </div>
        </form>
      </div>
    </div>
  );
}
