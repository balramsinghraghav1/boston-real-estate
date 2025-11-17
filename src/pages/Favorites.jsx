
import React,{useEffect,useState} from 'react';
import { collection, onSnapshot, doc, getDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../auth.jsx';
import { Link } from 'react-router-dom';

export default function Favorites(){
  const { user } = useAuth();
  const [favIds,setFavIds]=useState([]);
  const [props,setProps]=useState([]);

  useEffect(()=>{
    if(!user) return;
    const favCol = collection(db,'users',user.uid,'favorites');
    const unsub = onSnapshot(favCol, snap=>{
      const ids = snap.docs.map(d=>d.id);
      setFavIds(ids);
    });
    return ()=>unsub();
  },[user]);

  useEffect(()=>{
    if(!favIds.length) { setProps([]); return; }
    let mounted=true;
    (async()=>{
      const tmp=[];
      for(const id of favIds){
        const p = await getDoc(doc(db,'properties',id));
        if(p.exists()) tmp.push({id, ...p.data()}); // fixed here
      }
      if(mounted) setProps(tmp);
    })();
    return ()=> mounted=false;
  },[favIds]);

  const removeFav = async(id)=>{ if(!user) return; await deleteDoc(doc(db,'users',user.uid,'favorites',id)); };

  if(!user) return <div className="card">Please login to view favorites</div>;

  return (<div>
    <h2>My Favorites</h2>
    <div className="card note">Saved properties are shown here. Click the heart on any listing to remove it.</div>
    <div className="favorites-grid" style={{marginTop:12}}>
      {props.length===0 && <div className="card">No favorites yet.</div>}
      {props.map(p=>(
        <div key={p.id} className="card fav-card">
          <img src={p.img||''} alt="" />
          <div style={{flex:1}}>
            <Link to={'/properties/'+p.id} style={{textDecoration:'none',color:'inherit'}}><h3 style={{margin:0}}>{p.title}</h3></Link>
            <div className="small">{p.price} • {p.address}</div>
            <div style={{marginTop:8}}><button onClick={()=>removeFav(p.id)}>Remove</button></div>
          </div>
          <div style={{minWidth:60,textAlign:'right'}}>{p.status==='sold' && <span className="badge-sold">SOLD</span>}</div>
        </div>
      ))}
    </div>
  </div>);
}
