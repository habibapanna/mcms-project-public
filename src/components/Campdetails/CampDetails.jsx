import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import { toast } from 'react-toastify';

const CampDetails = () => {
  const { id } = useParams();
  const {user} = useContext(AuthContext)
  const [camp, setCamp] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [participant, setParticipant] = useState({
    name: user?.displayName || "",  // Ensure these values are set
    email: user?.email || "",
    CampName: "",
    campFees: "",
    location: "",
    age: "",
    phone: "",
    gender: "",
    emergencyContact: "",
  });

  useEffect(() => {
    fetch(`http://localhost:5000/camps/${id}`)
        .then((response) => response.json())
        .then((data) => {
            setCamp(data);
            // Update participant state with camp details
            setParticipant((prevParticipant) => ({
                ...prevParticipant,
                CampName: data.campName || "",
                campFees: data.campFees || "",
                location: data.location || "",
            }));
        })
        .catch((error) => console.error("Error fetching camp details:", error));
}, [id]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setParticipant({ ...participant, [name]: value });
  };

  const handleSubmit = () => {
    // Add campId to the participant data
    const participantWithCampId = { ...participant, campId: id };

    // Save participant registration info to database
    fetch("http://localhost:5000/participants", { 
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(participantWithCampId),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'Registration successful') {
            setCamp({ ...camp, participantCount: camp.participantCount + 1 });  // Update participant count
            setModalOpen(false);  // Close the modal
            toast.success('Registration successful! You have joined the camp.');
        } else {
            toast.error(data.message || 'Error registering participant. Please try again.');
        }
      })
      .catch((error) => {
        toast.error('Error registering participant. Please try again.');
        console.error("Error registering participant:", error);
      });
  };

  return (
    <div className="p-5">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8">
        {/* Left Side: Image */}
        <div className="flex justify-center md:w-1/2 bg-gray-100 rounded-lg shadow-lg overflow-hidden">
          <img
            src={camp.image}
            alt={camp.campName}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side: Camp Details */}
        <div className="md:w-1/2 flex flex-col justify-between space-y-5 p-4">
          <h2 className="text-3xl font-semibold text-gray-800">{camp.campName}</h2>
          <p><strong className="text-gray-600">Camp Fees:</strong> ${camp.campFees}</p>
          <p><strong className="text-gray-600">Date & Time:</strong> {camp.dateTime}</p>
          <p><strong className="text-gray-600">Location:</strong> {camp.location}</p>
          <p><strong className="text-gray-600">Healthcare Professional:</strong> {camp.healthcareProfessional}</p>
          <p><strong className="text-gray-600">Participants:</strong> {camp.participantCount}</p>
          <p className="text-gray-700"><strong>Description:</strong> {camp.description}</p>

          <button
            className="btn bg-teal-500 text-white hover:bg-teal-600 py-2 px-6 rounded-lg shadow-md mt-4 transition ease-in-out duration-300"
            onClick={() => setModalOpen(true)}
          >
            Join Camp
          </button>
        </div>
      </div>

      {/* Modal for Participant Registration */}
      {modalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-semibold mb-4">Register for {camp.campName}</h3>
            <form>
              <div className="mb-4">
                <label className="block font-semibold">Camp Name</label>
                <input
                  type="text"
                  value={camp.campName}
                  readOnly
                  className="w-full p-2 border rounded-md bg-gray-100"
                />
              </div>
              <div className="mb-4">
                <label className="block font-semibold">Camp Fees</label>
                <input
                  type="text"
                  value={`$${camp.campFees}`}
                  readOnly
                  className="w-full p-2 border rounded-md bg-gray-100"
                />
              </div>
              <div className="mb-4">
                <label className="block font-semibold">Location</label>
                <input
                  type="text"
                  value={camp.location}
                  readOnly
                  className="w-full p-2 border rounded-md bg-gray-100"
                />
              </div>
              <div className="mb-4">
                <label className="block font-semibold">Healthcare Professional</label>
                <input
                  type="text"
                  value={camp.healthcareProfessional}
                  readOnly
                  className="w-full p-2 border rounded-md bg-gray-100"
                />
              </div>
              <div className="mb-4">
                <label className="block font-semibold">Participant Name</label>
                <input
                  type="text"
                  value={user?.displayName || ""}
                  readOnly
                  className="w-full p-2 border rounded-md bg-gray-100"
                />
              </div>
              <div className="mb-4">
                <label className="block font-semibold">Participant Email</label>
                <input
                  type="email"
                  value={user?.email || ""}
                  readOnly
                  className="w-full p-2 border rounded-md bg-gray-100"
                />
              </div>
              <div className="mb-4">
                <label className="block font-semibold">Age</label>
                <input
                  type="number"
                  name="age"
                  value={participant.age}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block font-semibold">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  value={participant.phone}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block font-semibold">Gender</label>
                <select
                  name="gender"
                  value={participant.gender}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block font-semibold">Emergency Contact</label>
                <input
                  type="text"
                  name="emergencyContact"
                  value={participant.emergencyContact}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="bg-teal-500 text-white py-2 px-6 hover:bg-teal-600 rounded-lg mt-4"
                  onClick={handleSubmit}
                >
                  Register
                </button>
                <button
                  type="button"
                  className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-6 rounded-lg mt-4"
                  onClick={() => setModalOpen(false)}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampDetails;
