
import React, { useEffect, useState } from 'react';
import { useAuth } from '../auth.jsx';

export default function Profile() {
  const { user, userDoc } = useAuth();
  const [joined, setJoined] = useState('');

  useEffect(()=>{
    if(!user) return;
    setJoined(user.metadata?.creationTime || user?.reloadUserInfo?.createdAt || '');
  },[user]);

  if(!user) return <div className="card">Please login.</div>;

  return (
    <div className="card" style={{maxWidth:720}}>
      <h2>My Profile</h2>
      <div className="form-row"><label>Email</label><div>{user.email}</div></div>
      <div className="form-row"><label>Role</label><div style={{fontWeight:700,color:'#6b21a8'}}>{userDoc?.role || '—'}</div></div>
      <div className="form-row"><label>Joined</label><div>{joined}</div></div>
      <p className="note">You can add profile photo, update email, or change password from Firebase Authentication console.</p>
    </div>
  );
}
