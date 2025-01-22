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
                toast('Profile updated successfully');
                setIsEditing(false);
            })
            .catch((error) => {
                toast('Failed to update profile');
                console.error(error);
            });
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-6 bg-white shadow rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Participant Profile</h2>
            {!isEditing ? (
                <div>
                    <p><strong>Name:</strong> {participant?.name}</p>
                    <p><strong>Email:</strong> {participant?.email}</p>
                    <p><strong>Contact:</strong> {participant?.contact || 'N/A'}</p>
                    <img
                        src={participant?.image || 'https://via.placeholder.com/150'}
                        alt="Profile"
                        className="w-32 h-32 rounded-full mt-4"
                    />
                    <button
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                        onClick={handleEdit}
                    >
                        Edit Profile
                    </button>
                </div>
            ) : (
                <div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full border rounded p-2"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Contact</label>
                        <input
                            type="text"
                            name="contact"
                            value={formData.contact}
                            onChange={handleChange}
                            className="w-full border rounded p-2"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Image URL</label>
                        <input
                            type="text"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            className="w-full border rounded p-2"
                        />
                    </div>
                    <button
                        className="mr-4 px-4 py-2 bg-green-500 text-white rounded"
                        onClick={handleSave}
                    >
                        Save
                    </button>
                    <button
                        className="px-4 py-2 bg-gray-300 text-black rounded"
                        onClick={() => setIsEditing(false)}
                    >
                        Cancel
                    </button>
                </div>
            )}
        </div>
    );
};

export default ParticipantProfile;
