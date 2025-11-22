import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../auth.jsx";
import bg from "../assets/web_bg.png";

export default function Detail() {
  const { id } = useParams();
  const nav = useNavigate();
  const { user, userDoc } = useAuth();

  const [data, setData] = useState(null);
  const [fav, setFav] = useState(false);

  // Fetch property data
  useEffect(() => {
    const fetchData = async () => {
      const snap = await getDoc(doc(db, "properties", id));
      if (snap.exists()) {
        setData({ id: snap.id, ...snap.data() });
      }
    };
    fetchData();
  }, [id]);

  // Check if already in favorites
  useEffect(() => {
    if (!user) return;
    const ref = doc(db, "users", user.uid, "favorites", id);
    getDoc(ref).then((d) => setFav(d.exists()));
  }, [user, id]);

  const toggleFavorite = async () => {
    if (!user) return alert("Please login to favorite properties.");

    const ref = doc(db, "users", user.uid, "favorites", id);
    if (fav) {
      await deleteDoc(ref);
      setFav(false);
    } else {
      await setDoc(ref, { addedAt: new Date().toISOString() });
      setFav(true);
    }
  };

  const markAsSold = async () => {
    await updateDoc(doc(db, "properties", id), { status: "sold" });
    setData({ ...data, status: "sold" });
  };

  const deleteProperty = async () => {
    await deleteDoc(doc(db, "properties", id));
    nav("/properties");
  };

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
      {/* PROPERTY IMAGE */}
      <div
        style={{
          width: "100%",
          height: "360px",
          backgroundImage: `url(${data.img ||
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80"})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "14px",
        }}
      >
        {data.status === "sold" && (
          <div
            style={{
              padding: "8px 18px",
              background: "#ff4f4f",
              color: "white",
              fontWeight: 700,
              fontSize: 18,
              position: "absolute",
              margin: 20,
              borderRadius: 8,
              backdropFilter: "blur(5px)",
            }}
          >
            SOLD
          </div>
        )}
      </div>

      {/* DETAILS CARD */}
      <div className="glass-card" style={{ marginTop: 30 }}>
        <h2 style={{ marginBottom: 8 }}>{data.title}</h2>

        <p style={{ fontSize: 17, opacity: 0.9 }}>
          <strong>₹ {data.price}</strong>
        </p>

        <p style={{ marginTop: 8, opacity: 0.9 }}>{data.address}</p>

        <p style={{ marginTop: 18 }}>{data.description}</p>

        {/* FAVORITES BUTTON (BUYER ONLY) */}
        {userDoc?.role === "buyer" && (
          <button
            onClick={toggleFavorite}
            style={{
              marginTop: 16,
              background: fav ? "#ff2c74" : "#7a5cff",
            }}
          >
            {fav ? "♥ Saved" : "♡ Add to Favorites"}
          </button>
        )}

        {/* DEALER ACTIONS */}
        {userDoc?.role === "dealer" && (
          <div style={{ marginTop: 22, display: "flex", gap: "12px" }}>
            <Link to={`/edit/${id}`}>
              <button style={{ background: "#5c6aff" }}>Edit Property</button>
            </Link>

            <button
              onClick={markAsSold}
              style={{ background: "#27ae60" }}
            >
              Mark as Sold
            </button>

            <button
              onClick={deleteProperty}
              style={{ background: "#ff4444" }}
            >
              Delete
            </button>
          </div>
        )}
      </div>

      {/* BACK TO LIST */}
      <Link to="/properties">
        <button style={{ marginTop: 20, background: "#333" }}>
          ← Back to Properties
        </button>
      </Link>
    </div>
  );
}
