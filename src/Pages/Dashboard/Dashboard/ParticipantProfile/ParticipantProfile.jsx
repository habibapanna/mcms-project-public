import { useState } from 'react';
import useParticipant from '../../../../hooks/useParticipant';
import { toast } from 'react-toastify';

const ParticipantProfile = () => {
    const { participant, isLoading, updateParticipant } = useParticipant();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        contact: '',
        image: '',
    });

    const handleEdit = () => {
        setFormData({
            name: participant?.name || '',
            email: participant?.email || '',
            contact: participant?.contact || '',
            image: participant?.image || '',
        });
        setIsEditing(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        updateParticipant(formData)
            .then(() => {
                toast('Profile updated successfully', { type: 'success' });
                setIsEditing(false);
            })
            .catch((error) => {
                toast('Failed to update profile', { type: 'error' });
                console.error(error);
            });
    };

    if (isLoading) {
        return <div className="text-center text-gray-500">Loading...</div>;
    }

    return (
        <div className="p-6 bg-gradient-to-r from-green-300 to-blue-500 shadow-lg rounded-lg transform transition duration-300 hover:scale-105">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">Participant Profile</h2>
            {!isEditing ? (
                <div>
                    <div className="flex justify-center mb-6">
                        <img
                            src={participant?.image || 'https://via.placeholder.com/150'}
                            alt="Profile"
                            className="w-32 h-32 rounded-full shadow-lg object-cover"
                        />
                    </div>
                    <div className="text-center text-white">
                        <p className="mb-2"><strong>Name:</strong> {participant?.name || 'N/A'}</p>
                        <p className="mb-2"><strong>Email:</strong> {participant?.email || 'N/A'}</p>
                        <p className="mb-2"><strong>Contact:</strong> {participant?.contact || 'N/A'}</p>
                        <button
                            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            onClick={handleEdit}
                        >
                            Edit Profile
                        </button>
                    </div>
                </div>
            ) : (
                <div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-900">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full border-2 border-gray-300 rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-900">Contact</label>
                        <input
                            type="text"
                            name="contact"
                            value={formData.contact}
                            onChange={handleChange}
                            className="w-full border-2 border-gray-300 rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-900">Image URL</label>
                        <input
                            type="text"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            className="w-full border-2 border-gray-300 rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button
                            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300"
                            onClick={handleSave}
                        >
                            Save
                        </button>
                        <button
                            className="px-6 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                            onClick={() => setIsEditing(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ParticipantProfile;
