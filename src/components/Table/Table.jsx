import React, { useEffect, useState } from 'react';
import { useSearchContext } from '@/contexts/search_context';

const Table = ({
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
        <>
            <div className='flex justify-center p-2 w-full'>
                <div className='w-full overflow-auto rounded-lg shadow hidden md:block'>
                    <div className='flex justify-between'>
                        <button className='my-2 p-2 text-md' onClick={openAiSuggestionModal}>AI Suggestions</button>
                        <button className='my-2 p-2 text-md' onClick={openAddItemModal}>Add Item</button>
                    </div>
                    <table className='w-full'>
                        <thead className='bg-slate-200 border-b-2 border-slate-800'>
                            <tr>
                                <th className='p-3 text-sm font-semibold tracking-wide text-left'>Image</th> {/* New column for image */}
                                <th className='w-2/3 p-3 text-sm font-semibold tracking-wide text-left flex-grow'>Name</th>
                                <th className='w-4/12 p-3 text-sm font-semibold tracking-wide text-left'>Quantity</th>
                                <th className='w-4/12 p-3 text-sm font-semibold tracking-wide text-left'>Expiry Date</th>
                                <th className='w-4/12 p-3 text-sm font-semibold tracking-wide text-left'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='divide-y divide-gray-100'>
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map((prod) => (
                                    <tr key={prod.id} className='bg-white odd:bg-gray-200'>
                                        <td className="whitespace-nowrap p-3 text-sm text-slate-800 relative"> {/* Use relative positioning */}
                                            <div className="relative group">
                                                <img
                                                    src={prod.downloadUrl}  
                                                    alt={"img"}
                                                    // className="h-5 transition-all duration-300 group-hover:h-36 group-hover:absolute group-hover:z-50 group-hover:-translate-y-full"  // Default height 20px, hover 150px above table
                                                />
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap p-3 text-sm text-slate-800 font-bold">{prod.name}</td>
                                        <td className="whitespace-nowrap p-3 text-sm text-center text-slate-800">
                                            <div className='flex'>
                                                <button className='p-1 bg-slate-100 text-black cursor-pointer' onClick={() => handleDecrementProductQuantity(prod.id)}>-</button>
                                                <div className='p-1'>{prod.quantity}</div>
                                                <button className='p-1 bg-slate-100 text-black cursor-pointer' onClick={() => handleIncrementProductQuantity(prod.id)}>+</button>
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap p-3 text-sm text-slate-800">{prod.expiryDate}</td>
                                        <td className="whitespace-nowrap p-3 text-sm text-slate-800">
                                            <button className='text-sm p-2 m-1' onClick={() => {
                                                setEditingProductExpDate(prod.expiryDate);
                                                setEditingProductName(prod.name);
                                                setEditingProductId(prod.id);
                                                setEditingProductQuantity(prod.quantity);
                                                openEditItemModal(true);
                                            }}>Edit</button>
                                            <button className='text-sm p-2 m-1' onClick={() => handleDeleteProduct(prod.id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center p-4 text-sm text-slate-800">
                                        No products match your search.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Table;
