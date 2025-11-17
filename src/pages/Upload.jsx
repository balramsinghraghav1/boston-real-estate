
import React,{useState} from 'react';
import { useAuth } from '../auth.jsx';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';
export default function Upload(){
  const { user, userDoc } = useAuth();
  const [title,setTitle]=useState(''); const [price,setPrice]=useState(''); const [address,setAddress]=useState(''); const [img,setImg]=useState(''); const nav=useNavigate();
  if(!user) return <div className="card">Please login</div>;
  if(userDoc?.role!=='dealer') return <div className="card">Only dealers can upload</div>;
  const submit=async(e)=>{ e.preventDefault(); try{ await addDoc(collection(db,'properties'),{ title,price,address,img,owner:user.uid,ownerEmail:user.email,createdAt:new Date().toISOString(),status:'available' }); nav('/properties'); }catch(e){alert('Upload failed '+e.message);} };
  return (<div className="card" style={{maxWidth:760}}><h2>Upload</h2><form onSubmit={submit}><div className="form-row"><label>Title</label><input value={title} onChange={e=>setTitle(e.target.value)}/></div><div className="form-row"><label>Price</label><input value={price} onChange={e=>setPrice(e.target.value)}/></div><div className="form-row"><label>Address</label><input value={address} onChange={e=>setAddress(e.target.value)}/></div><div className="form-row"><label>Image URL</label><input value={img} onChange={e=>setImg(e.target.value)}/></div><button>Upload</button></form></div>);
}
