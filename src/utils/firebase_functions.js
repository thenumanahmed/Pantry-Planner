import { db } from "../config/firebase";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  getDoc,
  where,
  getDocs,
} from "firebase/firestore";

// Add a product to the "products" collection
export const addProduct = async ({ name, quantity, expiryDate, userId , downloadUrl}) => {
  console.log("adding");
  try {
    // Convert quantity to an integer before adding it to the database
    const parsedQuantity = parseInt(quantity, 10);

    if (isNaN(parsedQuantity)) {
      throw new Error("Invalid quantity: Not a number.");
    }

    const docRef = await addDoc(collection(db, "products"), {
      name,
      quantity: parsedQuantity, 
      expiryDate,
      downloadUrl,
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

// Increment product quantity
export const incrementProductQuantity = async (productId) => {
  try {
    const productDocRef = doc(db, "products", productId);

    // Get the current quantity
    const productSnapshot = await getDoc(productDocRef);
    if (productSnapshot.exists()) {
      const currentQuantity = productSnapshot.data().quantity;

      // Increment the quantity
      await updateDoc(productDocRef, {
        quantity: currentQuantity + 1,
      });
      console.log("Product quantity incremented");
    }
  } catch (error) {
    console.error("Error incrementing product quantity: ", error);
  }
};

// Decrement product quantity (and remove if quantity becomes 0)
export const decrementProductQuantity = async (productId) => {
  try {
    const productDocRef = doc(db, "products", productId);

    // Get the current quantity
    const productSnapshot = await getDoc(productDocRef);
    if (productSnapshot.exists()) {
      const currentQuantity = productSnapshot.data().quantity;

      if (currentQuantity > 1) {
        // Decrement the quantity
        await updateDoc(productDocRef, {
          quantity: currentQuantity - 1,
        });
        console.log("Product quantity decremented");
      } else {
        // If quantity is 1, delete the product from the collection
        await deleteDoc(productDocRef);
        console.log("Product deleted as quantity became zero");
      }
    }
  } catch (error) {
    console.error("Error decrementing product quantity: ", error);
  }
};
