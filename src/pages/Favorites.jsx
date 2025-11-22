import React, { useEffect, useState } from "react";
import { collection, onSnapshot, doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../auth.jsx";
import { Link } from "react-router-dom";
import bg from "../assets/web_bg.png";

export default function Favorites() {
  const { user } = useAuth();
  const [favIds, setFavIds] = useState([]);
  const [favProps, setFavProps] = useState([]);

  // Get list of favorite IDs
  useEffect(() => {
    if (!user) return;

    const ref = collection(db, "users", user.uid, "favorites");
    const unsub = onSnapshot(ref, (snap) => {
      setFavIds(snap.docs.map((d) => d.id));
    });

    return () => unsub();
  }, [user]);

  // Load each favorite property
  useEffect(() => {
    if (!favIds.length) {
      setFavProps([]);
      return;
    }

    let mounted = true;

    (async () => {
      const arr = [];
      for (const id of favIds) {
        const snap = await getDoc(doc(db, "properties", id));
        if (snap.exists()) {
          arr.push({ id: snap.id, ...snap.data() });
        }
      }
      if (mounted) setFavProps(arr);
    })();

    return () => (mounted = false);
  }, [favIds]);

  const removeFavorite = async (id) => {
    if (!user) return;
    await deleteDoc(doc(db, "users", user.uid, "favorites", id));
  };

  if (!user) {
    return (
      <div className="page-wrapper" style={{ backgroundImage: `url(${bg})` }}>
        <div className="glass-card">Please login to view favorites.</div>
      </div>
    );
  }

  return (
    <div className="page-wrapper" style={{ backgroundImage: `url(${bg})` }}>
      <h2 style={{ marginBottom: 20 }}>My Favorites</h2>

      <div className="favorites-grid">
        {favProps.length === 0 && (
          <div className="glass-card">No favorites yet.</div>
        )}

        {favProps.map((p) => (
          <div key={p.id} className="glass-card fav-card">
            <img src={p.img} alt="" />

            <div style={{ flex: 1 }}>
              <Link
                to={`/properties/${p.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <h3 style={{ marginBottom: 6 }}>{p.title}</h3>
              </Link>
              <div className="small">
                ₹ {p.price} • {p.address}
              </div>

              <button
                onClick={() => removeFavorite(p.id)}
                style={{
                  marginTop: 12,
                  background: "#ff3c6c",
                }}
              >
                Remove
              </button>
            </div>

            {p.status === "sold" && (
              <span className="badge-sold" style={{ marginLeft: 10 }}>
                SOLD
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
