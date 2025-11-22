import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../auth.jsx";
import bg from "../assets/web_bg.png";

export default function Detail() {
  const { id } = useParams();
  const { user, userDoc } = useAuth();

  const [data, setData] = useState(null);
  const [fav, setFav] = useState(false);

  // Fetch property data
  useEffect(() => {
    const load = async () => {
      const snap = await getDoc(doc(db, "properties", id));
      if (snap.exists()) {
        setData({ id: snap.id, ...snap.data() });
      }
    };
    load();
  }, [id]);

  // Check favorites
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
      {/* FULL IMAGE */}
      <div
        style={{
          width: "100%",
          height: "380px",
          backgroundImage: `url(${
            data.img ||
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80"
          })`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "14px",
        }}
      ></div>

      {/* DETAILS */}
      <div className="glass-card" style={{ marginTop: 25 }}>
        <h2 style={{ marginBottom: 10 }}>{data.title}</h2>

        <p style={{ fontSize: 20, fontWeight: 600 }}>₹ {data.price}</p>

        <p style={{ marginTop: 10 }}>
          <strong>Address:</strong> {data.address}
        </p>

        <p style={{ marginTop: 10 }}>
          <strong>Dealer:</strong> {data.dealerEmail || "N/A"}
        </p>

        <p style={{ marginTop: 15 }}>
          <strong>Description:</strong>
          <br />
          {data.description || "No description provided."}
        </p>

        {/* BUYER FAVORITE BUTTON ONLY */}
        {userDoc?.role === "buyer" && (
          <button
            onClick={toggleFavorite}
            style={{
              marginTop: 20,
              background: fav ? "#ff2c74" : "#7a5cff",
            }}
          >
            {fav ? "♥ Saved to Favorites" : "♡ Add to Favorites"}
          </button>
        )}
      </div>

      <Link to="/properties">
        <button
          style={{ marginTop: 20, background: "#333", borderRadius: 10 }}
        >
          ← Back to Properties
        </button>
      </Link>
    </div>
  );
}
