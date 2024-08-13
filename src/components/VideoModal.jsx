
import React, { useState } from 'react';

const VideoModal = ({ isOpen, onClose, onSubmit }) => {
  const [videoFile, setVideoFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description, videoFile });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-xl mb-4">Add Video</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="border border-gray-300 p-2 mb-4 w-full"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            required
            className="border border-gray-300 p-2 mb-4 w-full"
          />
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setVideoFile(e.target.files[0])}
            required
            className="mb-4"
          />
          <button type="submit" className="bg-blue-500 text-white py-1 px-4 rounded">Upload Video</button>
        </form>
        <button onClick={onClose} className="mt-2 text-gray-600">Close</button>
      </div>
    </div>
  );
};

export default VideoModal;
