import { Outlet, NavLink } from "react-router-dom";
import {
  FaUser,
  FaPlus,
  FaClipboardList,
  FaRegListAlt,
  FaBars,
  FaHome,
  FaCampground,
  FaEnvelope,
  FaUserFriends,
} from "react-icons/fa";
import { useState } from "react";
import useOrganizer from "../../../hooks/useOrganizer";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isOrganizer] = useOrganizer();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col min-h-screen max-w-6xl mx-auto">
      {/* Sidebar Navigation */}
      <div
        className={`fixed inset-y-0 left-0 bg-blue-600 text-white p-4 w-64 z-50 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        {/* Close button for mobile */}
        <div className="sm:hidden flex justify-end mb-4">
          <button
            className="text-2xl text-white focus:outline-none"
            onClick={toggleSidebar}
          >
            ✕
          </button>
        </div>

        <ul className="space-y-6">
          {isOrganizer ? (
            <>
              <li className="flex items-center">
                <FaUser className="mr-3" />
                <NavLink
                  to="organizer-profile"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-white rounded px-4 py-2 text-black"
                      : "hover:bg-blue-700 rounded px-4 py-2"
                  }
                >
                  Organizer Profile
                </NavLink>
              </li>
              <li className="flex items-center">
                <FaPlus className="mr-3" />
                <NavLink
                  to="add-camp"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-white rounded px-4 py-2 text-black"
                      : "hover:bg-blue-700 rounded px-4 py-2"
                  }
                >
                  Add A Camp
                </NavLink>
              </li>
              <li className="flex items-center">
                <FaClipboardList className="mr-3" />
                <NavLink
                  to="manage-camps"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-white rounded px-4 py-2 text-black"
                      : "hover:bg-blue-700 rounded px-4 py-2"
                  }
                >
                  Manage Camps
                </NavLink>
              </li>
              <li className="flex items-center">
                <FaRegListAlt className="mr-3" />
                <NavLink
                  to="manage-registered-camps"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-white rounded px-4 py-2 text-black"
                      : "hover:bg-blue-700 rounded px-4 py-2"
                  }
                >
                  Manage Registered Camps
                </NavLink>
              </li>
              <li className="flex items-center">
                <FaUserFriends className="mr-3" />
                <NavLink
                  to="all-user"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-white rounded px-4 py-2 text-black"
                      : "hover:bg-blue-700 rounded px-4 py-2"
                  }
                >
                  All-User
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li className="flex items-center">
                <FaRegListAlt className="mr-3" />
                <NavLink
                  to="analytics"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-white rounded px-4 py-2 text-black"
                      : "hover:bg-blue-700 rounded px-4 py-2"
                  }
                >
                  Analytics
                </NavLink>
              </li>
              <li className="flex items-center">
                <FaUser className="mr-3" />
                <NavLink
                  to="participant-profile"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-white rounded px-4 py-2 text-black"
                      : "hover:bg-blue-700 rounded px-4 py-2"
                  }
                >
                  Participant Profile
                </NavLink>
              </li>
              <li className="flex items-center">
                <FaRegListAlt className="mr-3" />
                <NavLink
                  to="registered-camps"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-white rounded px-4 py-2 text-black"
                      : "hover:bg-blue-700 rounded px-4 py-2"
                  }
                >
                  Registered Camps
                </NavLink>
              </li>
              <li className="flex items-center">
                <FaClipboardList className="mr-3" />
                <NavLink
                  to="payment-history"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-white rounded px-4 py-2 text-black"
                      : "hover:bg-blue-700 rounded px-4 py-2"
                  }
                >
                  Payment History
                </NavLink>
              </li>
            </>
          )}
        </ul>

        <hr className="border-t border-blue-500 my-6" />

        {/* Shared Routes */}
        <ul className="space-y-6">
          <li className="flex items-center">
            <FaHome className="mr-3" />
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "bg-blue-800 rounded px-4 py-2 text-white"
                  : "hover:bg-blue-700 rounded px-4 py-2"
              }
            >
              Home
            </NavLink>
          </li>
          <li className="flex items-center">
            <FaCampground className="mr-3" />
            <NavLink
              to="/available-camps"
              className={({ isActive }) =>
                isActive
                  ? "bg-blue-800 rounded px-4 py-2 text-white"
                  : "hover:bg-blue-700 rounded px-4 py-2"
              }
            >
              Available Camps
            </NavLink>
          </li>
          <li className="flex items-center">
            <FaEnvelope className="mr-3" />
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? "bg-blue-800 rounded px-4 py-2 text-white"
                  : "hover:bg-blue-700 rounded px-4 py-2"
              }
            >
              Contact
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-4 sm:ml-64">
        <div className="sm:hidden flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">
            {isOrganizer ? "Organizer Dashboard" : "Participant Dashboard"}
          </h1>
          <button
            className="text-2xl text-blue-600 focus:outline-none"
            onClick={toggleSidebar}
          >
            <FaBars />
          </button>
        </div>
        <h1 className="text-2xl font-bold text-gray-700 mb-4 hidden sm:block">
          {isOrganizer ? "Organizer Dashboard" : "Participant Dashboard"}
        </h1>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
