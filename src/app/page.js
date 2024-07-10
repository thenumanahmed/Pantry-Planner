"use client";
import { useState, useEffect } from "react";
import {
  addProduct,
  editProduct,
  deleteProduct,
  getProducts,
} from "../utils/firebase_functions";
import { auth } from "./../config/firebase";
import { UserAuth } from "@/contexts/auth_context";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [newProductName, setNewProductName] = useState("");
  const [newQuantity, setNewQuantity] = useState(1);
  const [newExpiryDate, setNewExpiryDate] = useState("");
  const [editingProductId, setEditingProductId] = useState(null);
  const [addingProduct, setAddingProduct] = useState(false);
  const { user } = UserAuth();

  useEffect(() => {
    async function fetchProducts() {
      const user = auth.currentUser;
      if (user) {
        const fetchedProducts = await getProducts(user.uid);
        setProducts(fetchedProducts || []);
      }
    }
    console.log("fetching");
    fetchProducts();
  }, [user, addProduct]);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setAddingProduct(true);
    const user = auth.currentUser;
    if (user && newProductName.trim() && newExpiryDate.trim()) {
      await addProduct(newProductName, newQuantity, newExpiryDate, user.uid);
      console.log(user.uid);
      setNewProductName("");
      setNewQuantity(1);
      setNewExpiryDate("");
      const updatedProducts = await getProducts(user.uid);
      setProducts(updatedProducts);
    }
    setAddingProduct(false);
  };

  const handleEditProduct = async (productId) => {
    setAddingProduct(true);
    const updatedProduct = {
      name: newProductName,
      quantity: newQuantity,
      expiryDate: newExpiryDate,
    };
    await editProduct(productId, updatedProduct);
    setEditingProductId(null);
    const user = auth.currentUser;
    const updatedProducts = await getProducts(user.uid);
    setProducts(updatedProducts);
    setAddingProduct(false);
  };

  const handleDeleteProduct = async (productId) => {
    setAddingProduct(true);
    await deleteProduct(productId);
    const user = auth.currentUser;
    const updatedProducts = await getProducts(user.uid);
    setProducts(updatedProducts);
    setAddingProduct(false);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-2xl mb-6">Pantry Products</h1>

      <form onSubmit={handleAddProduct} className="mb-4">
        <input
          type="text"
          value={newProductName}
          onChange={(e) => setNewProductName(e.target.value)}
          placeholder="Enter product name"
          className="border px-4 py-2 rounded mr-2"
        />
        <input
          type="number"
          value={newQuantity}
          onChange={(e) => setNewQuantity(e.target.value)}
          placeholder="Enter quantity"
          className="border px-4 py-2 rounded mr-2"
        />
        <input
          type="date"
          value={newExpiryDate}
          onChange={(e) => setNewExpiryDate(e.target.value)}
          className="border px-4 py-2 rounded mr-2"
        />
        <button
          type="submit"
          disabled={addingProduct} // Disable when addingProduct is true
          className={`px-4 py-2 rounded text-white font-medium transition-colors 
              ${
                addingProduct
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
        >
          {addingProduct ? "Adding..." : "Add Product"}
        </button>
      </form>

      <ul>
        {products.length > 0 ? (
          products.map((product) => (
            <li
              key={product.id}
              className="flex justify-between items-center mb-2"
            >
              {editingProductId === product.id ? (
                <>
                  <input
                    type="text"
                    defaultValue={product.name}
                    onChange={(e) => setNewProductName(e.target.value)}
                    className="border px-4 py-2 rounded mr-2"
                  />
                  <input
                    type="number"
                    defaultValue={product.quantity}
                    onChange={(e) => setNewQuantity(e.target.value)}
                    className="border px-4 py-2 rounded mr-2"
                  />
                  <input
                    type="date"
                    defaultValue={product.expiryDate}
                    onChange={(e) => setNewExpiryDate(e.target.value)}
                    className="border px-4 py-2 rounded mr-2"
                  />
                  <button
                    onClick={() => handleEditProduct(product.id)}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <span>
                    {product.name} - {product.quantity} - {product.expiryDate}
                  </span>
                  <button
                    onClick={() => setEditingProductId(product.id)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                </>
              )}
            </li>
          ))
        ) : (
          <li>No products found</li>
        )}
      </ul>
    </main>
  );
}
