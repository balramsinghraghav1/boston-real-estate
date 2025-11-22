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

  useEffect(() => {
    const ref = doc(db, "properties", id);
    const unsub = onSnapshot(ref, (d) =>
      setP(d.exists() ? { id: d.id, ...d.data() } : null)
    );
    return () => unsub();
  }, [id]);

  if (!p) return <div className="card">Loading...</div>;

  return (
    <div
      className="page-wrapper"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backdropFilter: "blur(12px)",
        paddingBottom: "50px",
      }}
    >
      <div className="card detail-grid" style={{ marginTop: 20 }}>

        {/* FIXED IMAGE BOX WITH BLUR BACKGROUND */}
        <div
          style={{
            width: "100%",
            height: "380px",
            position: "relative",
            borderRadius: 12,
            overflow: "hidden",
          }}
        >
          {/* Blurred Background */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url(${p.img})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "blur(20px)",
              transform: "scale(1.2)",
            }}
          ></div>

          {/* Actual Property Image (FULLY SHOWN) */}
          <img
            src={p.img}
            alt="property"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "contain", // FULL IMAGE VISIBLE
              zIndex: 2,
            }}
          />
        </div>

        {/* PROPERTY DETAILS */}
        <h2 style={{ marginTop: 20 }}>{p.title}</h2>

        <p style={{ fontSize: 18 }}>
          <strong>$ {p.price}</strong>
        </p>

        <p className="small" style={{ marginTop: 4 }}>
          <strong>Address:</strong> {p.address}
        </p>

        <p className="small" style={{ marginTop: 8 }}>
          <strong>Dealer:</strong> {p.ownerEmail}
        </p>

        <p style={{ marginTop: 20 }}>
          <strong>Description:</strong>
          <br />
          {p.description}
        </p>

        {p.status === "sold" && (
          <div style={{ marginTop: 12 }}>
            <span className="badge-sold">SOLD</span>
          </div>
        )}
      </div>
    </div>
  );
}


