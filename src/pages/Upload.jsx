import React, { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../auth.jsx";
import bg from "../assets/web_bg2.png";

export default function Upload() {
  const { user, userDoc } = useAuth();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState("");

  const uploadProperty = async () => {
    if (!user || userDoc?.role !== "dealer") {
      alert("Only dealers can upload properties.");
      return;
    }

    if (!title || !price || !address || !img) {
      alert("Please fill all required fields.");
      return;
    }

    const id = Date.now().toString();

    await setDoc(doc(db, "properties", id), {
      title,
      price,
      address,
      img,
      description,
      status: "unsold",
      dealerEmail: user.email,
      dealerId: user.uid,
      createdAt: new Date().toISOString(),
    });

    alert("Property uploaded!");
    setTitle("");
    setPrice("");
    setAddress("");
    setImg("");
    setDescription("");
  };

  return (
    <div
      className="page-wrapper"
      style={{
        backgroundImage: `url(${bg})`,
      }}
    >
      <div className="glass-card" style={{ maxWidth: 600, margin: "auto" }}>
        <h2>Upload Property</h2>

        <input
          placeholder="Property Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          placeholder="Price (₹)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{
            width: "100%",
            height: "120px",
            marginTop: 10,
            borderRadius: 10,
            padding: 12,
            background: "rgba(255,255,255,0.2)",
            color: "white",
            backdropFilter: "blur(8px)",
            border: "none",
          }}
        ></textarea>

        <input
          placeholder="Image URL"
          value={img}
          onChange={(e) => setImg(e.target.value)}
        />

        <button onClick={uploadProperty} style={{ marginTop: 14 }}>
          Upload Property
        </button>
      </div>
    </div>
  );
}

