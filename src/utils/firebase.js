import { db } from "@/config/firebase";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";

// Function to get all users from the "users" collection
export const getUsers = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    const users = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log("Users retrieved: ", users);
    return users;
  } catch (e) {
    console.error("Error getting users: ", e);
  }
};

// Function to add a user to the "users" collection
export const addUser = async (name) => {
  try {
    const docRef = await addDoc(collection(db, "users"), { name });
    console.log("User added with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error adding user: ", e);
  }
};

// Function to update a user's name in the "users" collection
export const updateUser = async (userId, newName) => {
  try {
    const userDocRef = doc(db, "users", userId);
    await updateDoc(userDocRef, { name: newName });
    console.log("User updated");
  } catch (e) {
    console.error("Error updating user: ", e);
  }
};

// Function to delete a user from the "users" collection
export const deleteUser = async (userId) => {
  try {
    const userDocRef = doc(db, "users", userId);
    await deleteDoc(userDocRef);
    console.log("User deleted");
  } catch (e) {
    console.error("Error deleting user: ", e);
  }
};
