import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PopularCamps = () => {
  const [popularCamps, setPopularCamps] = useState([]);

  useEffect(() => {
    // Fetch the popular camps (sorted by highest participant count)
    fetch("https://mcms-project-server.vercel.app/popular-camps")
      .then((response) => response.json())
      .then((data) => setPopularCamps(data.slice(0, 6))) // Limiting to 6 camps
      .catch((error) => console.error("Error fetching camps:", error));
  }, []);

  return (
    <div className="px-4 py-8 md:px-8 lg:px-16">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-800">
        Popular Medical Camps
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {popularCamps.map((camp) => (
          <div
            key={camp._id}
            className="border shadow-lg rounded-lg overflow-hidden flex flex-col"
          >
            <img
              src={camp.image}
              alt={camp.campName}
              className="w-full h-48 sm:h-56 object-cover"
            />
            <div className="p-4 flex-grow flex flex-col">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                {camp.campName}
              </h3>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Date & Time:</strong> {camp.dateTime}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Location:</strong> {camp.location}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Healthcare Professional:</strong>{" "}
                {camp.healthcareProfessional}
              </p>
              <p className="text-sm text-gray-600 mb-4">
                <strong>Participants:</strong> {camp.participantCount}
              </p>
              <Link
                className="mt-auto w-full bg-teal-500 text-white text-center py-2 rounded-lg hover:bg-teal-600 transition"
                to={`/camp-details/${camp._id}`}
              >
                See Details
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center">
        <Link
          to="/available-camps"
          className="inline-block bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition"
        >
          See All Camps
        </Link>
      </div>
    </div>
  );
};

export default PopularCamps;
