import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  doc,
  getDoc,
  deleteDoc,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../auth.jsx";
import bg from "../assets/web_bg2.png";

export default function Detail() {
  const { id } = useParams();
  const nav = useNavigate();
  const { user, userDoc } = useAuth();

  const [data, setData] = useState(null);
  const [dealerEmail, setDealerEmail] = useState("");
  const [fav, setFav] = useState(false);

  // Fetch property data
  useEffect(() => {
    const fetchData = async () => {
      const snap = await getDoc(doc(db, "properties", id));
      if (snap.exists()) {
        const d = { id: snap.id, ...snap.data() };
        setData(d);

        // Fetch dealer email
        if (d.owner) {
          const userSnap = await getDoc(doc(db, "users", d.owner));
          if (userSnap.exists()) {
            setDealerEmail(userSnap.data().email || "");
          }
        }
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
    if (!user) return alert("Please login to save favorites.");

    const ref = doc(db, "users", user.uid, "favorites", id);
    if (fav) {
      await deleteDoc(ref);
      setFav(false);
    } else {
      await setDoc(ref, { addedAt: new Date().toISOString() });
      setFav(true);
    }
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
          height: "380px",
          backgroundImage: `url(${data.img ||
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200"})`,
          backgroundSize: "contain", // <-- FIXED full image visible
          backgroundRepeat: "no-repeat",
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

      {/* DETAILS */}
      <div className="glass-card" style={{ marginTop: 30 }}>
        <h2>{data.title}</h2>

        <p style={{ fontSize: 18, marginTop: 10 }}>
          <strong>₹ {data.price}</strong>
        </p>

        <p style={{ marginTop: 8 }}>
          <strong>Address:</strong> {data.address}
        </p>

        {/* Dealer email */}
        {dealerEmail && (
          <p style={{ marginTop: 8 }}>
            <strong>Dealer:</strong> {dealerEmail}
          </p>
        )}

        {/* Description */}
        {data.description && (
          <p style={{ marginTop: 15, opacity: 0.9 }}>
            <strong>Description:</strong> <br />
            {data.description}
          </p>
        )}

        {/* BUYER FAVORITES */}
        {userDoc?.role === "buyer" && (
          <button
            onClick={toggleFavorite}
            style={{
              marginTop: 18,
              background: fav ? "#ff2c74" : "#7a5cff",
            }}
          >
            {fav ? "♥ Saved" : "♡ Add to Favorites"}
          </button>
        )}

        {/* DEALER ONLY ACTIONS */}
        {userDoc?.role === "dealer" && user.uid === data.owner && (
          <div style={{ marginTop: 25, display: "flex", gap: "12px" }}>
            <Link to={`/edit/${id}`}>
              <button style={{ background: "#5c6aff" }}>Edit</button>
            </Link>

            <button
              onClick={deleteProperty}
              style={{ background: "#ff4444" }}
            >
              Delete
            </button>
          </div>
        )}
      </div>

      <Link to="/properties">
        <button style={{ marginTop: 20, background: "#333" }}>
          ← Back to Properties
        </button>
      </Link>
    </div>
  );
}
