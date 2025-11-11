
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// 2. Your web app's Firebase configuration
// !! IMPORTANT !!
// Go to your Firebase project's "Project settings" and find your
// "Web app" config. Paste those values here.
const firebaseConfig = {
  apiKey: "AIzaSyALhB6BFnAUEbqI09gW_bW3xr0prK5XeWM",
  authDomain: "boston-real.firebaseapp.com",
  projectId: "boston-real",
  storageBucket: "boston-real.firebasestorage.app",
  messagingSenderId: "525410685987",
  appId: "1:525410685987:web:5a437c54930667f5de8d96"
};

// 3. Initialize Firebase
const app = initializeApp(firebaseConfig);

// 4. Export the services you'll need
// We export them so we can use them anywhere in our app
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
