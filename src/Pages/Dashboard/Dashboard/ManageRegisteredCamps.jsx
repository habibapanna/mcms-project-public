import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageRegisteredCamps = () => {
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/participants")
      .then((res) => res.json())
      .then((data) => setRegistrations(data))
      .catch((err) => console.error("Error fetching registrations:", err));
  }, []);

  const handleConfirm = (registrationId) => {
    fetch(`http://localhost:5000/confirm-registration/${registrationId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Registration confirmed successfully") {
          toast.success("Registration confirmed!");
          setRegistrations((prev) =>
            prev.map((reg) =>
              reg._id === registrationId
                ? { ...reg, confirmationStatus: "Confirmed" }
                : reg
            )
          );
        }
      })
      .catch((err) => toast.error("Error confirming registration: " + err));
  };

  const handleCancel = (registrationId, isPaid, isConfirmed) => {
    if (isPaid && isConfirmed) {
      toast.info(
        "Cancellation not allowed for confirmed and paid registrations."
      );
      return;
    }

    // Display confirmation toast
    toast(
      ({ closeToast }) => (
        <div>
          <p>Are you sure you want to cancel this registration?</p>
          <div className="flex justify-between mt-2">
            <button
              onClick={() => {
                cancelRegistration(registrationId);
                closeToast(); // Close toast after action
              }}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
            >
              Yes
            </button>
            <button
              onClick={closeToast}
              className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-1 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      { autoClose: false } // Wait for user interaction
    );
  };

  const cancelRegistration = (registrationId) => {
    fetch(`http://localhost:5000/cancel-registration/${registrationId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Registration canceled successfully") {
          toast.success("Registration canceled successfully!");
          setRegistrations((prev) =>
            prev.filter((reg) => reg._id !== registrationId)
          );
        }
      })
      .catch((err) => toast.error("Error canceling registration: " + err));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6">Manage Registered Camps</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="px-4 py-2">Camp Name</th>
              <th className="px-4 py-2">Camp Fees</th>
              <th className="px-4 py-2">Participant Name</th>
              <th className="px-4 py-2">Payment Status</th>
              <th className="px-4 py-2">Confirmation Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map((reg) => (
              <tr key={reg._id} className="border-b">
                <td className="px-4 py-2">{reg.CampName}</td>
                <td className="px-4 py-2">${reg.campFees}</td>
                <td className="px-4 py-2">{reg.name}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded text-white text-sm ${
                      reg.paymentStatus === "Paid"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  >
                    {reg.paymentStatus}
                  </span>
                </td>
                <td className="px-4 py-2">
                  {reg.confirmationStatus === "Pending" ? (
                    <button
                      onClick={() => handleConfirm(reg._id)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Pending
                    </button>
                  ) : (
                    <span className="bg-green-500 text-white px-3 py-1 rounded text-sm">
                      Confirmed
                    </span>
                  )}
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() =>
                      handleCancel(
                        reg._id,
                        reg.paymentStatus === "Paid",
                        reg.confirmationStatus === "Confirmed"
                      )
                    }
                    className={`px-3 py-1 rounded text-sm text-white ${
                      reg.paymentStatus === "Paid" &&
                      reg.confirmationStatus === "Confirmed"
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-red-500 hover:bg-red-600"
                    }`}
                    disabled={
                      reg.paymentStatus === "Paid" &&
                      reg.confirmationStatus === "Confirmed"
                    }
                  >
                    Cancel
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

export default ManageRegisteredCamps;
