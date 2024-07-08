import { getAuth } from "firebase/auth";
import app from "./firebase";
import { signInWithPopup , GoogleAuthProvider, } from 'firebase/auth';

export const auth = getAuth(app);

// Sign in with Google
export const signInWithGoogle = async () => {
  const googleAuth = new GoogleAuthProvider();
  try {
    const res = await signInWithPopup(auth, googleAuth);
    return res.user; // Return the signed-in user
  } catch (error) {
    console.error("Error during sign-in: ", error);
  }
};

// Sign out user 
export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error during sign-out: ", error);
  }
};
