import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FeedbackForm = ({ campId, participantId }) => {
  const [rating, setRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState("");

  const handleSubmit = () => {
    // Validate fields
    if (!rating || rating < 1 || rating > 5) {
      toast.error("Please provide a valid rating between 1 and 5.");
      return;
    }
    if (!feedbackText.trim()) {
      toast.error("Feedback text cannot be empty.");
      return;
    }

    // Submit feedback
    fetch("http://localhost:5000/submit-feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ campId, participantId, rating, feedbackText }),
    })
      .then((response) => response.json())
      .then(() => toast.success("Feedback submitted successfully!"))
      .catch((error) => {
        console.error("Error submitting feedback:", error);
        toast.error("An error occurred. Please try again.");
      });
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mx-4 sm:mx-auto sm:max-w-md md:max-w-lg border border-gray-200">
      <ToastContainer />
      <h3 className="text-xl md:text-2xl font-bold text-teal-600 mb-4 text-center">
        Provide Feedback
      </h3>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">
          Rating (1 to 5):
        </label>
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
          placeholder="Enter your rating"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Feedback:</label>
        <textarea
          value={feedbackText}
          onChange={(e) => setFeedbackText(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
          rows="4"
          placeholder="Write your feedback here..."
        />
      </div>
      <button
        onClick={handleSubmit}
        className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
      >
        Submit Feedback
      </button>
    </div>
  );
};

export default FeedbackForm;
