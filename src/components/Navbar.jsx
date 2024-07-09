'use client'
import React, { useEffect, useState } from 'react';
import './Navbar.css';
import { UserAuth } from '@/contexts/auth_context';

const Navbar = () => {
  const { user, GoogleSignIn, SignOut, loadingUser } = UserAuth();
  // const [loading, setLoading] = useState(true);

  const handleSignIn = async () => {
    try {
      GoogleSignIn();
    } catch (err) {
      console.log(err);
    }
  }

  const handleSignOut = async () => {
    try {
      SignOut();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className='nav'>
      <div className='nav-logo'>
        Pantry-Tracker
      </div>
      {loadingUser ? (null) : user ? (
        <button onClick={handleSignOut} className="bg-red-500 text-white px-4 py-2 rounded">
          Sign Out
        </button>
      ) : (
        <button onClick={handleSignIn} className="bg-blue-500 text-white px-4 py-2 rounded">
          Sign In with Google
        </button>
      )}
    </div>
  );
}

export default Navbar;
