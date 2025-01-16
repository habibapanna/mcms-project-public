import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSpring, animated } from "react-spring";

const AvailableCamps = () => {
  const [camps, setCamps] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortCriteria, setSortCriteria] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/available-camps")
      .then((response) => response.json())
      .then((data) => setCamps(data))
      .catch((error) => console.error("Error fetching camps:", error));
  }, []);

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const handleSort = (criteria) => {
    setSortCriteria(criteria);
    let sortedCamps = [...camps];

    if (criteria === "Most Registered") {
      sortedCamps.sort((a, b) => b.participantCount - a.participantCount);
    } else if (criteria === "Camp Fees") {
      sortedCamps.sort((a, b) => a.campFees - b.campFees);
    } else if (criteria === "Alphabetical Order") {
      sortedCamps.sort((a, b) => a.campName.localeCompare(b.campName));
    }

    setCamps(sortedCamps);
  };

  const filteredCamps = camps.filter(
    (camp) =>
      camp.campName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      camp.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      camp.dateTime.includes(searchTerm)
  );

  const cardAnimation = useSpring({
    opacity: 1,
    transform: "scale(1)",
    from: { opacity: 0, transform: "scale(0.8)" },
    config: { tension: 170, friction: 26 },
  });

  return (
    <div className="p-5 md:p-10">
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Search camps..."
          value={searchTerm}
          onChange={handleSearch}
          className="p-3 border border-gray-300 rounded-lg flex-1"
        />
        <select
          onChange={(e) => handleSort(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg"
        >
          <option value="">Sort by</option>
          <option value="Most Registered">Most Registered</option>
          <option value="Camp Fees">Camp Fees</option>
          <option value="Alphabetical Order">Alphabetical Order</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCamps.map((camp) => (
          <animated.div
            key={camp.campName}
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
                  <strong>Healthcare Professional:</strong> {camp.healthcareProfessional}
                </p>
                <p className="text-sm">
                  <strong>Participants:</strong> {camp.participantCount}
                </p>
                <p className="text-sm text-gray-600 mt-2">{camp.description}</p>
              </div>
              <Link
                className="mt-5 bg-teal-500 text-white text-center py-2 rounded-lg hover:bg-teal-600"
                to={`/camps/${camp.campName}`}
              >
                Details
              </Link>
            </div>
          </animated.div>
        ))}
      </div>
    </div>
  );
};

export default AvailableCamps;
