
import React, { useState } from 'react';

const ProfileImageModal = ({ isOpen, onClose, onSubmit }) => {
  const [imageFile, setImageFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(imageFile);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-xl mb-4">Edit Profile Image</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            required
            className="mb-4"
          />
          <button type="submit" className="bg-blue-500 text-white py-1 px-4 rounded">Upload Image</button>
        </form>
        <button onClick={onClose} className="mt-2 text-gray-600">Close</button>
      </div>
    </div>
  );
};

export default ProfileImageModal;
