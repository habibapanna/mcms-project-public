import { useState, useEffect } from "react";
import { toast } from "react-toastify"; // Optional: For notifications
import StripeCheckout from "react-stripe-checkout"; // Stripe for payments

const RegisteredCamps = ({ participantId }) => {
  const [registeredCamps, setRegisteredCamps] = useState([]);

  useEffect(() => {
    // Fetch registered camps for the participant
    const fetchCamps = async () => {
      const response = await fetch(`http://localhost:5000/registered-camps/${participantId}`);
      const data = await response.json();
      setRegisteredCamps(data);
    };

    fetchCamps();
  }, [participantId]);

  const handlePayment = async (campId, amount) => {
    try {
      const token = await StripeCheckout.getToken(); // Handle Stripe tokenization
      const response = await fetch(`http://localhost:5000/pay`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, amount, campId, participantId }),
      });

      if (response.ok) {
        const { transactionId } = await response.json();
        toast.success(`Payment successful! Transaction ID: ${transactionId}`);
        setRegisteredCamps((prev) =>
          prev.map((camp) =>
            camp.id === campId
              ? { ...camp, paymentStatus: "Paid", transactionId, canCancel: false }
              : camp
          )
        );
      } else {
        toast.error("Payment failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during payment:", error);
      toast.error("Payment error. Please try again.");
    }
  };

  const handleCancel = async (campId) => {
    try {
      const response = await fetch(`http://localhost:5000/cancel/${campId}`, { method: "DELETE" });

      if (response.ok) {
        toast.success("Registration canceled successfully!");
        setRegisteredCamps((prev) => prev.filter((camp) => camp.id !== campId));
      } else {
        toast.error("Failed to cancel registration.");
      }
    } catch (error) {
      console.error("Error during cancellation:", error);
      toast.error("Cancellation error. Please try again.");
    }
  };

  const handleFeedback = (campId) => {
    // Navigate to feedback page or open a feedback modal
    toast.info("Redirecting to feedback form...");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Registered Camps</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full text-left border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 border">Camp Name</th>
              <th className="px-4 py-2 border">Camp Fees</th>
              <th className="px-4 py-2 border">Participant Name</th>
              <th className="px-4 py-2 border">Payment Status</th>
              <th className="px-4 py-2 border">Confirmation Status</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {registeredCamps.length > 0 ? (
              registeredCamps.map((camp) => (
                <tr key={camp.id} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border">{camp.name}</td>
                  <td className="px-4 py-2 border">${camp.fees}</td>
                  <td className="px-4 py-2 border">{camp.participantName}</td>
                  <td className="px-4 py-2 border">
                    {camp.paymentStatus === "Paid" ? (
                      <span className="text-green-600 font-bold">Paid</span>
                    ) : (
                      <button
                        onClick={() => handlePayment(camp.id, camp.fees)}
                        className="px-3 py-1 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
                      >
                        Pay
                      </button>
                    )}
                  </td>
                  <td className="px-4 py-2 border">
                    {camp.confirmationStatus === "Confirmed" ? (
                      <span className="text-green-600 font-bold">Confirmed</span>
                    ) : (
                      <span className="text-yellow-600 font-bold">Pending</span>
                    )}
                  </td>
                  <td className="px-4 py-2 border">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleCancel(camp.id)}
                        className={`px-3 py-1 rounded shadow ${
                          camp.canCancel
                            ? "bg-red-600 text-white hover:bg-red-700"
                            : "bg-gray-400 text-gray-600 cursor-not-allowed"
                        }`}
                        disabled={!camp.canCancel}
                      >
                        Cancel
                      </button>
                      {camp.paymentStatus === "Paid" && camp.confirmationStatus === "Confirmed" && (
                        <button
                          onClick={() => handleFeedback(camp.id)}
                          className="px-3 py-1 bg-green-600 text-white rounded shadow hover:bg-green-700"
                        >
                          Feedback
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No registered camps found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RegisteredCamps;
