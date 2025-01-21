import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageCamps = () => {
  const [camps, setCamps] = useState([]);
  const [editingCamp, setEditingCamp] = useState(null);
  const [updatedDetails, setUpdatedDetails] = useState({});

  // Fetch all camps
  useEffect(() => {
    fetch("http://localhost:5000/camps")
      .then((res) => res.json())
      .then((data) => setCamps(data))
      .catch((err) => console.error("Error fetching camps:", err));
  }, []);

  // Custom delete confirmation using toast
  const handleDeleteConfirmation = (campId) => {
    toast(
      ({ closeToast }) => (
        <div>
          <p>Are you sure you want to delete this camp?</p>
          <div className="flex space-x-2 mt-2">
            <button
              onClick={() => {
                handleDelete(campId);
                closeToast();
              }}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Yes
            </button>
            <button
              onClick={closeToast}
              className="bg-gray-500 text-white px-3 py-1 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      { autoClose: false }
    );
  };

  // Handle delete
  const handleDelete = (campId) => {
    fetch(`http://localhost:5000/camps/${campId}`, { method: "DELETE" })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          toast.success("Camp deleted successfully!");
          setCamps((prevCamps) => prevCamps.filter((camp) => camp._id !== campId));
        } else {
          toast.error("Failed to delete camp. It may not exist.");
        }
      })
      .catch((err) => {
        toast.error("Error deleting camp!");
        console.error("Error deleting camp:", err);
      });
  };

  // Handle edit button click
  const handleEditClick = (camp) => {
    setEditingCamp(camp);
    setUpdatedDetails({ ...camp });
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  // Handle update
  const handleUpdate = (id) => {
    fetch(`http://localhost:5000/camps/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedDetails),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          toast.success("Camp updated successfully!");
          setCamps((prevCamps) =>
            prevCamps.map((camp) =>
              camp._id === editingCamp._id ? { ...camp, ...updatedDetails } : camp
            )
          );
          setEditingCamp(null);
        } else {
          toast.error("Failed to update camp.");
        }
      })
      .catch((err) => {
        toast.error("Error updating camp!");
        console.error("Error updating camp:", err);
      });
  };

  return (
    <div className="p-6 min-h-screen">
      <ToastContainer />
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
                    <FaEdit size={15} />
                  </button>
                  <button
                    onClick={() => handleDeleteConfirmation(camp._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash size={15} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editingCamp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">Edit Camp</h3>
            <label className="block mb-2">
              Name:
              <input
                type="text"
                name="campName"
                value={updatedDetails.campName || ""}
                onChange={handleInputChange}
                className="border w-full px-2 py-1 rounded"
              />
            </label>
            <label className="block mb-2">
              Date & Time:
              <input
                type="datetime-local"
                name="dateTime"
                value={updatedDetails.dateTime || ""}
                onChange={handleInputChange}
                className="border w-full px-2 py-1 rounded"
              />
            </label>
            <label className="block mb-2">
              Location:
              <input
                type="text"
                name="location"
                value={updatedDetails.location || ""}
                onChange={handleInputChange}
                className="border w-full px-2 py-1 rounded"
              />
            </label>
            <label className="block mb-4">
              Healthcare Professional:
              <input
                type="text"
                name="healthcareProfessional"
                value={updatedDetails.healthcareProfessional || ""}
                onChange={handleInputChange}
                className="border w-full px-2 py-1 rounded"
              />
            </label>
            <div className="flex space-x-2">
              <button
                onClick={() => handleUpdate(editingCamp._id)}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Update
              </button>
              <button
                onClick={() => setEditingCamp(null)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCamps;
