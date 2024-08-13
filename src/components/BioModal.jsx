
import React, { useState } from 'react';

const BioModal = ({ isOpen, onClose, onSubmit, initialBio }) => {
  const [bio, setBio] = useState(initialBio || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(bio);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-xl mb-4">Edit Bio</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Enter your bio..."
            rows="4"
            cols="30"
            className="border border-gray-300 p-2 mb-4 w-full"
          />
          <button type="submit" className="bg-blue-500 text-white py-1 px-4 rounded">Update Bio</button>
        </form>
        <button onClick={onClose} className="mt-2 text-gray-600">Close</button>
      </div>
    </div>
  );
};

export default BioModal;
