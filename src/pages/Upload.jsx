import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useAuth } from "../auth.jsx";
import bg from "../assets/web_bg2.png";

export default function Upload() {
  const { user, userDoc } = useAuth();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    if (!user) return alert("Please login first.");
    if (userDoc?.role !== "dealer")
      return alert("Only dealers can upload properties.");

    await addDoc(collection(db, "properties"), {
      title,
      price,
      address,
      description,
      img,
      status: "unsold",
      dealerEmail: user.email,
      owner: user.uid,
      createdAt: new Date().toISOString(),
    });

    alert("Property Uploaded Successfully!");
    setTitle("");
    setPrice("");
    setAddress("");
    setDescription("");
    setImg("");
  };

  return (
    <div
      className="page-wrapper"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backdropFilter: "blur(6px)",
      }}
    >
      <div className="glass-card" style={{ maxWidth: 650, margin: "auto" }}>
        <h2>Upload Property</h2>

        <form onSubmit={submit}>
          <label>Property Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Beautiful 3BHK Apartment"
          />

          <label>Price (₹)</label>
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            placeholder="2500000"
          />

          <label>Address</label>
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            placeholder="Boston, MA"
          />

          <label>Full Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            style={{
              width: "100%",
              marginTop: 8,
              padding: 14,
              borderRadius: 10,
              background: "rgba(255,255,255,0.18)",
              color: "white",
              outline: "none",
              border: "none",
            }}
            placeholder="Describe the property details and features..."
          ></textarea>

          <label>Property Image URL</label>
          <input
            value={img}
            onChange={(e) => setImg(e.target.value)}
            required
            placeholder="https://example.com/house.jpg"
          />

          <button style={{ marginTop: 20 }}>Upload Property</button>
        </form>
      </div>
    </div>
  );
}
