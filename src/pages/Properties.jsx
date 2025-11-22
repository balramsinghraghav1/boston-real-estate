import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth.jsx';

export default function Properties() {
  const { user } = useAuth();
  const [list, setList] = useState([]);
  const [favs, setFavs] = useState({});
  const [q, setQ] = useState('');
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(500000);

  // Fetch all properties
  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'properties'), snap =>
      setList(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    );
    return () => unsub();
  }, []);

  // Fetch user's favorite list
  useEffect(() => {
    if (!user) {
      setFavs({});
      return;
    }
    const favCol = collection(db, 'users', user.uid, 'favorites');
    const unsub = onSnapshot(favCol, snap => {
      let o = {};
      snap.docs.forEach(d => (o[d.id] = true));
      setFavs(o);
    });
    return () => unsub();
  }, [user]);

  // Toggle favorite property
  const toggleFav = async id => {
    if (!user) {
      alert('Please login to save favorites.');
      return;
    }
    const ref = doc(db, 'users', user.uid, 'favorites', id);
    favs[id] ? await deleteDoc(ref) : await setDoc(ref, { addedAt: new Date().toISOString() });
  };

  // Search + filter price
  const filtered = () =>
    list.filter(p => {
      const price = parseInt((p.price + '').replace(/[^0-9]/g, '')) || 0;
      return (
        price >= min &&
        price <= max &&
        (q === '' ||
          p.title.toLowerCase().includes(q.toLowerCase()) ||
          p.address.toLowerCase().includes(q.toLowerCase()))
      );
    });

  return (
    <div className="properties-page">
      {/* BACKGROUND BLUR */}
      <div className="subpage-bg"></div>

      <h2 style={{ color: 'white', textShadow: '0 2px 8px #000' }}>All Properties</h2>

      {/* FILTER BAR */}
      <div className="card filters glass-card">
        <input
          placeholder="Search title or address..."
          value={q}
          onChange={e => setQ(e.target.value)}
        />

        <div className="range-row">
          <label className="small">Min</label>
          <input type="range" min="0" max="500000" value={min} onChange={e => setMin(Number(e.target.value))} />
          <span className="small">{min}</span>

          <label className="small">Max</label>
          <input type="range" min="0" max="500000" value={max} onChange={e => setMax(Number(e.target.value))} />
          <span className="small">{max}</span>
        </div>
      </div>

      {/* PROPERTIES GRID */}
      <div className="grid" style={{ marginTop: 12 }}>
        {filtered().map(p => (
          <div key={p.id} className="property-card card glass-card" style={{ padding: 0 }}>
            <Link to={'/properties/' + p.id} style={{ textDecoration: 'none', color: 'inherit' }}>
              <img
                src={
                  p.img ||
                  'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80'
                }
                alt=""
              />
              <div style={{ padding: 12 }}>
                <h3 style={{ margin: 0 }}>{p.title}</h3>
                <div className="meta">
                  <div><strong>{p.price}</strong></div>
                  <div className="small">{p.address}</div>
                </div>
              </div>
            </Link>

            {/* FOOTER BAR */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 10,
              }}
            >
              {/* SOLD BADGE */}
              <div>
                {p.status === 'sold' && (
                  <span
                    className="badge-sold"
                    style={{
                      padding: '4px 8px',
                      background: '#27ae60',
                      color: 'white',
                      borderRadius: 6,
                      fontSize: 12,
                      fontWeight: 600,
                    }}
                  >
                    SOLD
                  </span>
                )}
              </div>

              {/* FAVORITES HEART */}
              <div>
                <span
                  className={'fav ' + (favs[p.id] ? 'active' : '')}
                  onClick={() => toggleFav(p.id)}
                  title="Add to favorites"
                  style={{
                    cursor: 'pointer',
                    fontSize: 24,
                    transition: '0.2s',
                    color: favs[p.id] ? '#ff3366' : '#ffffffaa',
                    textShadow: '0 0 6px #000',
                  }}
                >
                  {favs[p.id] ? '❤️' : '🤍'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
