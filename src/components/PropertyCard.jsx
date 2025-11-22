import React from "react";
import { Link } from "react-router-dom";

export default function PropertyCard({ p, fav, onFavToggle, showDelete, onDelete }) {
  return (
    <div className="property-card card">
      <Link to={'/properties/'+p.id} style={{textDecoration:'none', color:'inherit'}}>
        <img src={p.img || 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80'} alt={p.title} />
        <div style={{padding:12}}>
          <h3 style={{margin:0}}>{p.title}</h3>
          <div className="meta">
            <div><strong>₹ {p.price}</strong></div>
            <div className="small">{p.address}</div>
          </div>
        </div>
      </Link>

      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:10}}>
        <div>{p.status==='sold' && <span className="badge-sold">SOLD</span>}</div>
        <div style={{display:'flex', gap:10}}>
          {/* favorite toggle */}
          <span className={'fav ' + (fav? 'active':'' )} onClick={()=>onFavToggle && onFavToggle(p.id)}>♥</span>

          {/* delete (optional) */}
          {showDelete && <button style={{background:'red'}} onClick={()=>onDelete && onDelete(p.id)}>Delete</button>}
        </div>
      </div>
    </div>
  );
}
