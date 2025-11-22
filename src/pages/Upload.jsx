import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../auth.jsx";
import { useNavigate } from "react-router-dom";
import bg from "../assets/web_bg.png";

export default function Upload() {
  const { user, userDoc } = useAuth();
  const nav = useNavigate();

  const [form, setForm] = useState({
    title: "",
    price: "",
    address: "",
    description: "",
    img: ""
  });

  // Handle input change
  const update = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  // Upload property
  const submit = async () => {
    if (!form.title || !form.price || !form.address) {
      alert("Please fill required fields.");
      return;
    }

    await addDoc(collection(db, "properties"), {
      ...form,
      status: "available",
      owner: user.uid,
      createdAt: new Date().toISOString()
    });

    alert("Property uploaded successfully.");
    nav("/dashboard");
  };

  if (!user || userDoc?.role !== "dealer") {
    return (
      <div className="page-wrapper">
        <h2>You are not authorized to upload properties.</h2>
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
      <h2>Upload Property</h2>

      <div
        className="glass-card"
        style={{
          maxWidth: "750px",
          margin: "auto",
          marginTop: 25
        }}
      >
        {/* TITLE */}
        <label>Property Title</label>
        <input
          type="text"
          placeholder="Modern 3BHK Apartment"
          value={form.title}
          onChange={(e) => update("title", e.target.value)}
        />

        {/* PRICE */}
        <label style={{ marginTop: 12 }}>Price</label>
        <input
          type="number"
          placeholder="120000"
          value={form.price}
          onChange={(e) => update("price", e.target.value)}
        />

        {/* ADDRESS */}
        <label style={{ marginTop: 12 }}>Address</label>
        <input
          type="text"
          placeholder="123 Main Street, Boston"
          value={form.address}
          onChange={(e) => update("address", e.target.value)}
        />

        {/* IMAGE URL */}
        <label style={{ marginTop: 12 }}>Image URL</label>
        <input
          type="text"
          placeholder="https://example.com/image.jpg"
          value={form.img}
          onChange={(e) => update("img", e.target.value)}
        />

        {/* DESCRIPTION */}
        <label style={{ marginTop: 12 }}>Description</label>
        <textarea
          placeholder="Describe the property..."
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
          style={{
            width: "100%",
            minHeight: "120px",
            padding: 14,
            borderRadius: 10,
            border: "none",
            background: "rgba(255, 255, 255, 0.22)",
            color: "#fff",
            marginTop: 8,
            resize: "none",
            outline: "none",
            backdropFilter: "blur(10px)"
          }}
        />

        {/* SUBMIT BUTTON */}
        <button
          onClick={submit}
          style={{ marginTop: 18, width: "100%" }}
        >
          Upload Property
        </button>
      </div>
    </div>
  );
}

