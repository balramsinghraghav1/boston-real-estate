
import React,{useEffect,useState} from 'react';
import { useParams } from 'react-router-dom';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../auth.jsx';

export default function Detail(){
  const { id } = useParams();
  const { user } = useAuth();
  const [p,setP]=useState(null);
  useEffect(()=>{ const ref = doc(db,'properties',id); const unsub = onSnapshot(ref,d=>setP(d.exists()?{id:d.id,...d.data()}:null)); return ()=>unsub(); },[id]);
  if(!p) return <div className="card">Loading...</div>;
  return (<div className="card detail-grid">
    <div>
      <img src={p.img||''} style={{width:'100%',borderRadius:10,objectFit:'cover'}}/>
      <h2>{p.title}</h2>
      <p><strong>{p.price}</strong></p>
      <p className="small">{p.address}</p>
    </div>
    <aside className="card">
      <h3>Seller</h3>
      <div className="small">Owner: {p.ownerEmail}</div>
      <div style={{marginTop:12}}>{p.status==='sold' && <span className="badge-sold">SOLD</span>}</div>
    </aside>
  </div>);
}
