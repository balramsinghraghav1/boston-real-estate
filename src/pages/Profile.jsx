import React, { useEffect, useState } from "react";
import { useAuth } from "../auth.jsx";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import bg from "../assets/web_bg2.png";

export default function Profile() {
  const { user, userDoc } = useAuth();
  const [favCount, setFavCount] = useState(0);
  const [propCount, setPropCount] = useState(0);

  // Fetch favorite count
  useEffect(() => {
    if (!user) return;
    const loadFav = async () => {
      const favSnap = await getDocs(collection(db, "users", user.uid, "favorites"));
      setFavCount(favSnap.size);
    };
    loadFav();
  }, [user]);

  // Fetch dealer property count
  useEffect(() => {
    if (!user || userDoc?.role !== "dealer") return;
    const loadProps = async () => {
      const snap = await getDocs(collection(db, "properties"));
      const myProps = snap.docs.filter((d) => d.data().owner === user.uid);
      setPropCount(myProps.length);
    };
    loadProps();
  }, [user, userDoc]);

  if (!user)
    return (
      <div className="page-wrapper">
        <h2>Please log in to view your profile.</h2>
      </div>
    );

  return (
    <div
      className="page-wrapper"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backdropFilter: "blur(10px)"
      }}
    >
      <div className="profile-box">
        <h2 style={{ marginBottom: 6 }}>Your Profile</h2>

        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {userDoc?.role}</p>

        <div style={{ marginTop: 20 }}>
          {userDoc?.role === "buyer" && (
            <p><strong>Favorite Properties:</strong> {favCount}</p>
          )}

          {userDoc?.role === "dealer" && (
            <>
              <p><strong>Your Properties:</strong> {propCount}</p>
              <p><strong>Favorites (You saved):</strong> {favCount}</p>
            </>
          )}
        </div>

        <div style={{ marginTop: 25 }}>
          <p style={{ opacity: 0.75 }}>
            This profile is connected securely using Firebase Authentication.
          </p>
        </div>
      </div>
    </div>
  );
}
