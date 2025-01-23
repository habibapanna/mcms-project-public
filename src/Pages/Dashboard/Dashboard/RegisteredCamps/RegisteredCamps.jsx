import { useEffect, useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import { CardElement, Elements, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { toast } from "react-toastify";



// Initialize stripePromise with your Stripe publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const RegisteredCamps = () => {
  const [camps, setCamps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCamp, setSelectedCamp] = useState(null);
  const [feedbackText, setFeedbackText] = useState("");
  const [rating, setRating] = useState(5);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const { user } = useAuth();

  // Fetch registered camps
  const fetchCamps = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/participants/${user.email}`);
      setCamps(response.data);
    } catch (error) {
      console.error("Error fetching camps:", error);
    } finally {
      setLoading(false);
    }
  };

  // Cancel camp registration
  const handleCancel = async (campId) => {
    try {
      await axios.delete(`http://localhost:5000/cancel-registration/${campId}`);
      toast.success("Registration canceled!");
      fetchCamps(); // Refresh the camps list
    } catch (error) {
      console.error("Error canceling registration:", error);
      toast.error("Failed to cancel registration.");
    }
  };

  // Update payment status locally after successful payment
  const updatePaymentStatusLocally = (campId, transactionId) => {
    setCamps((prevCamps) =>
      prevCamps.map((camp) =>
        camp._id === campId
          ? { ...camp, paymentStatus: "Paid", transactionId }
          : camp
      )
    );
  };

  // Submit feedback
  const handleSubmitFeedback = async (campId) => {
    if (!campId) {
      console.error("No camp selected for feedback");
      toast.error("No camp selected for feedback");
      return;
    }
  
    try {
      // Log the payload before sending
      console.log("Submitting feedback with data:", {
        campId,
        feedbackText,
        rating,
      });
  
      // Make the POST request
      const response = await axios.post("http://localhost:5000/feedback", {
        campId,         // Camp ID from the selected camp
        feedbackText,   // Feedback entered in the modal
        rating,         // Rating entered in the modal
      });
  
      if (response.data.message) {
        toast.success(response.data.message); // Success message from the backend
      }
  
      // Reset form
      setFeedbackText("");
      setRating(5);
      setIsFeedbackModalOpen(false);
    } catch (error) {
      console.error("Error submitting feedback:", error.response || error);
      toast.error(error.response?.data?.message || "Failed to submit feedback.");
    }
  };
  
  
  
  useEffect(() => {
    fetchCamps();
  }, [user]);

  if (loading) return <div>Loading...</div>;

  return (
    <Elements stripe={stripePromise}>
      <div className="p-6 bg-white shadow rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Registered Camps</h2>
        {selectedCamp && (
          <PaymentForm
            camp={selectedCamp}
            onSuccess={(transactionId) => {
              updatePaymentStatusLocally(selectedCamp._id, transactionId);
              setSelectedCamp(null);
            }}
          />
        )}
        <div className="overflow-x-auto overflow-y-auto max-h-96">
          <table className="table-auto w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2 text-left">Camp Name</th>
                <th className="border px-4 py-2 text-left">Camp Fees</th>
                <th className="border px-4 py-2 text-left">Payment Status</th>
                <th className="border px-4 py-2 text-left">Confirmation Status</th>
                <th className="border px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {camps.map((camp) => (
                <tr key={camp._id}>
                  <td className="border px-4 py-2 text-left">{camp.CampName}</td>
                  <td className="border px-4 py-2 text-left">${camp.campFees}</td>
                  <td className="border px-4 py-2 text-left">{camp.paymentStatus || "Unpaid"}</td>
                  <td className="border px-4 py-2 text-left">{camp.confirmationStatus || "Pending"}</td>
                  <td className="border px-4 py-2 text-left">
                    {camp.paymentStatus !== "Paid" && (
                      <button
                        className="bg-green-500 text-white px-4 py-2 rounded"
                        onClick={() => setSelectedCamp(camp)}
                      >
                        Pay
                      </button>
                    )}
                    {camp.paymentStatus === "Paid" && (
                      <>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded" disabled>
                          Paid
                        </button>
                        <button
  className="bg-yellow-500 text-white px-4 py-2 rounded"
  onClick={() => {
    setSelectedCamp(camp); // Set the selected camp
    setIsFeedbackModalOpen(true); // Open feedback modal
  }}
>
  Feedback
</button>
                      </>
                    )}
                    <button
                      className={`bg-red-500 text-white px-4 py-2 rounded ${
                        camp.paymentStatus === "Paid" ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      onClick={() => handleCancel(camp._id)}
                      disabled={camp.paymentStatus === "Paid"}
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
      {/* Feedback Modal */}
      {isFeedbackModalOpen && selectedCamp && (
  <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
    <div className="bg-white p-6 rounded-lg w-96">
      <h3 className="text-xl font-bold mb-4">
        Submit Feedback for {selectedCamp.CampName}
      </h3>
      <textarea
        className="w-full p-2 border rounded"
        placeholder="Write your feedback..."
        value={feedbackText}
        onChange={(e) => setFeedbackText(e.target.value)}
      />
      <div className="mt-2">
        <label>Rating:</label>
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="w-16 p-2 border rounded"
        />
      </div>
      <button
        onClick={() => handleSubmitFeedback(selectedCamp._id)} // Pass camp ID to the function
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Submit Feedback
      </button>
      <button
        onClick={() => setIsFeedbackModalOpen(false)}
        className="mt-2 bg-gray-500 text-white px-4 py-2 rounded"
      >
        Close
      </button>
    </div>
  </div>
)}
    </Elements>
  );
};

const PaymentForm = ({ camp, onSuccess }) => {
  const {user} = useAuth();
  const stripe = useStripe();
  const elements = useElements();

  const handlePay = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ price: camp.campFees }),
      });
  
      const data = await response.json();
      if (!data.clientSecret) {
        console.error("No client secret returned from backend:", data);
        return;
      }
  
      const clientSecret = data.clientSecret;
  
      const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: "Customer Name",
          },
        },
      });
  
      if (error) {
        console.error("Payment failed:", error.message);
        toast.error("Payment failed: " + error.message);
      } else {
        console.log("Payment successful:", paymentIntent);
        toast.success("Payment successful!");
        
        const paymentData = {
          transactionId: paymentIntent.id,
          amount: camp.campFees,
          campId: camp._id,
          CampName: camp.CampName,
          userEmail: user.email, // Replace with actual user email if needed
          status: paymentIntent.status, // 'succeeded' or other status
        };
        try {
          const paymentResponse = await axios.post("http://localhost:5000/payments", paymentData);
          console.log("Payment saved to the database:", paymentResponse.data);
          onSuccess(paymentIntent.id); // Call onSuccess with the transaction ID
        } catch (error) {
          console.error("Error saving payment to database:", error);
          toast.error("Failed to save payment information.");
        }
      }
    } catch (err) {
      console.error("Error during payment:", err.message);
      toast.error("Error during payment: " + err.message);
    }
  };
  
  return (
    <form onSubmit={handlePay}>
      <h3 className="text-xl font-bold mb-2">Pay for {camp.CampName}</h3>
      <CardElement className="mb-4 p-2 border rounded" />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
        disabled={!stripe || !elements}
      >
        Confirm Payment
      </button>
    </form>
  );
};

export default RegisteredCamps;
