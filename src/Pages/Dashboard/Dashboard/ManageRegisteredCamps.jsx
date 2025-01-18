import { useEffect, useState } from "react";


const ManageRegisteredCamps = () => {
  const [registrations, setRegistrations] = useState([]);

  // Fetch registrations from the database
  useEffect(() => {
    fetch("http://localhost:5000/registered-camps")
      .then((res) => res.json())
      .then((data) => setRegistrations(data))
      .catch((err) => console.error("Error fetching registrations:", err));
  }, []);

  // Handle confirmation status update
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
          alert("Registration confirmed!");
          setRegistrations((prevRegistrations) =>
            prevRegistrations.map((registration) =>
              registration._id === registrationId
                ? { ...registration, confirmationStatus: "Confirmed" }
                : registration
            )
          );
        }
      })
      .catch((err) => console.error("Error confirming registration:", err));
  };

  // Handle cancellation
  const handleCancel = (registrationId, isPaid, isConfirmed) => {
    if (isPaid && isConfirmed) {
      alert("Cancellation not allowed for confirmed and paid registrations.");
      return;
    }

    const confirmCancel = window.confirm("Are you sure you want to cancel this registration?");
    if (confirmCancel) {
      fetch(`http://localhost:5000/cancel-registration/${registrationId}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message === "Registration canceled successfully") {
            alert("Registration canceled successfully!");
            setRegistrations((prevRegistrations) =>
              prevRegistrations.filter((registration) => registration._id !== registrationId)
            );
          }
        })
        .catch((err) => console.error("Error canceling registration:", err));
    }
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
            {registrations.map((registration) => (
              <tr key={registration._id} className="border-b">
                <td className="px-4 py-2">{registration.campName}</td>
                <td className="px-4 py-2">${registration.campFees}</td>
                <td className="px-4 py-2">{registration.participantName}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded text-white text-sm ${
                      registration.paymentStatus === "Paid"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  >
                    {registration.paymentStatus}
                  </span>
                </td>
                <td className="px-4 py-2">
                  {registration.confirmationStatus === "Pending" ? (
                    <button
                      onClick={() => handleConfirm(registration._id)}
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
                        registration._id,
                        registration.paymentStatus === "Paid",
                        registration.confirmationStatus === "Confirmed"
                      )
                    }
                    className={`px-3 py-1 rounded text-sm text-white ${
                      registration.paymentStatus === "Paid" &&
                      registration.confirmationStatus === "Confirmed"
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-red-500 hover:bg-red-600"
                    }`}
                    disabled={
                      registration.paymentStatus === "Paid" &&
                      registration.confirmationStatus === "Confirmed"
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
