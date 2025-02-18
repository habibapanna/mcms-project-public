import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import useAuth from "../../../../hooks/useAuth"; // Update path as needed

const MyBookings = () => {
  const { user } = useAuth();
  const [camps, setCamps] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch registered camps
  const fetchCamps = async () => {
    try {
      const response = await axios.get(
        `https://mcms-project-server.vercel.app/api/participants/${user.email}`
      );
      setCamps(response.data);
    } catch (error) {
      console.error("Error fetching camps:", error);
      toast.error("Failed to fetch registered camps.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCamps();
  }, [user]);

  if (loading) return <div>Loading...</div>;

  // Check if user is a participant
  if (user.role !== "participant") {
    return <div className="text-center">You do not have access to this page. My Bookings page is for participants.</div>;
  }

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl text-center font-bold mb-4">My Bookings</h2>
      <div className="overflow-x-auto overflow-y-auto max-h-96">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2 text-left">Camp Name</th>
              <th className="border px-4 py-2 text-left">Camp Fees</th>
              <th className="border px-4 py-2 text-left">Confirmation Status</th>
            </tr>
          </thead>
          <tbody>
            {camps.map((camp) => (
              <tr key={camp._id}>
                <td className="border px-4 py-2 text-left">{camp.CampName}</td>
                <td className="border px-4 py-2 text-left">${camp.campFees}</td>
                <td className="border px-4 py-2 text-left">{camp.confirmationStatus || "Pending"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const handleCancel = async (campId) => {
  try {
    await axios.delete(`https://mcms-project-server.vercel.app/cancel-registration/${campId}`);
    toast.success("Registration canceled!");
    fetchCamps(); // Refresh the camps list
  } catch (error) {
    console.error("Error canceling registration:", error);
    toast.error("Failed to cancel registration.");
  }
};

export default MyBookings;
