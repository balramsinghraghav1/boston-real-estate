import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../auth.jsx";
import bg from "../assets/web_bg2.png";

export default function Edit() {
  const { user, userDoc } = useAuth();
  const { id } = useParams();
  const nav = useNavigate();

  const [form, setForm] = useState({
    title: "",
    price: "",
    address: "",
    description: "",
    img: ""
  });

  // Fetch property details
  useEffect(() => {
    const fetchData = async () => {
      const snap = await getDoc(doc(db, "properties", id));
      if (snap.exists()) {
        const data = snap.data();
        setForm({
          title: data.title,
          price: data.price,
          address: data.address,
          description: data.description,
          img: data.img || ""
        });
      }
    };
    fetchData();
  }, [id]);

  // Update form fields
  const update = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  // Save edited changes
  const save = async () => {
    await updateDoc(doc(db, "properties", id), {
      ...form,
      updatedAt: new Date().toISOString(),
    });

    alert("Property updated successfully.");
    nav("/dashboard");
  };

  if (!user || userDoc?.role !== "dealer") {
    return (
      <div className="page-wrapper">
        <h2>You are not authorized to edit properties.</h2>
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
      <h2>Edit Property</h2>

      <div
        className="glass-card"
        style={{
          maxWidth: "750px",
          margin: "auto",
          marginTop: 25,
        }}
      >
        {/* TITLE */}
        <label>Property Title</label>
        <input
          type="text"
          value={form.title}
          onChange={(e) => update("title", e.target.value)}
          placeholder="Updated title"
        />

        {/* PRICE */}
        <label style={{ marginTop: 12 }}>Price</label>
        <input
          type="number"
          value={form.price}
          onChange={(e) => update("price", e.target.value)}
          placeholder="Updated price"
        />

        {/* ADDRESS */}
        <label style={{ marginTop: 12 }}>Address</label>
        <input
          type="text"
          value={form.address}
          onChange={(e) => update("address", e.target.value)}
          placeholder="Updated address"
        />

        {/* IMAGE URL */}
        <label style={{ marginTop: 12 }}>Image URL</label>
        <input
          type="text"
          value={form.img}
          onChange={(e) => update("img", e.target.value)}
          placeholder="https://example.com/new-image.jpg"
        />

        {/* DESCRIPTION */}
        <label style={{ marginTop: 12 }}>Description</label>
        <textarea
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
          style={{
            width: "100%",
            minHeight: "120px",
            padding: 14,
            borderRadius: 10,
            border: "none",
            marginTop: 8,
            background: "rgba(255, 255, 255, 0.22)",
            backdropFilter: "blur(10px)",
            color: "white",
            resize: "none",
            outline: "none",
          }}
        />

        {/* SAVE BUTTON */}
        <button onClick={save} style={{ marginTop: 18, width: "100%" }}>
          Save Changes
        </button>

        {/* BACK BUTTON */}
        <button
          onClick={() => nav("/dashboard")}
          style={{ marginTop: 12, width: "100%", background: "#333" }}
        >
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );
}
