import React from 'react'

const Table = ({ products }) => {
    console.log("products");
    console.log(products);
    return (
        <>
            {/* / table for large screens */}


            <div className='flex justify-center p-2'>
                <div className='overflow-auto rounded-lg shadow hidden md:block'>
                    <table className='w-max'>
                        <thead className='bg-slate-200 border-b-2 border-slate-800'>
                            <tr>
                                <th className='w-32 min-w-32 p-3 text-sm font-semibold tracking-wide text-left'>Name</th>
                                <th className='w-12 p-3 text-sm font-semibold tracking-wide text-left'>Quantity</th>
                                <th className='w-24 p-3 text-sm font-semibold tracking-wide text-left'>Expiry Date</th>
                                <th className='w-24 p-3 text-sm font-semibold tracking-wide text-left'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='divide-y divide-gray-100'>

                            {
                                products.map((prod) => (<tr key={prod.id} className='bg-white'>
                                    <td className="whitespace-nowrap p-3 text-sm text-slate-800">{prod.name}</td>
                                    <td className="whitespace-nowrap p-3 text-sm text-center text-slate-800">- {prod.quantity} +</td>
                                    <td className="whitespace-nowrap p-3 text-sm text-slate-800">{prod.expiryDate}</td>
                                    <td className="whitespace-nowrap p-3 text-sm text-slate-800">
                                        <button className='text-sm p-2 m-1'>Edit</button>
                                        <button className='text-sm p-2 m-1'>Delete</button>
                                    </td>
                                </tr>))
                            }
                        </tbody>
                    </table>
                </div>

            </div>
            {/* grid for small screens */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:hidden">
                {
                    products.map((prod) => (<div key={prod.id} className='bg-white p-4 rounded-lg shadow m-2 flex flex-col '>
                        <div className='flex items-center justify-between space-x-2 text-sm'>
                            <div className='font-bold'>Name:</div>
                            <div>{prod.name}</div>
                        </div>
                        <div className='flex items-center justify-between space-x-2 text-sm'>
                            <div className='font-bold'>Quantity:</div>
                            <div className='flex'>
                                <div className='p-1'>-</div>
                                <div className='p-1'>{prod.quantity}</div>
                                <div className='p-1'>+</div>
                            </div>
                        </div>
                        <div className='flex items-center justify-between space-x-2 text-sm'>
                            <div className='font-bold'>Expiry Date:</div>
                            <div>{prod.expiryDate}</div>
                        </div>
                        <div className='flex items-center space-x-2 text-sm justify-center'>
                            <button className='text-sm'>Edit</button>
                            <button className='text-sm'>Delete</button>
                        </div>
                    </div>))
                }


            </div>
        </>
    )
}

export default Table
