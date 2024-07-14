import React, { useState } from 'react';
import AvatarUploader from './AvaTarUploader';

const AddItemModal = ({ closeAddItemModal, handleAddProduct, name, setName, quantity, setQuantity, expiryDate, setExpiryDate, selectedImage, setSelectedImage,
    // labelImage
    getAISuggestion
}) => {
    const [errors, setErrors] = useState({});

    // Get today's date in the format 'YYYY-MM-DD'
    const today = new Date().toISOString().split('T')[0];

    const handleCloseModal = (e) => {
        if (e.target.id === 'blurred-bg') closeAddItemModal();
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        // Reset errors
        setErrors({});

        // Validation
        const newErrors = {};
        if (!name.trim()) newErrors.name = 'Item name is required.';
        if (!quantity || quantity <= 0) newErrors.quantity = 'Quantity must be a positive number.';
        if (!expiryDate) newErrors.expiryDate = 'Expiry date is required.';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        // Default quantity to 1 if it's empty
        const finalQuantity = quantity || 1;
        handleAddProduct();
        // Close the modal
        closeAddItemModal();
    };

    return (
        <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center ' onClick={handleCloseModal} id='blurred-bg'>
            <div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-lg mx-2'>
                {/* Header */}
                <div className='flex justify-between items-center'>
                    <h2 className='text-xl font-semibold'>Add New Item</h2>
                    <button className='text-gray-400 hover:text-gray-600' onClick={closeAddItemModal}>
                        &#10005;
                    </button>
                </div>

                {/* Form */}
                <form className='mt-4' onSubmit={handleSubmit}>
                    <AvatarUploader selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
                    <div className='mb-4 pt-2'>
                        <label className='block text-sm font-medium text-gray-700'>
                            Item Name
                        </label>
                        <input
                            type='text'
                            className={`mt-1 p-2 block w-full border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                            placeholder='Enter item name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        {errors.name && <p className='text-red-500 text-xs mt-1'>{errors.name}</p>}
                    </div>
                    <div className='mb-4'>
                        <label className='block text-sm font-medium text-gray-700'>
                            Quantity
                        </label>
                        <input
                            type='number'
                            className={`mt-1 p-2 block w-full border ${errors.quantity ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                            placeholder='Enter quantity'
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                        />
                        {errors.quantity && <p className='text-red-500 text-xs mt-1'>{errors.quantity}</p>}
                    </div>
                    <div className='mb-4'>
                        <label className='block text-sm font-medium text-gray-700'>
                            Expiry Date
                        </label>
                        <input
                            type='date'
                            className={`mt-1 p-2 block w-full border ${errors.expiryDate ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                            value={expiryDate}
                            min={today} // Setting the min attribute to today's date
                            onChange={(e) => setExpiryDate(e.target.value)}
                        />
                        {errors.expiryDate && <p className='text-red-500 text-xs mt-1'>{errors.expiryDate}</p>}
                    </div>

                    {/* Submit Button */}
                    <div className='mt-6'>
                        <button
                            type='submit'
                            className='w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700'
                        >
                            Add Item
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddItemModal;
