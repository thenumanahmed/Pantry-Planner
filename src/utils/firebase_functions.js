import { db } from "../config/firebase"; 
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";

// Add a product to the "products" collection
export const addProduct = async (name, quantity, expiryDate, userId) => {
  try {
    const docRef = await addDoc(collection(db, "products"), {
      name,
      quantity,
      expiryDate,
      userId,
    });
    console.log("Product added with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding product: ", error);
  }
};

// Edit a product in the "products" collection
export const editProduct = async (productId, updatedData) => {
  try {
    const productDocRef = doc(db, "products", productId);
    await updateDoc(productDocRef, updatedData);
    console.log("Product updated");
  } catch (error) {
    console.error("Error updating product: ", error);
  }
};

// Delete a product from the "products" collection
export const deleteProduct = async (productId) => {
  try {
    const productDocRef = doc(db, "products", productId);
    await deleteDoc(productDocRef);
    console.log("Product deleted");
  } catch (error) {
    console.error("Error deleting product: ", error);
  }
};

// Get all products for a specific user
export const getProducts = async (userId) => {
  try {
    console.log(`GETTING DOC FOR ${userId}`);
    // Create a query to fetch products that belong to the specified user
    const productsQuery = query(
      collection(db, "products"),
      where("userId", "==", userId)
    );

    const querySnapshot = await getDocs(productsQuery);
    const products = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log("Products retrieved: ", products);
    return products;
  } catch (error) {
    console.error("Error getting products: ", error);
  }
};
