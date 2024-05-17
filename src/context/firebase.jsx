// Import the functions you need from the SDKs you need
// // TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

//firebase
import Password from "antd/es/input/Password";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

//context-Api
import { createContext, useContext } from "react";

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

const FirebaseContext = createContext(null);

//custom hook generation suntax
export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = (props) => {
  const SignUpWithEmailAndPassword = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const SignInWithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  return (
    <FirebaseContext.Provider
      value={{ SignUpWithEmailAndPassword, SignInWithEmailAndPassword }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
