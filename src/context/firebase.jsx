
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "firebase/auth";

import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

//context-Api
import { createContext, useContext, useState, useEffect } from "react";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC068ccP8JVJLcOh9arxT7561QzGyOXm_c",
  authDomain: "stay-manager-78d05.firebaseapp.com",
  projectId: "stay-manager-78d05",
  storageBucket: "stay-manager-78d05.appspot.com",
  messagingSenderId: "806459513834",
  appId: "1:806459513834:web:dc5f3d5665814c8bba7093",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(firebaseApp);

// Initialize Firebase Store database
const db = getFirestore(firebaseApp);

// Initialize Storage
const storage = getStorage(firebaseApp);

const FirebaseContext = createContext(null);

//custom hook generation suntax
export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = (props) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const SignUpWithEmailAndPassword = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const SignInWithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  return (
    <FirebaseContext.Provider
      value={{
        user,
        loading,
        SignUpWithEmailAndPassword,
        SignInWithEmailAndPassword,
        logout,
        db,
        storage,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};

export { auth, db, storage };
