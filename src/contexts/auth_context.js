"use client";
import { useContext, createContext, useState, useEffect } from "react";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "@/config/firebase_auth";

const AuthContext = createContext();

// for creating the state of the context above
export const AuthContextProvider = ({ children }) => {
  // creating state variables
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const GoogleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  const SignOut = () => {
    signOut(auth);
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
