import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageCamps = () => {
  const [camps, setCamps] = useState([]);
  const [editingCamp, setEditingCamp] = useState(null);
  const [updatedDetails, setUpdatedDetails] = useState({});

  useEffect(() => {
    fetch("http://localhost:5000/camps")
      .then((res) => res.json())
      .then((data) => setCamps(data))
      .catch((err) => console.error("Error fetching camps:", err));
  }, []);

  const handleDelete = (campId) => {
    if (!campId) {
      toast.error("Camp ID is missing!");
      return;
    }

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

  return (
    <div className="p-6 min-h-screen">
      <ToastContainer />
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
                    onClick={() => handleDelete(camp._id)}
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
    </div>
  );
};

export default ManageCamps;
