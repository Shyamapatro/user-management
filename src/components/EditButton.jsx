import React from 'react';
import { FaEdit } from 'react-icons/fa';

const EditButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className="flex items-center bg-blue-500 text-white rounded p-2 hover:bg-blue-600">
      <FaEdit className="mr-1" />
      Edit
    </button>
  );
};

export default EditButton;
