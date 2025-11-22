import React, { useEffect, useState } from "react";
import { collection, onSnapshot, doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../auth.jsx";
import { Link } from "react-router-dom";
import bg from "../assets/web_bg.png";

export default function Favorites() {
  const { user, userDoc } = useAuth();
  const [favIds, setFavIds] = useState([]);
  const [propsList, setPropsList] = useState([]);

  // Read user's favorite document IDs
  useEffect(() => {
    if (!user) return;

    const favCol = collection(db, "users", user.uid, "favorites");
    const unsub = onSnapshot(favCol, (snap) => {
      const ids = snap.docs.map((d) => d.id);
      setFavIds(ids);
    });

    return () => unsub();
  }, [user]);

  // Fetch actual property documents
  useEffect(() => {
    if (favIds.length === 0) {
      setPropsList([]);
      return;
    }

    const load = async () => {
      let temp = [];
      for (const id of favIds) {
        const p = await getDoc(doc(db, "properties", id));
        if (p.exists()) temp.push({ id: p.id, ...p.data() });
      }
      setPropsList(temp);
    };

    load();
  }, [favIds]);

  // Remove from favorites
  const removeFav = async (id) => {
    await deleteDoc(doc(db, "users", user.uid, "favorites", id));
  };

  if (!user) {
    return (
      <div className="page-wrapper">
        <h2>Please login to view favorites</h2>
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
      <h2>My Favorites</h2>

      <div className="glass-card" style={{ marginBottom: 20 }}>
        <p>These are the properties you have saved.</p>
      </div>

      {propsList.length === 0 && (
        <div className="glass-card">
          <p>No favorite properties yet.</p>
        </div>
      )}

      <div className="favorites-grid">
        {propsList.map((p) => (
          <div key={p.id} className="fav-card glass-card">
            <img
              src={
                p.img ||
                "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80"
              }
              alt=""
            />

            <div style={{ flex: 1 }}>
              <Link
                to={`/properties/${p.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <h3 style={{ margin: 0 }}>{p.title}</h3>
              </Link>

              <div className="small" style={{ marginTop: 4 }}>
                ₹ {p.price} • {p.address}
              </div>

              {p.status === "sold" && (
                <span
                  className="badge-sold"
                  style={{
                    display: "inline-block",
                    marginTop: 8,
                    background: "#27ae60",
                    padding: "4px 10px",
                    borderRadius: 6,
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  SOLD
                </span>
              )}

              <button
                onClick={() => removeFav(p.id)}
                style={{
                  marginTop: 12,
                  background: "#ff3f6c",
                }}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

