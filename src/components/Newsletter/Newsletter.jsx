import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Newsletter = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter a valid email.');
      return;
    }
    toast.success(`Subscribed with: ${email}`);
    setEmail('');
  };

  return (
    <div className="my-12 px-4 md:px-12 p-8 rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-6">Subscribe to Our Newsletter</h2>
      <form onSubmit={handleSubmit} className="flex justify-center items-center">
        <input
          type="email"
          className="px-4 py-2 border border-gray-400 rounded-l"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-r">
          Subscribe
        </button>
      </form>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Newsletter;
