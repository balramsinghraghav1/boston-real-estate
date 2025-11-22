import React, { useEffect, useState } from "react";
import { useAuth } from "../auth.jsx";
import {
  collection,
  query,
  where,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import bg from "../assets/web_bg2.png";

export default function Dashboard() {
  const { user, userDoc } = useAuth();
  const [list, setList] = useState([]);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "properties"),
      where("owner", "==", user.uid)
    );

    const unsub = onSnapshot(q, (s) =>
      setList(s.docs.map((d) => ({ id: d.id, ...d.data() })))
    );

    return () => unsub();
  }, [user]);

  if (!user) return <div className="card">Please login</div>;

  if (userDoc?.role !== "dealer")
    return <div className="card">Dashboard only for dealers</div>;

  const remove = async (id) => {
    if (!confirm("Delete this property?")) return;
    await deleteDoc(doc(db, "properties", id));
  };

  const mark = async (id) => {
    await updateDoc(doc(db, "properties", id), { status: "sold" });
  };

  return (
    <div
      className="page-wrapper"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backdropFilter: "blur(10px)",
      }}
    >
      <h2 style={{ marginBottom: 20 }}>Your Properties</h2>

      {list.length === 0 && <div className="card">No properties uploaded yet.</div>}

      {list.map((p) => (
        <div
          key={p.id}
          className="glass-card"
          style={{
            marginBottom: 20,
            padding: 20,
          }}
        >
          <h3 style={{ margin: 0 }}>
            {p.title}{" "}
            {p.status === "sold" && (
              <span className="badge-sold" style={{ marginLeft: 10 }}>
                SOLD
              </span>
            )}
          </h3>

          <div className="small" style={{ marginTop: 6 }}>
            <strong>{p.price}</strong>
          </div>

          <div className="small" style={{ marginTop: 2 }}>
            {p.address}
          </div>

          {/* Action buttons */}
          <div
            style={{
              marginTop: 14,
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            <Link to={"/edit/" + p.id}>
              <button>Edit</button>
            </Link>

            <button
              onClick={() => remove(p.id)}
              style={{ background: "#ff4c4c" }}
            >
              Delete
            </button>

            <button
              disabled={p.status === "sold"}
              onClick={() => mark(p.id)}
              style={{
                background: p.status === "sold" ? "#666" : "#27ae60",
                cursor: p.status === "sold" ? "not-allowed" : "pointer",
              }}
            >
              {p.status === "sold" ? "Sold" : "Mark Sold"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
