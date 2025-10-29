// src/components/Auth.jsx
import React, { useState, useEffect } from "react";
import { auth, provider, signInWithPopup, signOut } from "../Services/firebase";

const Auth = ({ onLogin }) => {
  // CRITICAL FIX: Initialize state from the current Firebase auth object
  const [user, setUser] = useState(auth.currentUser); 

  // Listener to track auth state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
        setUser(currentUser);
        // Call onLogin if provided, to keep parent component (like Home) in sync
        if (onLogin) {
            onLogin(currentUser);
        }
        if (currentUser) {
            localStorage.setItem("userId", currentUser.uid);
        } else {
            localStorage.removeItem("userId");
        }
    });
    return () => unsubscribe(); // Cleanup subscription
  }, [onLogin]);


  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  if (!user) {
    return (
      <button
        onClick={handleLogin}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
      >
        Sign in with Google
      </button>
    );
  }

  return (
    <div className="flex items-center gap-1">
      <img 
        // src={user.photoURL} 
        // alt="Profile" 
        // className="w-1 h-1 rounded-full" 
        // title={user.displayName}
      />
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
      >
        Logout
      </button>
    </div>
  );
};

export default Auth;