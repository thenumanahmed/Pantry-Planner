import React, { useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa'; // Importing an edit icon from react-icons

const AvatarUploader = ({ selectedImage, setSelectedImage }) => {

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
      console.log("read")
      console.log(selectedImage)
    }
  };

  return (
    <div className="relative flex flex-col items-center">
      <label htmlFor="avatar-upload" className="cursor-pointer relative">
        <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center border-2 border-gray-300">
          {selectedImage ? (
            <img
              src={selectedImage}
              alt="Avatar"
              className="object-cover w-full h-full"
            />
          ) : (
            <span className="text-gray-500">Click to Upload</span>
          )}
          {/* Edit Icon positioned at bottom-right */}
          <div className="absolute bottom-0 right-0 transform translate-x-1/2 translate-y-1/2 bg-white p-2 rounded-full">
            <FaEdit className="text-gray-500" />
          </div>
        </div>
      </label>
      <input
        id="avatar-upload"
        type="file"
        accept="image/jpeg, image/png, image/jpg"
        onChange={handleImageChange}
        className="hidden"
      />
    </div>
  );
};

export default AvatarUploader;
