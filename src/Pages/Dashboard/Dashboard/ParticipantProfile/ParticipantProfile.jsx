import { useEffect, useState } from "react";

const ParticipantProfile = ({ participantId }) => {
  const [participant, setParticipant] = useState({});
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    // Fetch participant data
    const fetchParticipant = async () => {
      const response = await fetch(`http://localhost:5000/participants/${participantId}`);
      const data = await response.json();
      setParticipant(data);
    };

    fetchParticipant();
  }, [participantId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setParticipant((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:5000/participants/${participantId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(participant),
      });

      if (response.ok) {
        alert("Profile updated successfully!");
        setEditMode(false);
      } else {
        alert("Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 mt-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Participant Profile</h1>
      {!editMode ? (
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <img
              src={participant.image || "https://via.placeholder.com/100"}
              alt="Participant"
              className="w-20 h-20 rounded-full shadow-md"
            />
            <div>
              <p className="text-lg font-medium text-gray-700">
                <strong>Name:</strong> {participant.name || "N/A"}
              </p>
              <p className="text-lg font-medium text-gray-700">
                <strong>Email:</strong> {participant.email || "N/A"}
              </p>
              <p className="text-lg font-medium text-gray-700">
                <strong>Contact:</strong> {participant.contact || "N/A"}
              </p>
            </div>
          </div>
          <button
            onClick={() => setEditMode(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
          >
            Update Profile
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <img
              src={participant.image || "https://via.placeholder.com/100"}
              alt="Participant"
              className="w-20 h-20 rounded-full shadow-md"
            />
            <input
              type="text"
              name="image"
              value={participant.image || ""}
              onChange={handleInputChange}
              placeholder="Image URL"
              className="w-full p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <input
            type="text"
            name="name"
            value={participant.name || ""}
            onChange={handleInputChange}
            placeholder="Name"
            className="w-full p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            name="email"
            value={participant.email || ""}
            onChange={handleInputChange}
            placeholder="Email"
            className="w-full p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="contact"
            value={participant.contact || ""}
            onChange={handleInputChange}
            placeholder="Contact"
            className="w-full p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex space-x-4">
            <button
              onClick={handleUpdate}
              className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700"
            >
              Save Changes
            </button>
            <button
              onClick={() => setEditMode(false)}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg shadow-md hover:bg-gray-700"
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
