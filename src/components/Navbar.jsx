'use client'
import React, { useEffect } from 'react';
import './Navbar.css';
import { signInWithGoogle, signOutUser } from '@/config/firebase_auth';
import { auth } from "@/config/firebase_auth";
import { useAuthState } from 'react-firebase-hooks/auth';

const Navbar = () => {
  const [user] = useAuthState(auth);

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div className='nav'>
      <div className='nav-logo'>
        Pantry-Tracker
      </div>
      {user ? (
        <button onClick={signOutUser} className="bg-red-500 text-white px-4 py-2 rounded">
          Sign Out
        </button>
      ) : (
        <button onClick={signInWithGoogle} className="bg-blue-500 text-white px-4 py-2 rounded">
          Sign In with Google
        </button>
      )}
    </div>
  );
}

export default Navbar;
