"use client";
import { useState, useEffect } from "react";
import {
  addProduct,
  editProduct,
  deleteProduct,
  getProducts,
  decrementProductQuantity,
  incrementProductQuantity,
} from "../utils/firebase_functions";
import { auth } from "./../config/firebase";
import { UserAuth } from "@/contexts/auth_context";
import Table from "@/components/Table/Table";
import Grid from "@/components/Grid/Grid";
import AddItemModal from "@/components/Modal/AddProductModal";
import EditItemModal from "@/components/Modal/EditProductModal";

export default function Home() {
  const { user } = UserAuth();
  const [products, setProducts] = useState([]);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showEditProductModal, setShowEditProductModal] = useState(false);
  const [refresh, setRefresh] = useState(false);

  // for editing new product
  const [editingProductName, setEditingProductName] = useState("");
  const [editingproductId, setEditingProductId] = useState("");
  const [editingProductExpDate, setEditingProductExpDate] = useState("");
  const [editingProductQuantity, setEditingProductQuantity] = useState("");

  // for adding new product
  const [newProductName, setNewProductName] = useState("");
  const [newQuantity, setNewQuantity] = useState("");
  const [newExpiryDate, setNewExpiryDate] = useState("");

  const closeAddItemModal = () => setShowAddProductModal(false);
  const closeEditItemModal = () => setShowEditProductModal(false);
  const openAddItemModal = () => setShowAddProductModal(true);
  const openEditItemModal = () => setShowEditProductModal(true);

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

  const handleAddProduct = async () => {
    const user = auth.currentUser;
    if (user && newProductName.trim() && newExpiryDate.trim()) {
      const newItem = {
        name: newProductName,
        quantity: newQuantity,
        expiryDate: newExpiryDate,
        userId: user.uid,
      };
      await addProduct(newItem);
      setNewProductName("");
      setNewQuantity("");
      setNewExpiryDate("");
      const updatedProducts = await getProducts(user.uid);
      setProducts(updatedProducts);
    }
  };

  const handleEditProduct = async (productId, updatedProduct) => {
    // const updatedProduct = 
    console.log(updatedProduct);
    await editProduct(productId, updatedProduct);

    setEditingProductId(null);
    const user = auth.currentUser;
    const updatedProducts = await getProducts(user.uid);
    setProducts(updatedProducts);
  };


  const handleIncrementProductQuantity = async (productId) => {
    await incrementProductQuantity(productId);
    const user = auth.currentUser;
    const updatedProducts = await getProducts(user.uid);
    setProducts(updatedProducts);
  };
  const handleDecrementProductQuantity = async (productId) => {
    await decrementProductQuantity(productId);
    const user = auth.currentUser;
    const updatedProducts = await getProducts(user.uid);
    setProducts(updatedProducts);
  };

  // updates ui but multiple clicks problem 
  // const handleDecrementProductQuantity = async (productId) => {
  //   // Optimistically update UI
  //   setProducts((prevProducts) =>
  //     prevProducts.map((product) =>
  //       product.id === productId
  //         ? { ...product, quantity: product.quantity - 1 }
  //         : product
  //     )
  //   );
  
  //   try {
  //     await decrementProductQuantity(productId);
  
  //     // Fetch updated products if needed (optional)
  //     // const user = auth.currentUser;
  //     // const updatedProducts = await getProducts(user.uid);
  //     // setProducts(updatedProducts);
  //   } catch (error) {
  //     console.error("Failed to decrement quantity:", error);
  
  //     // Revert the optimistic update if something goes wrong
  //     setProducts((prevProducts) =>
  //       prevProducts.map((product) =>
  //         product.id === productId
  //           ? { ...product, quantity: product.quantity + 1 }
  //           : product
  //       )
  //     );
  //   }
  // };
  

  const handleDeleteProduct = async (productId) => {
    await deleteProduct(productId);
    const user = auth.currentUser;
    const updatedProducts = await getProducts(user.uid);
    setProducts(updatedProducts);
  };

  return (
    <main className="block bg-slate-300 min-h-screen">
      {/* / table for large screens */}
      <Table
        products={products}
        handleIncrementProductQuantity={handleIncrementProductQuantity}
        handleDecrementProductQuantity={handleDecrementProductQuantity}
        openAddItemModal={openAddItemModal}
        setEditingProductExpDate={setEditingProductExpDate}
        setEditingProductName={setEditingProductName}
        setEditingProductId={setEditingProductId}
        setEditingProductQuantity={setEditingProductQuantity}
        openEditItemModal={openEditItemModal}
        handleDeleteProduct={handleDeleteProduct}
      />
      {/* / grid for med and small screens */}
      <Grid
        products={products}
        openAddItemModal={openAddItemModal}
        handleIncrementProductQuantity={handleIncrementProductQuantity}
        handleDecrementProductQuantity={handleDecrementProductQuantity}
        setEditingProductExpDate={setEditingProductExpDate}
        setEditingProductName={setEditingProductName}
        setEditingProductId={setEditingProductId}
        setEditingProductQuantity={setEditingProductQuantity}
        openEditItemModal={openEditItemModal}
        handleDeleteProduct={handleDeleteProduct}
      />
      {showAddProductModal ? (
        <AddItemModal
          closeAddItemModal={closeAddItemModal}
          handleAddProduct={handleAddProduct}
          name={newProductName}
          setName={setNewProductName}
          quantity={newQuantity}
          setQuantity={setNewQuantity}
          expiryDate={newExpiryDate}
          setExpiryDate={setNewExpiryDate}
        />
      ) : null}
      {showEditProductModal ? (
        <EditItemModal
          closeEditItemModal={closeEditItemModal}
          handleEditProduct={handleEditProduct}
          oldName={editingProductName}
          oldExpiryDate={editingProductExpDate}
          oldQuantity={editingProductQuantity}
          id={editingproductId}
        />
      ) : null}
    </main>
  );
}
