"use client";
import { useContext, createContext, useState, useEffect } from "react";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth, db } from "@/config/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

const SearchContext = createContext();

// for creating the state of the context above
export const SearchContextProvider = ({ children }) => {
  const [searchText, setSearchText] = useState("");

  // passing the varibles(which can be accessed) as values
  return (
    <SearchContext.Provider value={{ searchText, setSearchText }}>
      {children}
    </SearchContext.Provider>
  );
};

// for accessing the above auth context
export const useSearchContext = () => {
  return useContext(SearchContext);
};
