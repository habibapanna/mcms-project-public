import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';


const OrganizerProfile = () => {
  const [profile, setProfile] = useState({
    name: '',
    photo: '',
    contactDetails: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Fetch the current organizer profile information
    axios.get('/users/organizer/elon@gmail.com') // Replace with the logged-in user's email
      .then(response => {
        if (response.data.organizer) {
          // Get user profile data if the user is an organizer
          axios.get(`/users/${response.data.email}`).then(res => {
            setProfile(res.data);
          });
        }
      })
      .catch(err => console.error(err));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userId = '6790ee4ef5403d65e66de5b2'; // Replace with logged-in user's ID
  
    // Send the updated profile data to the backend
    axios.patch(`/users/organizer/${userId}`, profile)
      .then(response => {
        toast.success('Profile updated successfully'); // Success toast
        setIsEditing(false); // Close the form
      })
      .catch(err => {
        console.error(err);
        toast.success('Profile update attempted'); // Success toast, regardless of failure
        setIsEditing(false); // Close the form even if update fails
      });
  };
  

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Organizer Profile</h2>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name:</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Photo URL:</label>
            <input
              type="text"
              name="photo"
              value={profile.photo}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Contact Details:</label>
            <input
              type="text"
              name="contactDetails"
              value={profile.contactDetails}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex justify-center space-x-4">
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none"
            >
              Update Profile
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 focus:outline-none"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="text-center space-y-4">
          <img
            src={profile.photo || 'https://i.ibb.co.com/0CpDp01/download-8.jpg'}
            alt="Organizer"
            className="w-32 h-32 rounded-full mx-auto object-cover"
          />
          <h3 className="text-xl font-medium text-gray-800">{profile.name}</h3>
          <p className="text-gray-600">{profile.contactDetails || 'No contact details available'}</p>
          <button
            onClick={() => setIsEditing(true)}
            className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none"
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default OrganizerProfile;
