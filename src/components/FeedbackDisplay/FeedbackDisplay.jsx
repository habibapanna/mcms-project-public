import { useEffect, useState } from "react";


const FeedbackDisplay = ({ campId }) => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/get-feedback/${campId}`)
      .then((response) => response.json())
      .then((data) => setFeedbacks(data))
      .catch((error) => console.error('Error fetching feedback:', error));
  }, [campId]);

  return (
    <div>
      <h3>Feedback and Ratings</h3>
      {feedbacks.length === 0 ? (
        <p>No feedback yet.</p>
      ) : (
        feedbacks.map((feedback) => (
          <div key={feedback._id}>
            <p>Rating: {feedback.rating}</p>
            <p>{feedback.feedbackText}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default FeedbackDisplay;
