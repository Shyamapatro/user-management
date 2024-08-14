import React, { useEffect, useState } from 'react';
import { getListOfUser } from '../api';

const UserListingPage = () => {
  const [users, setUsers] = useState([]);
  const [visibleVideos, setVisibleVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserDetails = async () => {
    try {
      const response = await getListOfUser();
      console.log(response);
      if (Array.isArray(response.data.users) && response.data.users.length > 0) {
        setUsers(response.data.users);
        setVisibleVideos(Array(response.data.users.length).fill(3));
      } else if (Array.isArray(response.data.users) && response.data.users.length === 0) {
        setError("No user data found.");
      } else {
        setError("Unexpected data format. Please try again later.");
      }
    } catch (error) {
      setError("Failed to load user details. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const handleViewMore = (index) => {
    setVisibleVideos((prev) => {
      const newVisibleVideos = [...prev];
      newVisibleVideos[index] += 3;
      return newVisibleVideos;
    });
  };

  if (loading) return <p className="text-center mt-4">Loading...</p>;
  if (error) return <p className="text-center mt-4 text-red-500">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">User Details</h1>

      {users.length === 0 ? (
        <p className="text-center mt-4 text-gray-500">No user data found.</p>
      ) : (
        users.map((user, userIndex) => (
          <div key={user._id} className="mb-8">
            <div className="flex flex-col md:flex-row items-center mb-6">
              <img 
                src={user.imageUrl || 'default-profile.png'} 
                alt={`${user.firstName} ${user.lastName}'s Profile`} 
                className="w-32 h-32 rounded-full object-cover mb-4 md:mb-0 md:mr-6 shadow-md" 
              />
              <div className="flex flex-col">
                <h2 className="text-xl font-semibold">{user.firstName} {user.lastName}</h2>
                <p className="text-lg font-medium">Email: <span className="font-normal">{user.email}</span></p>
                <p className="text-lg font-medium">Phone Number: <span className="font-normal">{user.phoneNumber}</span></p>
                <p className="text-lg font-medium">Bio: <span className="font-normal">{user.bio || 'No bio available'}</span></p>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Uploaded Videos</h2>
                {user.videos.length > visibleVideos[userIndex] && (
                  <button 
                    onClick={() => handleViewMore(userIndex)}
                    className="bg-blue-600 text-white py-1 px-3 rounded transition duration-300 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  >
                    View More
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {user.videos.slice(0, visibleVideos[userIndex]).map((video) => (
                  <div key={video._id} className="border border-gray-200 rounded-lg p-4 shadow-md">
                    <h3 className="font-medium">Video Title: <span className="font-normal">{video.title}</span></h3>
                    <p className="font-medium">Description: <span className="font-normal">{video.description}</span></p>
                    <video width="320" height="240" controls className="mt-2">
                      <source src={video.videoUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default UserListingPage;
