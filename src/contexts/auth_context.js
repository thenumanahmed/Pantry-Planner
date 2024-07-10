"use client";
import { useContext, createContext, useState, useEffect } from "react";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth , db} from "@/config/firebase";
import {
  doc,
  setDoc,
  getDoc,
  
} from "firebase/firestore";

const AuthContext = createContext();

// for creating the state of the context above
export const AuthContextProvider = ({ children }) => {
  // creating state variables
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const GoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const res = await signInWithPopup(auth, provider);
      const user = res.user;

      // Check if the user already exists in Firestore
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        // User doesn't exist, add to Firestore
        await setDoc(userDocRef, {
          name: user.displayName,
          email: user.email,
          uid: user.uid,
          photoURL: user.photoURL,
        });
        console.log("User added to Firestore");
      } else {
        console.log("User already exists in Firestore");
      }
    } catch (error) {
      console.error("Error during Google Sign-In: ", error);
    }
  };

  const SignOut = async () => {
    try {
      await signOut(auth);
      console.log("User signed out");
    } catch (error) {
      console.error("Error during Sign-Out: ", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoadingUser(false);
    });
    return () => unsubscribe();
  }, []);

  // passing the varibles(which can be accessed) as values
  return (
    <AuthContext.Provider value={{ user, GoogleSignIn, SignOut, loadingUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// for accessing the above auth context
export const UserAuth = () => {
  return useContext(AuthContext);
};
