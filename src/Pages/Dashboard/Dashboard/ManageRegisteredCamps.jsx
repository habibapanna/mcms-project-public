import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ManageRegisteredCamps = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the /payments route
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get("https://mcms-project-server.vercel.app/payments");
        setPayments(response.data);
      } catch (err) {
        setError("Failed to fetch payment data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  // Handle confirmation
  const handleConfirm = async (id) => {
    try {
      const response = await axios.patch(`https://mcms-project-server.vercel.app/payments/${id}`, {
        confirmationStatus: "Confirmed",
      });
      if (response.data.success) {
        setPayments((prevPayments) =>
          prevPayments.map((payment) =>
            payment._id === id ? { ...payment, confirmationStatus: "Confirmed" } : payment
          )
        );
        toast.success("Payment successfully confirmed!");
      } else {
        toast.error("Failed to confirm payment. Please try again.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to confirm payment.");
    }
  };

  // Handle cancellation with a custom toast component
  const handleCancel = (id) => {
    const CustomToast = () => (
      <div>
        <p>Are you sure you want to cancel this registration?</p>
        <div className="flex justify-center gap-4 mt-2">
          <button
            className="px-4 py-1 bg-green-500 text-white rounded"
            onClick={async () => {
              try {
                const response = await axios.delete(`https://mcms-project-server.vercel.app/payments/${id}`);
                if (response.data.success) {
                  setPayments((prevPayments) => prevPayments.filter((payment) => payment._id !== id));
                  toast.dismiss(); // Close the current toast
                  toast.success("Registration canceled successfully.");
                } else {
                  toast.error("Failed to cancel registration.");
                }
              } catch (err) {
                console.error(err);
                toast.error("Failed to cancel registration.");
              }
            }}
          >
            Yes
          </button>
          <button
            className="px-4 py-1 bg-red-500 text-white rounded"
            onClick={() => toast.dismiss()}
          >
            Cancel
          </button>
        </div>
      </div>
    );

    toast.info(<CustomToast />, { autoClose: false, closeOnClick: false });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Manage Registered Camps</h2>
      {payments.length === 0 ? (
        <div className="text-center text-gray-500">No registered camps available.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2">Camp Name</th>
                <th className="border border-gray-300 px-4 py-2">Camp Fees</th>
                <th className="border border-gray-300 px-4 py-2">Participant Name</th>
                <th className="border border-gray-300 px-4 py-2">Payment Status</th>
                <th className="border border-gray-300 px-4 py-2">Confirmation Status</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment._id}>
                  <td className="border border-gray-300 px-4 py-2">{payment.CampName}</td>
                  <td className="border border-gray-300 px-4 py-2">${payment.amount}</td>
                  <td className="border border-gray-300 px-4 py-2">{payment.userEmail}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {payment.status === "succeeded" ? (
                      <span className="text-green-600 font-bold">Paid</span>
                    ) : (
                      <span className="text-red-600 font-bold">Unpaid</span>
                    )}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {payment.confirmationStatus === "Confirmed" ? (
                      <span className="text-green-600 font-bold">Confirmed</span>
                    ) : (
                      <button
                        className="px-3 py-1 bg-blue-500 text-white rounded"
                        onClick={() => handleConfirm(payment._id)}
                      >
                        Pending
                      </button>
                    )}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      className="px-3 py-1 bg-red-500 text-white rounded"
                      onClick={() => handleCancel(payment._id)}
                      disabled={payment.status === "succeeded" && payment.confirmationStatus === "Confirmed"}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageRegisteredCamps;
