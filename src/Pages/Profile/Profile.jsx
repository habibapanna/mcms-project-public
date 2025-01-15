import React, { useState } from 'react';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'John Doe',
    image: 'https://via.placeholder.com/150',
    contact: 'johndoe@example.com',
  });

  const [formValues, setFormValues] = useState(profile);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSave = () => {
    setProfile(formValues);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormValues(profile);
    setIsEditing(false);
  };

  return (
    <div className="profile p-6 bg-white rounded shadow-md max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Organizer Profile</h2>
      {!isEditing ? (
        <div className="profile-view">
          <img
            src={profile.image}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover mb-4"
          />
          <p className="text-lg text-gray-600"><strong>Name:</strong> {profile.name}</p>
          <p className="text-lg text-gray-600"><strong>Contact:</strong> {profile.contact}</p>
          <button
            onClick={handleEditClick}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Update
          </button>
        </div>
      ) : (
        <div className="profile-edit">
          <div className="mb-4">
            <label className="block text-gray-600 mb-1" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formValues.name}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-blue-600"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 mb-1" htmlFor="image">
              Image URL
            </label>
            <input
              type="text"
              id="image"
              name="image"
              value={formValues.image}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-blue-600"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 mb-1" htmlFor="contact">
              Contact
            </label>
            <input
              type="email"
              id="contact"
              name="contact"
              value={formValues.contact}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-blue-600"
            />
          </div>
          <div className="flex gap-4">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
