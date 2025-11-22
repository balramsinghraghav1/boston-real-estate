import React, { useEffect, useState } from "react";
import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import { useAuth } from "../auth.jsx";
import bg from "../assets/web_bg2.png";

export default function Dashboard() {
  const { user, userDoc } = useAuth();
  const [list, setList] = useState([]);

  // Only dealer's own properties
  useEffect(() => {
    if (!user) return;

    const unsub = onSnapshot(collection(db, "properties"), (snap) => {
      const all = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      const mine = all.filter((p) => p.owner === user.uid);
      setList(mine);
    });

    return () => unsub();
  }, [user]);

  const markSold = async (id) => {
    await updateDoc(doc(db, "properties", id), { status: "sold" });
  };

  if (!user || userDoc?.role !== "dealer") {
    return (
      <div className="page-wrapper">
        <h2>You are not authorized to view this page.</h2>
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
      <h2 style={{ marginBottom: 20 }}>Your Properties</h2>

      {list.length === 0 && (
        <div className="glass-card" style={{ maxWidth: 500 }}>
          <p>No properties uploaded yet.</p>
          <Link to="/upload">
            <button style={{ marginTop: 12 }}>Upload Now</button>
          </Link>
        </div>
      )}

      <div className="grid" style={{ marginTop: 15 }}>
        {list.map((p) => (
          <div key={p.id} className="property-card glass-card" style={{ padding: 0 }}>
            <img
              src={
                p.img ||
                "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80"
              }
              alt=""
              style={{
                width: "100%",
                height: 200,
                objectFit: "cover",
                borderTopLeftRadius: 16,
                borderTopRightRadius: 16,
              }}
            />

            <div style={{ padding: 14 }}>
              <h3 style={{ margin: 0 }}>{p.title}</h3>
              <div className="meta">
                <span>₹ {p.price}</span>
                <span className="small">{p.address}</span>
              </div>

              {p.status === "sold" && (
                <div
                  style={{
                    marginTop: 8,
                    padding: "5px 10px",
                    background: "#27ae60",
                    color: "white",
                    fontSize: 12,
                    borderRadius: 6,
                    fontWeight: 700,
                    width: "fit-content",
                  }}
                >
                  SOLD
                </div>
              )}
            </div>

            {/* ACTION BUTTONS */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: 14,
              }}
            >
              <Link to={`/edit/${p.id}`}>
                <button style={{ background: "#6b6bff" }}>Edit</button>
              </Link>

              {p.status !== "sold" && (
                <button
                  onClick={() => markSold(p.id)}
                  style={{ background: "#27ae60" }}
                >
                  Mark as Sold
                </button>
              )}

              <Link to={`/delete/${p.id}`}>
                <button style={{ background: "#ff4747" }}>Delete</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
