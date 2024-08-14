import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { getUserDetails } from '../api';
import BioModal from './BioModal';
import VideoModal from './VideoModal';
import ProfileImageModal from './ProfileImageModal';
import EditButton from "./EditButton";

const UserProfile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [isBioModalOpen, setIsBioModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isProfileImageModalOpen, setIsProfileImageModalOpen] = useState(false);
  const [loading, setLoading] = useState(false); 

  const fetchUserDetails = async () => {
    try {
      const response = await getUserDetails();
      setUserDetails(response.data.userDetails);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const handleBioUpdate = async (newBio) => {
    try {
      if (newBio.length > 500) {
        alert('Bio should not exceed 500 characters.');
        return;
      }
      const response = await axios.put('https://user-backend-k20c.onrender.com/api/user/updateUserData', {
        bio: newBio,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Update response:', response.data);
      alert('Bio updated successfully!');
      fetchUserDetails();
    } catch (error) {
      console.error('Error updating bio:', error);
      alert('Error updating bio. Please try again.');
    }
  };

  const handleVideoSubmit = async (videoData) => {
    setLoading(true); // Start loading
    console.log('Video Data:', videoData);

    const formData = new FormData();
    formData.append('video', videoData.videoFile);
    formData.append('title', videoData.title);
    formData.append('description', videoData.description);

    try {
      const response = await axios.put('https://user-backend-k20c.onrender.com/api/user/upload-video', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Upload Response:', response.data);
      alert('Video uploaded successfully!');
      fetchUserDetails();
    } catch (error) {
      console.error('Error uploading video:', error);
      alert('Error uploading video.');
    } finally {
      setLoading(false);
    }
  };

  const handleProfileImageUpload = async (e) => {
    setLoading(true); 
    const file = e;
    if (!file) {
      alert('Please select a file to upload.');
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('profileImage', file);

    try {
      const response = await axios.put('https://user-backend-k20c.onrender.com/api/user/upload-profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Upload Response:', response.data);
      alert('Profile image uploaded successfully!');
      fetchUserDetails();
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading profile image.');
    } finally {
      setLoading(false); 
    }
  };

  if (!userDetails) return <p className="text-center mt-4">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">User Profile</h1>
      <div className="flex flex-col items-center">
        <img 
          src={userDetails.imageUrl || 'default-profile.png'} 
          alt="Profile" 
          className="w-32 h-32 rounded-full object-cover mb-4 shadow-md" 
        />
        <EditButton 
          onClick={() => setIsProfileImageModalOpen(true)} 
        />
      </div>
      <div className="mt-6">
        <p className="text-lg font-medium">First Name: <span className="font-normal">{userDetails.firstName}</span></p>
        <p className="text-lg font-medium">Last Name: <span className="font-normal">{userDetails.lastName}</span></p>
        <p className="text-lg font-medium">Email: <span className="font-normal">{userDetails.email}</span></p>
        <p className="text-lg font-medium">Phone Number: <span className="font-normal">{userDetails.phoneNumber}</span></p>
        <p className="text-lg font-medium">Bio: <span className="font-normal">{userDetails.bio || 'No bio available'}</span></p>
        <EditButton  
          onClick={() => setIsBioModalOpen(true)} 
        />
      </div>

      <div className="flex justify-between items-center mt-6">
        <h2 className="text-xl font-semibold">Videos Section</h2>
        <button 
          onClick={() => setIsVideoModalOpen(true)} 
          className="bg-blue-600 text-white py-2 px-4 rounded transition duration-300 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Add Video
        </button>
      </div>

      {loading ? ( 
        <div className="flex flex-col items-center mt-4">
        <div className="loader border-t-4 border-b-4 border-blue-600 rounded-full w-10 h-10 animate-spin mb-2"></div>
        <p className="text-gray-600">Uploading...</p>
      </div>
      ) : userDetails.videos && userDetails.videos.length > 0 ? (
        <div className="mt-4 space-y-4">
          {userDetails.videos && userDetails.videos.length > 0 ? (
  <div className="mt-4 space-y-4">
    {userDetails.videos.map((video, index) => (
      <div key={index} className="border border-gray-200 rounded-lg p-4 shadow-md">
        <video width="620" height="240" controls className="mt-2">
          <source src={video.videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <p className="font-medium">Title: <span className="font-normal">{video.title}</span></p>
        <p className="font-medium">Description: <span className="font-normal">{video.description}</span></p>
        
      </div>
    ))}
  </div>
) : (
  <div className="mt-4 text-center">
    <p className="text-gray-500">No videos uploaded yet. Add your first video!</p>
  </div>
)}

        </div>
      ) : (
        <div className="mt-4 text-center">
          <p className="text-gray-500">No videos uploaded yet. Add your first video!</p>
        </div>
      )}

      <BioModal
        isOpen={isBioModalOpen}
        onClose={() => setIsBioModalOpen(false)}
        onSubmit={handleBioUpdate}
        initialBio={userDetails.bio}
      />

      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        onSubmit={handleVideoSubmit}
      />

      <ProfileImageModal
        isOpen={isProfileImageModalOpen}
        onClose={() => setIsProfileImageModalOpen(false)}
        onSubmit={handleProfileImageUpload}
      />
    </div>
  );
};

export default UserProfile;
