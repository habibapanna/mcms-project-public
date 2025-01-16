import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const ManageCamps = () => {
  const [camps, setCamps] = useState([]);
  const [editingCamp, setEditingCamp] = useState(null);
  const [updatedDetails, setUpdatedDetails] = useState({});

  // Fetch camps on load
  useEffect(() => {
    fetch("http://localhost:5000/camps")
      .then((res) => res.json())
      .then((data) => setCamps(data))
      .catch((err) => console.error("Error fetching camps:", err));
  }, []);

  // Handle delete
  const handleDelete = (campId) => {
    fetch(`http://localhost:5000/delete-camp/${campId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Camp deleted successfully") {
          alert("Camp deleted successfully!");
          setCamps(camps.filter((camp) => camp._id !== campId));
        }
      })
      .catch((err) => console.error("Error deleting camp:", err));
  };

  // Handle edit
  const handleEditClick = (camp) => {
    setEditingCamp(camp._id);
    setUpdatedDetails({ ...camp });
  };

  const handleUpdate = () => {
    fetch(`http://localhost:5000/update-camp/${editingCamp}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedDetails),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Camp updated successfully") {
          alert("Camp updated successfully!");
          setCamps((prevCamps) =>
            prevCamps.map((camp) =>
              camp._id === editingCamp ? { ...updatedDetails, _id: camp._id } : camp
            )
          );
          setEditingCamp(null);
        }
      })
      .catch((err) => console.error("Error updating camp:", err));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6">Manage Camps</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Date & Time</th>
              <th className="px-4 py-2">Location</th>
              <th className="px-4 py-2">Healthcare Professional</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {camps.map((camp) => (
              <tr key={camp._id} className="border-b">
                <td className="px-4 py-2">{camp.campName}</td>
                <td className="px-4 py-2">{new Date(camp.dateTime).toLocaleString()}</td>
                <td className="px-4 py-2">{camp.location}</td>
                <td className="px-4 py-2">{camp.healthcareProfessional}</td>
                <td className="px-4 py-2 flex space-x-2">
                  <button
                    onClick={() => handleEditClick(camp)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FaEdit size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(camp._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingCamp && (
        <div className="mt-6 p-6 bg-white shadow-md rounded-lg max-w-lg mx-auto">
          <h3 className="text-2xl font-bold mb-4">Edit Camp</h3>
          <label className="block mb-2 font-medium">Camp Name</label>
          <input
            type="text"
            value={updatedDetails.campName}
            onChange={(e) =>
              setUpdatedDetails({ ...updatedDetails, campName: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
          <label className="block mt-4 mb-2 font-medium">Date & Time</label>
          <input
            type="datetime-local"
            value={new Date(updatedDetails.dateTime)
              .toISOString()
              .substring(0, 16)}
            onChange={(e) =>
              setUpdatedDetails({ ...updatedDetails, dateTime: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
          <label className="block mt-4 mb-2 font-medium">Location</label>
          <input
            type="text"
            value={updatedDetails.location}
            onChange={(e) =>
              setUpdatedDetails({ ...updatedDetails, location: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
          <label className="block mt-4 mb-2 font-medium">
            Healthcare Professional
          </label>
          <input
            type="text"
            value={updatedDetails.healthcareProfessional}
            onChange={(e) =>
              setUpdatedDetails({
                ...updatedDetails,
                healthcareProfessional: e.target.value,
              })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
          <div className="mt-4 flex space-x-2">
            <button
              onClick={handleUpdate}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            >
              Update
            </button>
            <button
              onClick={() => setEditingCamp(null)}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCamps;
