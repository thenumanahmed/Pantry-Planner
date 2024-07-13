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
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { auth, storage } from "./../config/firebase";
import { UserAuth } from "@/contexts/auth_context";
import Table from "@/components/Table/Table";
import Grid from "@/components/Grid/Grid";
import AddItemModal from "@/components/Modal/AddProductModal";
import AiSuggestionModal from "@/components/Modal/AiSuggestionodal";
import EditItemModal from "@/components/Modal/EditProductModal";
import SearchWidget from "@/components/SearchWidget";
// import openAIClient  from "@/config/openai";

export default function Home() {
  const { user } = UserAuth();
  const [products, setProducts] = useState([]);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showEditProductModal, setShowEditProductModal] = useState(false);
  const [showAiSuggestionModal, setShowAiSuggestionModal] = useState(false);
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
  const [selectedImage, setSelectedImage] = useState(null);

  const closeAddItemModal = () => setShowAddProductModal(false);
  const closeEditItemModal = () => setShowEditProductModal(false);
  const closeAiSuggestionModal = () => setShowAiSuggestionModal(false);
  const openAddItemModal = () => setShowAddProductModal(true);
  const openEditItemModal = () => setShowEditProductModal(true);
  const openAiSuggestionModal = () => setShowAiSuggestionModal(true);

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

  // const getAISuggestion = async () => {
  //   // console.log("chating........ ai")
  //   // const chatcompletion = await openAIClient.chat.completions.create({
  //   //   model: "gpt-3.5-turbo",
  //   //   messages :[
  //   //     {
  //   //       role:"system",
  //   //       content:"you are are chief and guider to suggest me dishes by using all or few products that could be made based on the list of products. if no product could be made then inform me."
  //   //     },
  //   //     {
  //   //       role:"user",
  //   //       content:"my products are apple, bnana, mango , lemon , oil ,biscouts"
  //   //     }
  //   //   ]
  //   // });
  //   // console.log(chatcompletion)

  // };

  const handleAddProduct = async () => {
    const user = auth.currentUser;
    let downloadUrl = "";

    // Upload image if selected
    if (selectedImage) {
      try {
        console.log("trying");
        const storageRef = ref(
          storage,
          `avatars/${user.uid}/${Date.now()}.jpg`
        );
        const response = await fetch(selectedImage);
        const blob = await response.blob();
        const uploadTask = await uploadBytes(storageRef, blob);
        downloadUrl = await getDownloadURL(uploadTask.ref);
        console.log("Image uploaded and URL:", downloadUrl);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }

    console.log(downloadUrl);

    if (user && newProductName.trim() && newExpiryDate.trim()) {
      const newItem = {
        name: newProductName,
        quantity: newQuantity,
        expiryDate: newExpiryDate,
        userId: user.uid,
        downloadUrl: downloadUrl || null, // Only include if image was uploaded
      };
      await addProduct(newItem);

      // Clear input fields
      setNewProductName("");
      setNewQuantity("");
      setNewExpiryDate("");

      // Fetch updated products
      const updatedProducts = await getProducts(user.uid);
      setProducts(updatedProducts);
    } else {
      console.error("User or product data missing");
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
      <div className=' sm:hidden flex  justify-center pt-2'>
            <SearchWidget /> 
          </div>
      {/* / table for large screens */}
      <Table
        openAiSuggestionModal={openAiSuggestionModal}
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
        openAiSuggestionModal={openAiSuggestionModal}
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
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          closeAddItemModal={closeAddItemModal}
          handleAddProduct={handleAddProduct}
          name={newProductName}
          setName={setNewProductName}
          quantity={newQuantity}
          setQuantity={setNewQuantity}
          expiryDate={newExpiryDate}
          setExpiryDate={setNewExpiryDate}
          // labelImage={labelImage}
          // getAISuggestion={getAISuggestion}
        />
      ) : null}
      {showAiSuggestionModal ? (
        <AiSuggestionModal closeAiSuggestionModal={closeAiSuggestionModal} />
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
