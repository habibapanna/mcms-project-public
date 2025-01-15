import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const PopularCamps = () => {
  const [popularCamps, setPopularCamps] = useState([]);

  useEffect(() => {
    // Fetch the popular camps (sorted by highest participant count)
    fetch("http://localhost:5000/popular-camps")
      .then((response) => response.json())
      .then((data) => setPopularCamps(data.slice(0, 6)))  // Limiting to 6 camps
      .catch((error) => console.error("Error fetching camps:", error));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2 className="text-2xl font-bold mb-5">Popular Medical Camps</h2>
      <div className="grid grid-cols-3 gap-5">
        {popularCamps.map((camp) => (
          <div
            key={camp._id}
            className="border shadow-xl rounded-2xl p-5"
            style={{ height: "500px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}
          >
            <img
              src={camp.image}
              alt={camp.name}
              style={{
                width: "100%",
                height: "150px",
                objectFit: "cover",
                borderRadius: "10px 10px 0 0",
              }}
            />
            <div>
              <h3 className="text-xl font-bold mt-2 mb-2">{camp.name}</h3>
              <p><strong>Date & Time:</strong> {camp.date}</p>
              <p><strong>Location:</strong> {camp.location}</p>
              <p><strong>Healthcare Professional:</strong> {camp.healthcareProfessional}</p>
              <p><strong>Participants:</strong> {camp.participantCount}</p>
            </div>
            <Link
              className="btn w-full mt-5 bg-blue-500 text-white hover:bg-blue-600"
              to={`/camp-details/${camp._id}`}
            >
              See Details
            </Link>
          </div>
        ))}
      </div>
      <Link to="/available-camps" className="btn mt-5 bg-green-500 text-white hover:bg-green-600">
        See All Camps
      </Link>
    </div>
  );
};

export default PopularCamps;
