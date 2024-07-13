import React, { useEffect, useState } from 'react';
import { useSearchContext } from '@/contexts/search_context';
import './Grid.css';

const Grid = ({
    products,
    openAddItemModal,
    setEditingProductExpDate,
    setEditingProductName,
    setEditingProductId,
    setEditingProductQuantity,
    openEditItemModal,
    handleDeleteProduct,
    handleIncrementProductQuantity,
    handleDecrementProductQuantity,
    openAiSuggestionModal
}) => {

    const { searchText } = useSearchContext();
    const [filteredProducts, setFilteredProducts] = useState(products);

    // Effect to filter products based on searchText
    useEffect(() => {
        if (searchText.trim() === '') {
            setFilteredProducts(products);  // Show all products when search text is empty
        } else {
            // Filter products by name
            const filtered = products.filter((prod) =>
                prod.name.toLowerCase().includes(searchText.toLowerCase())
            );
            setFilteredProducts(filtered);
        }
    }, [searchText, products]);

    return (
        <div>
            <div className='flex justify-between md:hidden'>
                <button className='m-2 p-2 text-md' onClick={openAiSuggestionModal}>AI Suggestions</button>
                <button className='m-2 p-2 text-md' onClick={openAddItemModal}>Add Item</button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:hidden">
                {
                    filteredProducts.length > 0 ? (
                        filteredProducts.map((prod) => (
                            <div key={prod.id} className='bg-white p-4 rounded-lg shadow m-2 flex flex-col'>
                                <div className='flex items-center justify-between space-x-2 text-sm'>
                                    <div className='font-bold'>Name:</div>
                                    <div>{prod.name}</div>
                                </div>
                                <div className='flex items-center justify-between space-x-2 text-sm'>
                                    <div className='font-bold'>Quantity:</div>
                                    <div className='flex'>
                                        <button className='p-1 bg-slate-100 text-black cursor-pointer' onClick={() => handleDecrementProductQuantity(prod.id)}>-</button>
                                        <div className='p-1'>{prod.quantity}</div>
                                        <button className='p-1 bg-slate-100 text-black cursor-pointer' onClick={() => handleIncrementProductQuantity(prod.id)}>+</button>
                                    </div>
                                </div>
                                <div className='flex items-center justify-between space-x-2 text-sm'>
                                    <div className='font-bold'>Expiry Date:</div>
                                    <div>{prod.expiryDate}</div>
                                </div>
                                <div className='flex items-center space-x-2 text-sm justify-center'>
                                    <button className='text-sm' onClick={() => {
                                        setEditingProductName(prod.name);
                                        setEditingProductExpDate(prod.expiryDate);
                                        setEditingProductId(prod.id);
                                        setEditingProductQuantity(prod.quantity);
                                        openEditItemModal(true);
                                    }}>Edit</button>
                                    <button className='text-sm' onClick={() => handleDeleteProduct(prod.id)}>Delete</button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className='text-center p-4 text-gray-500 col-span-2'>
                            No search results found.
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default Grid;
