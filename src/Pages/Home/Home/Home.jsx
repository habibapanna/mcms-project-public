import React, { useEffect, useState } from 'react';
import BannerSection from './BannerSection/BannerSection';
import PopularCamps from '../../../components/PopularCamps/PopularCamps';
import CampFinder from '../../../components/CampFinder/CampFinder';

const Home = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await fetch("http://localhost:5000/feedback"); // Replace with your actual API URL
        const data = await response.json();
        setFeedbacks(data);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading feedback...</div>;
  }

  return (
    <div>
      <BannerSection />
      <PopularCamps />
      <CampFinder />
      <div className="my-12 px-4 md:px-12">
        <h2 className="text-3xl font-bold text-center mb-8">Feedback from Participants</h2>
        {feedbacks.length === 0 ? (
          <p className="text-center text-gray-500">No feedback available yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {feedbacks.map((feedback) => (
              <div
                key={feedback._id}
                className="bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300"
              >
                <p className="text-sm text-gray-500 mb-2">
                  <strong>Camp ID:</strong> {feedback.campId}
                </p>
                <p className="text-lg font-semibold text-gray-800 mb-2">
                  {feedback.feedbackText}
                </p>
                <p className="text-yellow-500 font-bold">
                  Rating: {feedback.rating} / 5
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
