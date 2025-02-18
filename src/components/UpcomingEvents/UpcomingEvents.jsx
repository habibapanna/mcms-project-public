import React, { useState } from 'react';
import { motion } from 'framer-motion';

const events = [
  {
    title: 'Outdoor Adventure Camp',
    date: 'March 15, 2025',
    image: 'https://i.postimg.cc/76CY3mTS/boys-1283786-1280.jpg',
    details: 'Join us for an exciting outdoor adventure with fun activities and team challenges!'
  },
  {
    title: 'Scouting & Exploration',
    date: 'April 10, 2025',
    image: 'https://i.postimg.cc/1z3zt9mC/front-view-scouts-with-binoculars.jpg',
    details: 'Discover the wonders of nature and learn essential scouting skills in this exploration camp.'
  },
  {
    title: 'Helping Hands Initiative',
    date: 'May 5, 2025',
    image: 'https://i.postimg.cc/7brvTNgP/poor-2754335-1280.jpg',
    details: 'Make a difference by participating in our community service event to help those in need.'
  }
];

const UpcomingEvents = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  return (
    <div className="my-12 px-4 md:px-12">
      <h2 className="text-3xl font-bold text-center mb-8">Upcoming Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event, index) => (
          <motion.div
            key={index}
            className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
          >
            <img src={event.image} alt={event.title} className="w-full h-64 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{event.title}</h3>
              <p className="text-sm text-gray-500">Date: {event.date}</p>
              <button
                className="mt-4 px-4 w-full py-2 bg-teal-500 text-white rounded hover:bg-teal-600"
                onClick={() => setSelectedEvent(event)}
              >
                Details
              </button>
            </div>
          </motion.div>
        ))}
      </div>
      {selectedEvent && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4">{selectedEvent.title}</h2>
            <p className="text-gray-700 mb-4">{selectedEvent.details}</p>
            <button
              className="mt-4 px-4 py-2 bg-teal-500 w-full text-white rounded hover:bg-teal-600"
              onClick={() => setSelectedEvent(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpcomingEvents;
