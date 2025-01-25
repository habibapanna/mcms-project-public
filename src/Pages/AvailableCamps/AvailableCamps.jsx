import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSpring, animated } from "react-spring";

const AvailableCamps = () => {
  const [originalCamps, setOriginalCamps] = useState([]); // Original fetched data
  const [displayedCamps, setDisplayedCamps] = useState([]); // Filtered data
  const [searchTerm, setSearchTerm] = useState("");
  const [sortCriteria, setSortCriteria] = useState("");
  const [isTwoColumn, setIsTwoColumn] = useState(false);

  // Fetch camps data on component mount
  useEffect(() => {
    fetch("https://mcms-project-server.vercel.app/available-camps")
      .then((response) => response.json())
      .then((data) => {
        setOriginalCamps(data);
        setDisplayedCamps(data); // Set both original and displayed camps initially
      })
      .catch((error) => console.error("Error fetching camps:", error));
  }, []);

  // Update displayed camps when search term or sort criteria changes
  useEffect(() => {
    let filtered = [...originalCamps];

    // Filter based on search term
    if (searchTerm) {
      filtered = filtered.filter((camp) =>
        camp.campName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort based on selected criteria
    if (sortCriteria) {
      if (sortCriteria === "Most Registered") {
        filtered.sort((a, b) => b.participantCount - a.participantCount);
      } else if (sortCriteria === "Camp Fees") {
        filtered.sort((a, b) => a.campFees - b.campFees);
      } else if (sortCriteria === "Alphabetical Order") {
        filtered.sort((a, b) => a.campName.localeCompare(b.campName));
      }
    }

    setDisplayedCamps(filtered);
  }, [searchTerm, sortCriteria, originalCamps]);

  const cardAnimation = useSpring({
    opacity: 1,
    transform: "scale(1)",
    from: { opacity: 0, transform: "scale(0.8)" },
    config: { tension: 170, friction: 26 },
  });

  return (
    <div className="p-5 md:p-10">
      {/* Search and Sort Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Search camps by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg flex-1"
        />
        <select
          onChange={(e) => setSortCriteria(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg"
        >
          <option value="">Sort by</option>
          <option value="Most Registered">Most Registered</option>
          <option value="Camp Fees">Camp Fees</option>
          <option value="Alphabetical Order">Alphabetical Order</option>
        </select>
        <button
          onClick={() => setIsTwoColumn(!isTwoColumn)}
          className="p-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
        >
          {isTwoColumn ? "Switch to Three Columns" : "Switch to Two Columns"}
        </button>
      </div>

      {/* Camps Cards */}
      <div
        className={`grid ${
          isTwoColumn ? "grid-cols-2" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        } gap-6`}
      >
        {displayedCamps.map((camp) => (
          <animated.div
            key={camp._id}
            style={cardAnimation}
            className="border shadow-xl rounded-lg overflow-hidden flex flex-col"
          >
            <img
              src={camp.image}
              alt={camp.campName}
              className="w-full h-48 object-cover"
            />
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold mb-2">{camp.campName}</h3>
                <p className="text-sm">
                  <strong>Date & Time:</strong> {camp.dateTime}
                </p>
                <p className="text-sm">
                  <strong>Location:</strong> {camp.location}
                </p>
                <p className="text-sm">
                  <strong>Healthcare Professional:</strong>{" "}
                  {camp.healthcareProfessional}
                </p>
                <p className="text-sm">
                  <strong>Participants:</strong> {camp.participantCount}
                </p>
                <p className="text-sm text-gray-600 mt-2">{camp.description}</p>
              </div>
              <Link
                className="mt-5 bg-teal-500 text-white text-center py-2 rounded-lg hover:bg-teal-600"
                to={`/camp-details/${camp._id}`}
              >
                Details
              </Link>
            </div>
          </animated.div>
        ))}
      </div>

      {/* Message when no camps match search */}
      {displayedCamps.length === 0 && (
        <div className="text-center text-gray-600 mt-10">
          No camps match your search.
        </div>
      )}
    </div>
  );
};

export default AvailableCamps;
