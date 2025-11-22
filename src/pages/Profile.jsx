import React from "react";
import { useAuth } from "../auth.jsx";
import { useNavigate } from "react-router-dom";
import bg from "../assets/web_bg.png";

export default function Profile() {
  const { user, userDoc, logout } = useAuth();
  const nav = useNavigate();

  if (!user) {
    return (
      <div className="page-wrapper">
        <h2>Please login to view your profile.</h2>
      </div>
    );
  }

  return (
    <div
      className="page-wrapper"
      style={{
        backgroundImage: `url(${bg})`,
      }}
    >
      <h2>Your Profile</h2>

      <div
        className="glass-card"
        style={{
          maxWidth: "600px",
          margin: "40px auto",
          padding: "30px",
        }}
      >
        <h3 style={{ marginTop: 0, marginBottom: 15 }}>Account Details</h3>

        <div className="profile-row">
          <strong>Email:</strong> {user.email}
        </div>

        <div className="profile-row">
          <strong>Role:</strong> {userDoc?.role === "dealer" ? "Dealer" : "Buyer"}
        </div>

        <div className="profile-row">
          <strong>Joined:</strong>{" "}
          {userDoc?.createdAt
            ? new Date(userDoc.createdAt).toLocaleString()
            : "—"}
        </div>

        <div style={{ marginTop: 25 }}>
          <button
            onClick={() => logout()}
            style={{
              width: "100%",
              background: "#ff4f4f",
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
