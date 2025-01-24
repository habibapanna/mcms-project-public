import React, { useEffect, useState } from 'react';

const CampFinder = () => {
  const [camps, setCamps] = useState([]);
  const [filteredCamps, setFilteredCamps] = useState([]);
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const [feeRange, setFeeRange] = useState([0, 1000]);

  useEffect(() => {
    // Fetch all camps from the backend
    fetch('https://mcms-project-server.vercel.app/camps')
      .then((res) => res.json())
      .then((data) => {
        setCamps(data);
        setFilteredCamps(data); // Default to showing all camps
      })
      .catch((err) => console.error('Error fetching camps:', err));
  }, []);

  // Handle filters
  const handleFilter = () => {
    let result = camps;

    if (search) {
      result = result.filter((camp) =>
        camp.campName.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (location) {
      result = result.filter((camp) => camp.location === location);
    }
    result = result.filter(
      (camp) => camp.campFees >= feeRange[0] && camp.campFees <= feeRange[1]
    );

    setFilteredCamps(result);
  };

  useEffect(() => {
    handleFilter();
  }, [search, location, feeRange]); // Trigger filter when any input changes

  return (
    <section className="my-12 px-6">
      <h2 className="text-3xl font-bold text-center mb-8">Find Your Perfect Camp</h2>

      {/* Search and Filters */}
      <div className="flex flex-wrap gap-4 mb-8 justify-center">
        <input
          type="text"
          placeholder="Search by camp name"
          className="border rounded px-4 py-2 w-full sm:w-72"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border rounded px-4 py-2 w-full sm:w-48"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        >
          <option value="">Select Location</option>
          <option value="Dhaka">Dhaka</option>
          <option value="Chittagong">Chittagong</option>
          <option value="Sylhet">Sylhet</option>
        </select>
        <div className="flex items-center gap-2">
          <span>Fees:</span>
          <input
            type="number"
            placeholder="Min"
            className="border rounded px-2 py-1 w-20"
            value={feeRange[0]}
            onChange={(e) =>
              setFeeRange([Number(e.target.value), feeRange[1]])
            }
          />
          <span>-</span>
          <input
            type="number"
            placeholder="Max"
            className="border rounded px-2 py-1 w-20"
            value={feeRange[1]}
            onChange={(e) =>
              setFeeRange([feeRange[0], Number(e.target.value)])
            }
          />
        </div>
      </div>

      {/* Camp Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredCamps.map((camp) => (
          <div
            key={camp._id}
            className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition duration-300"
          >
            <img
              src={camp.image}
              alt={camp.campName}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">{camp.campName}</h3>
            <p className="text-gray-600 mb-2">Location: {camp.location}</p>
            <p className="text-gray-600 mb-2">Fees: ${camp.campFees.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CampFinder;
