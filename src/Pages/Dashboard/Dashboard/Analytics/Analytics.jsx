import axios from "axios";
import { useEffect, useState } from "react";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const Analytics = () => {
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const response = await axios.get('https://mcms-project-server.vercel.app/participants');
        console.log(response.data); // Log to inspect the data structure
        setParticipants(response.data);
      } catch (error) {
        console.error('Error fetching participants:', error);
        setError('Failed to fetch participant data');
      } finally {
        setLoading(false);
      }
    };

    fetchParticipants();
  }, []);

  // Aggregate camp data
  const campData = participants.reduce((acc, participant) => {
    const { CampName, campFees } = participant;

    // Check if the camp already exists in the accumulator
    if (acc[CampName]) {
      acc[CampName].count += 1;
      acc[CampName].totalFee += campFees; // Adding campFees
    } else {
      acc[CampName] = { count: 1, totalFee: campFees }; // First time encountering this camp
    }

    return acc;
  }, {});

  // Prepare the chart data
  const chartData = Object.keys(campData).map(campName => ({
    name: campName,
    value: campData[campName].totalFee, // You can use totalFee or count based on what you want
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF4040'];

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center sm:text-4xl">
        Analytics - Participant's Camp Registrations
      </h2>

      {loading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : participants.length === 0 ? (
        <div className="text-center text-gray-500">No participants registered yet.</div>
      ) : (
        <div className="bg-white shadow-md rounded-lg p-6 sm:p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4 sm:text-3xl">Camp Registration Fees</h3>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                outerRadius="80%"
                fill="#8884d8"
                label
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default Analytics;
