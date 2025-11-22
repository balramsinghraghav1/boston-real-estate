import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../auth.jsx";
import bg from "../assets/web_bg2.png";

export default function Upload() {
  const { user } = useAuth();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [address, setAddress] = useState("");
  const [img, setImg] = useState("");
  const [description, setDescription] = useState("");
  const [msg, setMsg] = useState("");

  const uploadProperty = async () => {
    if (!title || !price || !address || !img || !description) {
      setMsg("⚠ Please fill all fields");
      return;
    }

    try {
      await addDoc(collection(db, "properties"), {
        title,
        price,
        address,
        img,
        description,
        dealerEmail: user.email,   // ✅ Dealer email added
        status: "unsold",          // default
        createdAt: new Date().toISOString(),
      });

      setMsg("✅ Property uploaded successfully!");

      // Clear inputs
      setTitle("");
      setPrice("");
      setAddress("");
      setImg("");
      setDescription("");

    } catch (err) {
      console.error(err);
      setMsg("❌ Error uploading property");
    }
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
          type="text"
          placeholder="Property Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="number"
          placeholder="Price (₹)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          type="text"
          placeholder="Full Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <input
          type="text"
          placeholder="Image URL"
          value={img}
          onChange={(e) => setImg(e.target.value)}
        />

        <textarea
          placeholder="Property Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{
            width: "100%",
            padding: 12,
            borderRadius: 10,
            marginTop: 10,
            background: "rgba(255,255,255,0.18)",
            color: "white",
            backdropFilter: "blur(8px)",
            border: "none",
            minHeight: 100,
          }}
        ></textarea>

        <button onClick={uploadProperty} style={{ marginTop: 12 }}>
          Upload Property
        </button>

        {msg && (
          <p style={{ marginTop: 12, fontSize: 14, opacity: 0.9 }}>{msg}</p>
        )}
      </div>
    </div>
  );
}
