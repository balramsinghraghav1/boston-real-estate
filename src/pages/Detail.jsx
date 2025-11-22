import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../auth.jsx";
import bg from "../assets/web_bg2.png";

export default function Detail() {
  const { id } = useParams();
  const { user, userDoc } = useAuth();

  const [data, setData] = useState(null);
  const [fav, setFav] = useState(false);

  useEffect(() => {
    const load = async () => {
      const snap = await getDoc(doc(db, "properties", id));
      if (snap.exists()) setData({ id: snap.id, ...snap.data() });
    };
    load();
  }, [id]);

  useEffect(() => {
    if (!user) return;
    const ref = doc(db, "users", user.uid, "favorites", id);
    getDoc(ref).then((d) => setFav(d.exists()));
  }, [user, id]);

  const toggleFav = async () => {
    if (!user) return alert("Please login first.");

    const ref = doc(db, "users", user.uid, "favorites", id);
    if (fav) {
      await deleteDoc(ref);
      setFav(false);
    } else {
      await setDoc(ref, { addedAt: new Date().toISOString() });
      setFav(true);
    }
  };

  if (!data) return <div className="page-wrapper"><h2>Loading...</h2></div>;

  return (
    <div className="page-wrapper" style={{ backgroundImage: `url(${bg})` }}>

      {/* FULL IMAGE */}
      <div style={{ width: "100%", marginBottom: 20 }}>
        <img
          src={
            data.img ||
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80"
          }
          alt="Property"
          style={{
            width: "100%",
            height: "auto",
            borderRadius: "14px",
          }}
        />
      </div>

      {/* DETAILS BOX */}
      <div className="glass-card">

        <h2 style={{ marginBottom: 12 }}>{data.title}</h2>

        <p><strong>₹ {data.price}</strong></p>

        <p style={{ marginTop: 10 }}><strong>Address:</strong> {data.address}</p>

        <p style={{ marginTop: 10 }}>
          <strong>Dealer:</strong> {data.dealerEmail || "NA"}
        </p>

        <p style={{ marginTop: 10 }}>
          <strong>Description:</strong><br />
          {data.description || "No description"}
        </p>

        {/* BUYER ONLY FEATURE */}
        {userDoc?.role === "buyer" && (
          <button
            onClick={toggleFav}
            style={{ marginTop: 18, background: fav ? "#ff2c74" : "#7a5cff" }}
          >
            {fav ? "♥ Saved" : "♡ Add to Favorites"}
          </button>
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
