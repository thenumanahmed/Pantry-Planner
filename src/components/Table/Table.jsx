import React from 'react'

const Table = ({ products,
    openAddItemModal,
    setEditingProductExpDate,
    setEditingProductName,
    setEditingProductId,
    setEditingProductQuantity,
    openEditItemModal,
    handleDeleteProduct,
    handleIncrementProductQuantity,
    handleDecrementProductQuantity
}) => {
    return (
        <>
            <div className='flex justify-center p-2 w-full'>
                <div className='w-full overflow-auto rounded-lg shadow hidden md:block'>
                    <div className='flex justify-between'>
                        <button className='my-2 p-2 text-md'>AI Suggestions</button>
                        <button className='my-2 p-2 text-md' onClick={openAddItemModal}>Add Item</button>
                    </div>
                    <table className='w-full'>
                        <thead className='bg-slate-200 border-b-2 border-slate-800'>
                            <tr>
                                <th className='w-2/3 p-3 text-sm font-semibold tracking-wide text-left flex-grow'>Name</th>
                                <th className='w-4/12 p-3 text-sm font-semibold tracking-wide text-left'>Quantity</th>
                                <th className='w-4/12 p-3 text-sm font-semibold tracking-wide text-left'>Expiry Date</th>
                                <th className='w-4/12 p-3 text-sm font-semibold tracking-wide text-left'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='divide-y divide-gray-100'>
                            {products.map((prod) => (
                                <tr key={prod.id} className='bg-white odd:bg-gray-200'>
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
                                            setEditingProductExpDate(prod.expiryDate)
                                            setEditingProductName(prod.name),
                                                setEditingProductId(prod.id),
                                                setEditingProductQuantity(prod.quantity),
                                                openEditItemModal(true)
                                        }}>Edit</button>
                                        <button className='text-sm p-2 m-1' onClick={() => handleDeleteProduct(prod.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Table
