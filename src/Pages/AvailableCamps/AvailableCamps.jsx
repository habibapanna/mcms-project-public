import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AvailableCamps = () => {
  const [camps, setCamps] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortCriteria, setSortCriteria] = useState("");

  useEffect(() => {
    // Fetch camps from your API or database
    fetch("http://localhost:5000/available-camps")
      .then((response) => response.json())
      .then((data) => setCamps(data))
      .catch((error) => console.error("Error fetching camps:", error));
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (criteria) => {
    setSortCriteria(criteria);
    let sortedCamps = [...camps];

    if (criteria === "Most Registered") {
      sortedCamps.sort((a, b) => b.participantCount - a.participantCount);
    } else if (criteria === "Camp Fees") {
      sortedCamps.sort((a, b) => a.fees - b.fees);
    } else if (criteria === "Alphabetical Order") {
      sortedCamps.sort((a, b) => a.name.localeCompare(b.name));
    }

    setCamps(sortedCamps);
  };

  const filteredCamps = camps.filter(
    (camp) =>
      camp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      camp.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      camp.date.includes(searchTerm)
  );

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search camps..."
          value={searchTerm}
          onChange={handleSearch}
          style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc", flex: 1 }}
        />
        <select
          onChange={(e) => handleSort(e.target.value)}
          style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
        >
          <option value="">Sort by</option>
          <option value="Most Registered">Most Registered</option>
          <option value="Camp Fees">Camp Fees</option>
          <option value="Alphabetical Order">Alphabetical Order</option>
        </select>
      </div>

      <div className="grid grid-cols-3 gap-5">
        {filteredCamps.map((camp) => (
          <div
            className="border shadow-xl rounded-2xl p-5"
            key={camp.name}
            style={{
              height: "500px", // Set the card height to be consistent
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between", // Distribute space evenly
            }}
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
              <p>
                <strong>Date & Time:</strong> {camp.date}
              </p>
              <p>
                <strong>Location:</strong> {camp.location}
              </p>
              <p>
                <strong>Healthcare Professional:</strong> {camp.healthcareProfessional}
              </p>
              <p>
                <strong>Participants:</strong> {camp.participantCount}
              </p>
              <p style={{ fontSize: "14px", color: "#555" }}>{camp.description}</p>
            </div>
            <Link
              className="btn w-full mt-5 bg-blue-500 text-white hover:bg-blue-600"
              to={`/camps/${camp.name}`}
            >
              Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableCamps;
