import { useEffect, useState } from "react";


const UpcomingCamps = () => {
  const [upcomingCamps, setUpcomingCamps] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/upcoming-camps')
      .then((response) => response.json())
      .then((data) => setUpcomingCamps(data))
      .catch((error) => console.error('Error fetching upcoming camps:', error));
  }, []);

  return (
    <div>
      <h3>Upcoming Camps</h3>
      {upcomingCamps.length === 0 ? (
        <p>No upcoming camps available.</p>
      ) : (
        upcomingCamps.map((camp) => (
          <div key={camp._id}>
            <h4>{camp.name}</h4>
            <p>{camp.date}</p>
            <button onClick={() => navigate(`/camp-details/${camp._id}`)}>View Details</button>
          </div>
        ))
      )}
    </div>
  );
};

export default UpcomingCamps;
