
import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth.jsx';
export default function Login(){ const [email,setEmail]=useState(''); const [pw,setPw]=useState(''); const { login } = useAuth(); const nav = useNavigate(); const go=async(e)=>{ e.preventDefault(); try{ await login(email,pw); nav('/'); }catch(_){ alert('Login failed'); } }; return (<div className="card" style={{maxWidth:420}}><h2>Login</h2><form onSubmit={go}><div className="form-row"><label>Email</label><input value={email} onChange={e=>setEmail(e.target.value)}/></div><div className="form-row"><label>Password</label><input type="password" value={pw} onChange={e=>setPw(e.target.value)}/></div><button>Login</button></form></div>); }
