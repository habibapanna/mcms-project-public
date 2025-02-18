import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const AboutUs = () => {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (!formData.name || !formData.email || !formData.message) {
        toast.error("Please fill out all fields!");
        return;
      }
  
      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    };
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
        <Toaster />
      {/* Hero Section */}
      <section className="text-center">
        <h1 className="text-4xl font-bold text-black">About Us</h1>
        <p className="text-lg text-gray-600 mt-3">
          Welcome to <span className="tracking-wide font-bold">
              <span className="text-yellow-400">M</span>
              <span className="text-blue-600">C</span>
              <span className="text-green-600">M</span>
              <span className="text-pink-500">S</span>
            </span> – your go-to platform for managing and discovering amazing camps! We are dedicated to providing an intuitive and seamless experience for both organizers and participants.
        </p>
      </section>

      {/* Mission & Vision */}
      <section className="mt-12 grid md:grid-cols-2 gap-8">
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-teal-500">Our Mission</h2>
          <p className="text-gray-700 mt-2">
            To bridge the gap between camp organizers and adventure enthusiasts by offering an efficient, user-friendly platform for discovering, booking, and managing camps.
          </p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-teal-500">Our Vision</h2>
          <p className="text-gray-700 mt-2">
            To be the leading camp management system that fosters exploration, learning, and community-building through well-organized camps.
          </p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="mt-12">
        <h2 className="text-3xl font-bold text-center text-teal-500">Get in Touch</h2>
        <p className="text-gray-600 text-center mt-2">Have questions or feedback? Contact us instantly.</p>
        
        <form onSubmit={handleSubmit} className="mt-6 max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Your Name</label>
            <input type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Your Email</label>
            <input type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Your Message</label>
            <textarea name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your message here..." className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none h-32"></textarea>
          </div>
          <button className="w-full bg-teal-600 text-white font-semibold py-3 rounded-lg hover:bg-teal-700 transition duration-300">
            Send Message
          </button>
        </form>
      </section>
    </div>
  );
};

export default AboutUs;
