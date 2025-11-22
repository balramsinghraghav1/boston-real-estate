import React from "react";
import { Link } from "react-router-dom";
import bg from "../assets/web_bg.png";

export default function Home() {
  return (
    <div
      className="page-wrapper home-page"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >

      {/* HERO SECTION */}
      <section
        style={{
          minHeight: "480px",
          display: "flex",
          alignItems: "flex-end",
          padding: "60px 40px",
          color: "white",
        }}
      >
        <div
          style={{
            width: "100%",
            padding: "40px",
            borderRadius: "14px",
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.00) 0%, rgba(0,0,0,0.65) 100%)",
          }}
        >
          <h1
            style={{
              fontSize: 54,
              fontWeight: 700,
              marginBottom: 12,
              color: "#ffe8a8",
              textShadow: "0 0 15px rgba(255, 255, 255, 0.45)",
            }}
          >
            Boston Real Estate
          </h1>

          <p
            style={{
              fontSize: 18,
              opacity: 0.93,
              maxWidth: "680px",
              lineHeight: "1.65",
            }}
          >
            Discover premium properties across Boston. Buyers can explore and
            save favorites, while dealers can manage listings seamlessly. Plus,
            use our AI-powered price prediction tool based on 13 Boston Housing
            dataset features for accurate market insights.
          </p>

          <div style={{ marginTop: 25 }}>
            <Link to="/properties">
              <button style={{ marginRight: 12 }}>Explore Properties</button>
            </Link>

            <Link to="/calculator">
              <button
                style={{
                  background: "rgba(255,255,255,0.18)",
                  backdropFilter: "blur(10px)",
                }}
              >
                Price Calculator
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURE SECTION */}
      <div className="glass-card" style={{ marginTop: 45 }}>
        <h2 style={{ marginBottom: 14 }}>Website Features</h2>

        <ul style={{ lineHeight: "1.8", fontSize: 15 }}>
          <li>✨ Real-time property listings with premium UI</li>
          <li>❤️ Save & manage your favorite properties</li>
          <li>🏠 Full-screen property detail page with owner email</li>
          <li>📈 13-Input Boston Housing Price Prediction Calculator</li>
          <li>🧑‍💼 Dealer Dashboard: Add / Delete / Manage Listings</li>
          <li>🔐 Firebase Authentication (Login / Signup / Logout)</li>
          <li>⚡ Lightning-fast React + Vite Frontend</li>
        </ul>
      </div>
    </div>
  );
}

