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
        backdropFilter: "blur(0px)",
      }}
    >
      {/* HERO SECTION */}
      <section
        style={{
          minHeight: "420px",
          display: "flex",
          alignItems: "flex-end",
          padding: "40px",
          color: "white",
        }}
      >
        <div
          style={{
            width: "100%",
            background:
              "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.60) 100%)",
            padding: "40px",
            borderRadius: "12px",
          }}
        >
          <h1
            style={{
              fontSize: 52,
              fontWeight: 700,
              marginBottom: 10,
              color: "#ffe8a8",
              textShadow: "0 0 12px rgba(255,255,255,0.4)",
            }}
          >
            Boston Real Estate
          </h1>

          <p
            style={{
              fontSize: 18,
              opacity: 0.92,
              maxWidth: "650px",
              lineHeight: "1.6",
            }}
          >
            Discover premium properties across Boston. Buyers can explore and
            save favorites, while dealers can manage listings easily. Plus, use
            our AI-powered price prediction tool for accurate market insights.
          </p>

          <div style={{ marginTop: 22 }}>
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
      <div className="glass-card" style={{ marginTop: 40 }}>
        <h2 style={{ marginBottom: 12 }}>Website Features</h2>

        <ul style={{ lineHeight: "1.7", fontSize: 15 }}>
          <li>✨ Real-time property listings with modern UI</li>
          <li>❤️ Save & manage your favorite properties</li>
          <li>🏠 Detailed property pages with full-screen layout</li>
          <li>📈 Price Prediction Calculator (13 Boston Housing inputs)</li>
          <li>🧑‍💼 Dealer dashboard + Add/Delete Properties</li>
          <li>🔐 Secure Firebase Authentication</li>
          <li>⚡ Lightning-fast React + Vite frontend</li>
        </ul>
      </div>
    </div>
  );
}

