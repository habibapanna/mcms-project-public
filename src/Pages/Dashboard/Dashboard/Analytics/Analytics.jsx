import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from "recharts";

const Analytics = ({ participantId }) => {
  const [campData, setCampData] = useState([]);

  useEffect(() => {
    // Fetch registered camp data for the participant
    const fetchCampData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/registered-camps/${participantId}`);
        const data = await response.json();
        setCampData(data);
      } catch (error) {
        console.error("Error fetching camp data:", error);
      }
    };

    fetchCampData();
  }, [participantId]);

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-center">Analytics</h1>
      <div className="w-full h-96 bg-white shadow-md rounded-lg p-4">
        {campData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={campData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="campName" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="fees" fill="#8884d8" name="Fees (USD)" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-center text-gray-500">No analytics data available.</p>
        )}
      </div>
    </div>
  );
};

export default Analytics;
