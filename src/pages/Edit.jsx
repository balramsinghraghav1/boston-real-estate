import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import bg from "../assets/web_bg2.png";

export default function Edit() {
  const { id } = useParams();
  const nav = useNavigate();

  const [data, setData] = useState(null);

  // Fetch existing property data
  useEffect(() => {
    const load = async () => {
      const snap = await getDoc(doc(db, "properties", id));
      if (snap.exists()) setData({ id: snap.id, ...snap.data() });
    };
    load();
  }, [id]);

  const updateNow = async () => {
    await updateDoc(doc(db, "properties", id), {
      title: data.title,
      price: data.price,
      address: data.address,
      description: data.description,
      img: data.img,
      status: data.status, // sold OR unsold
    });

    alert("Property Updated");
    nav(`/properties/${id}`);
  };

  if (!data)
    return (
      <div className="page-wrapper">
        <h2>Loading...</h2>
      </div>
    );

  return (
    <div
      className="page-wrapper"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="glass-card">
        <h2>Edit Property</h2>

        {/* TITLE */}
        <label className="small">Title</label>
        <input
          value={data.title}
          onChange={(e) => setData({ ...data, title: e.target.value })}
        />

        {/* PRICE */}
        <label className="small">Price</label>
        <input
          value={data.price}
          onChange={(e) => setData({ ...data, price: e.target.value })}
        />

        {/* ADDRESS */}
        <label className="small">Address</label>
        <input
          value={data.address}
          onChange={(e) => setData({ ...data, address: e.target.value })}
        />

        {/* IMAGE URL */}
        <label className="small">Image URL</label>
        <input
          value={data.img}
          onChange={(e) => setData({ ...data, img: e.target.value })}
        />

        {/* DESCRIPTION */}
        <label className="small">Description</label>
        <textarea
          style={{
            width: "100%",
            minHeight: "120px",
            padding: "12px",
            borderRadius: "10px",
            background: "rgba(255,255,255,0.22)",
            color: "white",
            border: "none",
            outline: "none",
          }}
          value={data.description}
          onChange={(e) =>
            setData({ ...data, description: e.target.value })
          }
        ></textarea>

        {/* STATUS (Sold / Unsold) */}
        <label className="small">Status</label>
        <select
          value={data.status}
          onChange={(e) => setData({ ...data, status: e.target.value })}
        >
          <option value="unsold">Unsold</option>
          <option value="sold">Sold</option>
        </select>

        {/* UPDATE BUTTON */}
        <button
          style={{ marginTop: 20 }}
          onClick={updateNow}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
