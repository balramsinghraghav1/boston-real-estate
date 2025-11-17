
import React,{useEffect,useState} from 'react';
import { useAuth } from '../auth.jsx';
import { collection, query, where, onSnapshot, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Link } from 'react-router-dom';
export default function Dashboard(){
  const { user, userDoc } = useAuth();
  const [list,setList]=useState([]);
  useEffect(()=>{ if(!user) return; const q = query(collection(db,'properties'), where('owner','==',user.uid)); const unsub = onSnapshot(q, s=> setList(s.docs.map(d=>({id:d.id,...d.data()})))); return ()=>unsub(); },[user]);
  if(!user) return <div className="card">Please login</div>;
  if(userDoc?.role!=='dealer') return <div className="card">Dashboard only for dealers</div>;
  const remove = async(id)=>{ if(!confirm('Delete?')) return; await deleteDoc(doc(db,'properties',id)); };
  const mark = async(id)=>{ await updateDoc(doc(db,'properties',id), { status:'sold' }); };
  return (<div><h2>Your Properties</h2>{list.map(p=>(<div key={p.id} className="card"><h3>{p.title} {p.status==='sold' && <span className="badge-sold">SOLD</span>}</h3><div><strong>{p.price}</strong> • {p.address}</div><div style={{marginTop:10,display:'flex',gap:8}}><Link to={'/edit/'+p.id}><button>Edit</button></Link><button onClick={()=>remove(p.id)}>Delete</button><button disabled={p.status==='sold'} onClick={()=>mark(p.id)}>{p.status==='sold'?'Sold':'Mark Sold'}</button></div></div>))}</div>);
}
