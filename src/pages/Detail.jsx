import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import bg from "../assets/web_bg2.png";

export default function Detail() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const load = async () => {
      const snap = await getDoc(doc(db, "properties", id));
      if (snap.exists()) {
        setData({ id: snap.id, ...snap.data() });
      }
    };
    load();
  }, [id]);

  if (!data)
    return (
      <div className="page-wrapper">
        <h2>Loading...</h2>
      </div>
    );

  return (
    <div
      className="page-wrapper"
      style={{
        backgroundImage: `url(${bg})`,
      }}
    >

      {/* FULL IMAGE – NO CROPPING */}
      <div
        style={{
          width: "100%",
          borderRadius: "16px",
          overflow: "hidden",
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(8px)",
        }}
      >
        <img
          src={
            data.img ||
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80"
          }
          alt="property"
          style={{
            width: "100%",
            height: "400px",
            objectFit: "contain", // ⬅ shows full image without cropping
            background: "#111",
          }}
        />
      </div>

      {/* DETAILS */}
      <div className="glass-card" style={{ marginTop: 30 }}>
        <h2 style={{ marginBottom: 10 }}>{data.title}</h2>

        <p style={{ fontSize: 20, fontWeight: "bold", marginBottom: 15 }}>
          ₹ {data.price}
        </p>

        <p>
          <strong>Address:</strong> {data.address}
        </p>

        <p style={{ marginTop: 10 }}>
          <strong>Dealer:</strong> {data.dealerEmail || "N/A"}
        </p>

        <p style={{ marginTop: 15 }}>
          <strong>Description:</strong>
          <br />
          {data.description || "No description available"}
        </p>
      </div>

      <Link to="/properties">
        <button style={{ marginTop: 20, background: "#333" }}>
          ← Back to Properties
        </button>
      </Link>
    </div>
  );
}
