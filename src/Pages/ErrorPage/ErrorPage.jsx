import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";


const ErrorPage = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-white text-center">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-6">Oops! The page you are looking for does not exist.</p>
        <Link to="/">
          <button variant="default" className="px-6 py-2 bg-teal-500 text-white hover:bg-teal-600">
            Go Back Home
          </button>
        </Link>
      </motion.div>
      <motion.img
        src="https://i.postimg.cc/vHJ1YTXM/pexels-ann-h-45017-1888015.jpg"
        alt="Error Illustration"
        className="mt-8 w-56 h-56 rounded-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      />
    </div>
  );
};

export default ErrorPage;
