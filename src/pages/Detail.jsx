import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../auth.jsx";
import bg from "../assets/web_bg2.png";

export default function Detail() {
  const { id } = useParams();
  const { user } = useAuth();

  const [p, setP] = useState(null);

  // Fetch Property Live
  useEffect(() => {
    const ref = doc(db, "properties", id);
    const unsub = onSnapshot(ref, (d) =>
      setP(d.exists() ? { id: d.id, ...d.data() } : null)
    );
    return () => unsub();
  }, [id]);

  if (!p)
    return (
      <div className="page-wrapper">
        <div className="glass-card">Loading...</div>
      </div>
    );

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
      <div className="glass-card" style={{ padding: 20 }}>
        {/* IMAGE */}
        <img
          src={
            p.img ||
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80"
          }
          style={{
            width: "100%",
            height: "380px",
            borderRadius: "12px",
            objectFit: "cover", // FULL IMAGE — NO CROP
          }}
          alt=""
        />

        <h2 style={{ marginTop: 16 }}>{p.title}</h2>

        <p style={{ fontSize: 20, fontWeight: 700 }}>₹ {p.price}</p>

        <p className="small" style={{ marginTop: 6 }}>
          <strong>Address:</strong> {p.address}
        </p>

        <p className="small" style={{ marginTop: 12 }}>
          <strong>Dealer:</strong> {p.ownerEmail || "NA"}
        </p>

        <p style={{ marginTop: 12 }}>
          <strong>Description:</strong>
          <br />
          {p.description || "No description added"}
        </p>

        {p.status === "sold" && (
          <div
            style={{
              marginTop: 12,
              background: "#ff4f4f",
              display: "inline-block",
              padding: "6px 14px",
              borderRadius: "8px",
              fontWeight: 700,
            }}
          >
            SOLD
          </div>
        )}
      </div>
    </div>
  );
}

