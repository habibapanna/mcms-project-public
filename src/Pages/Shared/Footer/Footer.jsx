import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 mt- text-white py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
        {/* Column 1: About */}
        <div>
          <h3 className="text-xl flex flex-row items-center font-semibold gap-2">
            <img
              className="w-10 h-10 rounded-full border-2 border-white shadow-lg"
              src="https://i.postimg.cc/qMctjC1W/download-24.jpg"
              alt="Logo"
            />
            About MCMS
          </h3>
          <p className="text-sm mt-2 w-2/3">
            MCMS is a platform dedicated to organizing and managing medical
            camps effortlessly for organizers and participants. Join us to
            improve healthcare access and make a positive impact on the
            community.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="/available-camps" className="hover:underline">
                Available Camps
              </a>
            </li>
            <li>
              <a href="/" className="hover:underline">
                Dashboard
              </a>
            </li>
            <li>
              <a href="/about" className="hover:underline">
                Join Us
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3: Contact Information */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center">
              <FaEnvelope className="mr-2" />
              <a href="mailto:habibapanna@gmail.com" className="hover:underline">
                habibapanna@gmail.com
              </a>
            </li>
            <li className="flex items-center">
              <FaPhoneAlt className="mr-2" />
              +880 1234 567 890
            </li>
            <li className="flex items-center">
              <FaMapMarkerAlt className="mr-2" />
              Dhaka, Bangladesh
            </li>
            {/* Social Icons */}
            <div className="flex space-x-4 mt-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-400"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-200"
              >
                <FaTwitter />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:text-blue-500"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-8 border-t border-gray-600 pt-4 text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} Medical Camp Management System. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
