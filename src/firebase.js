// Add your firebase config here
// export db and auth used in components
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyALhB6BFnAUEbqI09gW_bW3xr0prK5XeWM",
  authDomain: "boston-real.firebaseapp.com",
  projectId: "boston-real",
  storageBucket: "boston-real.firebasestorage.app",
  messagingSenderId: "525410685987",
  appId: "1:525410685987:web:5a437c54930667f5de8d96"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
