import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../auth.jsx";
import bg from "../assets/web_bg2.png";

export default function Edit() {
  const { id } = useParams();
  const nav = useNavigate();
  const { user, userDoc } = useAuth();

  const [p, setP] = useState(null);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [address, setAddress] = useState("");
  const [img, setImg] = useState("");
  const [status, setStatus] = useState("available");

  // Load existing property data
  useEffect(() => {
    if (!id) return;

    (async () => {
      const snap = await getDoc(doc(db, "properties", id));
      if (snap.exists()) {
        const d = snap.data();
        setP(d);
        setTitle(d.title || "");
        setPrice(d.price || "");
        setAddress(d.address || "");
        setImg(d.img || "");
        setStatus(d.status || "available");
      }
    })();
  }, [id]);

  if (!p) return <div className="card">Loading...</div>;
  if (!user) return <div className="card">Please login</div>;
  if (!(user.uid === p.owner || userDoc?.role === "dealer"))
    return <div className="card">Not allowed</div>;

  // Save updates
  const save = async (e) => {
    e.preventDefault();
    await updateDoc(doc(db, "properties", id), {
      title,
      price,
      address,
      img,
      status,
    });
    alert("Property updated!");
    nav("/dashboard");
  };

  return (
    <div
      className="page-wrapper"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
      }}
    >
      <div className="glass-card" style={{ maxWidth: 760, margin: "auto" }}>
        <h2 style={{ marginBottom: 12 }}>Edit Property</h2>

        <form onSubmit={save}>
          {/* TITLE */}
          <div className="form-row">
            <label>Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
            />
          </div>

          {/* PRICE */}
          <div className="form-row">
            <label>Price</label>
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price"
            />
          </div>

          {/* ADDRESS */}
          <div className="form-row">
            <label>Address</label>
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter address"
            />
          </div>

          {/* IMAGE URL */}
          <div className="form-row">
            <label>Image URL</label>
            <input
              value={img}
              onChange={(e) => setImg(e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {/* STATUS */}
          <div className="form-row">
            <label>Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              style={{
                color: "#000", // ensure visible text
                background: "#fff",
              }}
            >
              <option value="available">Available</option>
              <option value="sold">Sold</option>
            </select>
          </div>

          <button style={{ marginTop: 16 }}>Save Changes</button>
        </form>
      </div>
    </div>
  );
}

