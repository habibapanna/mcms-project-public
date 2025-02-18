import React, { useEffect, useState } from 'react';
import BannerSection from './BannerSection/BannerSection';
import PopularCamps from '../../../components/PopularCamps/PopularCamps';
import CampFinder from '../../../components/CampFinder/CampFinder';
import { AwesomeButton } from "react-awesome-button";
import { motion } from "framer-motion";
import "react-awesome-button/dist/styles.css";
import { Link } from 'react-router-dom';
import Newsletter from '../../../components/Newsletter/Newsletter';
import UpcomingEvents from '../../../components/UpcomingEvents/UpcomingEvents';

const Home = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await fetch("https://mcms-project-server.vercel.app/feedback"); // Replace with your actual API URL
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

     // Animation Variants
     const animationVariants = {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0 },
    };

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
      <UpcomingEvents></UpcomingEvents>
<Newsletter></Newsletter>
{/* Animated Section */}
<motion.div
        className="mt-16 mb-10 p-10 bg-teal-500 text-white rounded-lg shadow-lg text-center"
        initial="hidden"
        whileInView="visible"
        variants={animationVariants}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="text-3xl font-bold mb-4">
          Empowering Health Awareness, One Camp at a Time!
        </h2>
        <p className="mb-6 text-lg">
          Join hands with us to create a healthier community. Explore our
          exclusive camps and take a step towards making a difference.
        </p>
        <AwesomeButton
          type="primary"
          action={() => window.scrollTo(0, 0)}
          size="large"
        >
          <Link to="/available-camps">Discover More</Link>
          
        </AwesomeButton>
      </motion.div>

    </div>
  );
};

export default Home;
