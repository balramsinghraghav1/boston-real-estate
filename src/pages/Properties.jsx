import React, { useEffect, useState } from "react";
import { collection, onSnapshot, doc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import { useAuth } from "../auth.jsx";
import bg from "../assets/web_bg2.png";

export default function Properties() {
  const { user } = useAuth();

  const [list, setList] = useState([]);
  const [favs, setFavs] = useState({});
  const [q, setQ] = useState("");
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(500000);

  // Fetch property list
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "properties"), (snap) =>
      setList(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    );
    return () => unsub();
  }, []);

  // Fetch favorites of logged-in user
  useEffect(() => {
    if (!user) {
      setFavs({});
      return;
    }

    const favCol = collection(db, "users", user.uid, "favorites");
    const unsub = onSnapshot(favCol, (snap) => {
      let o = {};
      snap.docs.forEach((d) => (o[d.id] = true));
      setFavs(o);
    });
    return () => unsub();
  }, [user]);

  // Toggle favorite
  const toggleFav = async (id) => {
    if (!user) return alert("Please login to save favorites.");

    const ref = doc(db, "users", user.uid, "favorites", id);

    if (favs[id]) {
      await deleteDoc(ref);
    } else {
      await setDoc(ref, { addedAt: new Date().toISOString() });
    }
  };

  // Filtered properties
  const filtered = () =>
    list.filter((p) => {
      const price = parseInt((p.price + "").replace(/[^0-9]/g, "")) || 0;
      return (
        price >= min &&
        price <= max &&
        (q === "" ||
          p.title.toLowerCase().includes(q.toLowerCase()) ||
          p.address.toLowerCase().includes(q.toLowerCase()))
      );
    });

  return (
    <div
      className="page-wrapper"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backdropFilter: "blur(12px)",
      }}
    >
      <h2 style={{ marginBottom: 14 }}>All Properties</h2>

      {/* Filter Box */}
      <div className="glass-card" style={{ marginBottom: 25 }}>
        <input
          placeholder="Search properties (title or address)"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />

        <div className="range-row" style={{ marginTop: 12 }}>
          <label className="small">Min Price</label>
          <input
            type="range"
            min="0"
            max="500000"
            value={min}
            onChange={(e) => setMin(Number(e.target.value))}
          />
          <span className="small">{min}</span>

          <label className="small">Max Price</label>
          <input
            type="range"
            min="0"
            max="500000"
            value={max}
            onChange={(e) => setMax(Number(e.target.value))}
          />
          <span className="small">{max}</span>
        </div>
      </div>

      {/* Property Grid */}
      <div className="grid" style={{ marginTop: 12 }}>
        {filtered().map((p) => (
          <div
            key={p.id}
            className="property-card card"
            style={{ padding: 0, overflow: "hidden" }}
          >
            <Link
              to={`/properties/${p.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <img
                src={
                  p.img ||
                  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80"
                }
                alt=""
                style={{
                  width: "100%",
                  height: "220px",
                  objectFit: "cover",
                }}
              />

              <div style={{ padding: 14 }}>
                <h3 style={{ margin: 0, fontSize: 20 }}>{p.title}</h3>

          <div style={{ marginTop: 6 }}>
              <strong style={{ display: "block" }}>₹ {p.price}</strong>
                  <span className="small" style={{ display: "block", marginTop: 6 }}>
            {p.address}
                  </span>
                </div>
              </div>
            </Link>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: 12,
              }}
            >
              <div>
                {p.status === "sold" && (
                  <span className="badge-sold">SOLD</span>
                )}
              </div>

              <div>
                <span
                  className={"fav " + (favs[p.id] ? "active" : "")}
                  onClick={() => toggleFav(p.id)}
                >
                  ♥
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
