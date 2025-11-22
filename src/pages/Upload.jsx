import React, { useState } from "react";
import { useAuth } from "../auth.jsx";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import bg from "../assets/web_bg.png";

export default function Upload() {
  const { user, userDoc } = useAuth();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [address, setAddress] = useState("");
  const [img, setImg] = useState("");
  const [description, setDescription] = useState("");

  const nav = useNavigate();

  if (!user) return <div className="card">Please login</div>;
  if (userDoc?.role !== "dealer")
    return <div className="card">Only dealers can upload</div>;

  const submit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "properties"), {
        title,
        price,
        address,
        img,
        description,
        owner: user.uid,
        ownerEmail: user.email,
        dealerEmail: user.email, // 🔥 required for details page
        createdAt: new Date().toISOString(),
        status: "available",
      });

      nav("/properties");
    } catch (e) {
      alert("Upload failed " + e.message);
    }
  };

  return (
    <div
      className="page-wrapper"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="glass-card" style={{ maxWidth: "780px", margin: "auto" }}>
        <h2 style={{ marginBottom: 20 }}>Upload New Property</h2>

        <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>

          <div className="form-row">
            <label>Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Beautiful Villa"
            />
          </div>

          <div className="form-row">
            <label>Price</label>
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="ex- 150000"
            />
          </div>

          <div className="form-row">
            <label>Address</label>
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Street, City, State, Country"
            />
          </div>

          <div className="form-row">
            <label>Image URL</label>
            <input
              value={img}
              onChange={(e) => setImg(e.target.value)}
              placeholder="https://example.com/house.jpg"
            />
          </div>

          <div className="form-row">
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the property"
              style={{
                width: "100%",
                minHeight: "110px",
                padding: "12px",
                background: "rgba(255,255,255,0.22)",
                borderRadius: "10px",
                color: "white",
                border: "none",
                outline: "none",
                backdropFilter: "blur(8px)",
              }}
            ></textarea>
          </div>

          <button type="submit" style={{ marginTop: "10px" }}>
            Upload Property
          </button>
        </form>
      </div>
    </div>
  );
}

