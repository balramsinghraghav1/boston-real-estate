
import React,{createContext,useContext,useEffect,useState} from 'react';
import { auth, db } from './firebase';
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
const AuthContext=createContext();
export function useAuth(){return useContext(AuthContext);}
export function AuthProvider({children}){
  const [user,setUser]=useState(null);
  const [userDoc,setUserDoc]=useState(null);
  useEffect(()=>{
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if(u){
        const d = await getDoc(doc(db,'users',u.uid));
        setUserDoc(d.exists()?d.data():null);
      } else setUserDoc(null);
    });
    return ()=>unsub();
  },[]);
  const signup = async(email,pw,role='buyer')=>{
    const res = await createUserWithEmailAndPassword(auth,email,pw);
    await setDoc(doc(db,'users',res.user.uid),{email,role,createdAt:new Date().toISOString()});
    return res;
  };
  const login = (e,p)=> signInWithEmailAndPassword(auth,e,p);
  const logout = ()=> signOut(auth);
  return <AuthContext.Provider value={{user,userDoc,signup,login,logout}}>{children}</AuthContext.Provider>;
}
