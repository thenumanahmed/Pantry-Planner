'use client'
import React, { useEffect, useState } from 'react';
import './Navbar.css';
import { UserAuth } from '@/contexts/auth_context';

const Navbar = () => {
  const { user, GoogleSignIn, SignOut, loadingUser } = UserAuth();

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
      <div className='nav-logo font-sans mx-1'>
        Pantry-Tracker
      </div>
      <div className='flex'>
        {loadingUser ? null : user ? (
          <input
            type="text"
            placeholder="Search"
            className="hidden sm:block border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm mr-3 text-sm"
          />
        ) : null}

        {loadingUser ? (null) : user ? (
          <button onClick={handleSignOut} className="bg-red-500 text-white px-4 py-2 rounded">
            Sign Out
          </button>
        ) : (
          <button onClick={handleSignIn} className="bg-blue-500 text-white px-4 py-2 text-sm rounded">
            Sign In with Google
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
