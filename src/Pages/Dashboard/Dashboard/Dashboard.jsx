import { Outlet, NavLink } from "react-router-dom";
import {
  FaRegListAlt,
  FaBars,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import useOrganizer from "../../../hooks/useOrganizer";
import { HiOutlineUser } from "react-icons/hi";
import { IoAddOutline } from "react-icons/io5";
import { LiaClipboardListSolid } from "react-icons/lia";
import { HiOutlineUsers } from "react-icons/hi2";
import { TbBrandCampaignmonitor } from "react-icons/tb";
import { BsEnvelope, BsMoon, BsSun } from "react-icons/bs";
import { AiOutlineHome } from "react-icons/ai";
import { PiCashRegisterLight } from "react-icons/pi";
const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );
const [isOrganizer] = useOrganizer();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("darkMode", !isDarkMode);
  };

  return (
    <div className={`flex flex-col min-h-screen max-w-7xl mx-auto ${isDarkMode ? "bg-black text-white" : "bg-white text-black"}`}>
        {/* Dark Mode Toggle Button */}
        <div className="absolute top-4 right-16">
        <button onClick={toggleDarkMode} className="text-xl p-2 hover:bg-teal-600 rounded-full border border-teal-500 dark:bg-black">
          {isDarkMode ? <BsSun className="text-yellow-400" /> : <BsMoon className="text-teal-500 hover:text-teal-100" />}
        </button>
      </div>
      {/* Sidebar Navigation */}
      <div
        className={`fixed inset-y-0 overflow-x-auto left-0 bg-teal-600 text-white p-4 w-64 z-50 transform ${
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
                <HiOutlineUser className="mr-3" />
                <NavLink
                  to="organizer-profile"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-white rounded px-4 py-2 text-black"
                      : "hover:bg-teal-700 rounded px-4 py-2"
                  }
                >
                  Organizer Profile
                </NavLink>
              </li>
              <li className="flex items-center">
                <IoAddOutline className="mr-3" />
                <NavLink
                  to="add-camp"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-white rounded px-4 py-2 text-black"
                      : "hover:bg-teal-700 rounded px-4 py-2"
                  }
                >
                  Add A Camp
                </NavLink>
              </li>
              <li className="flex items-center">
                <LiaClipboardListSolid className="mr-3" />
                <NavLink
                  to="manage-camps"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-white rounded px-4 py-2 text-black"
                      : "hover:bg-teal-700 rounded px-4 py-2"
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
                      : "hover:bg-teal-700 rounded px-4 py-2"
                  }
                >
                  Manage Registered Camps
                </NavLink>
              </li>
              <li className="flex items-center">
                <HiOutlineUsers className="mr-3" />
                <NavLink
                  to="all-user"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-white rounded px-4 py-2 text-black"
                      : "hover:bg-teal-700 rounded px-4 py-2"
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
                      : "hover:bg-teal-700 rounded px-4 py-2"
                  }
                >
                  Analytics
                </NavLink>
              </li>
              <li className="flex items-center">
                <HiOutlineUser className="mr-3" />
                <NavLink
                  to="participant-profile"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-white rounded px-4 py-2 text-black"
                      : "hover:bg-teal-700 rounded px-4 py-2"
                  }
                >
                  Participant Profile
                </NavLink>
              </li>
              <li className="flex items-center">
                <PiCashRegisterLight className="mr-3" />
                <NavLink
                  to="registered-camps"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-white rounded px-4 py-2 text-black"
                      : "hover:bg-teal-700 rounded px-4 py-2"
                  }
                >
                  Registered Camps
                </NavLink>
              </li>
              <li className="flex items-center">
                <LiaClipboardListSolid className="mr-3" />
                <NavLink
                  to="payment-history"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-white rounded px-4 py-2 text-black"
                      : "hover:bg-teal-700 rounded px-4 py-2"
                  }
                >
                  Payment History
                </NavLink>
              </li>
            </>
          )}
        </ul>

        <hr className="border-t border-white my-6" />

        {/* Shared Routes */}
        <ul className="space-y-6">
          <li className="flex items-center">
            <AiOutlineHome className="mr-3" />
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "bg-teal-800 rounded px-4 py-2 text-white"
                  : "hover:bg-teal-700 rounded px-4 py-2"
              }
            >
              Home
            </NavLink>
          </li>
          <li className="flex items-center">
            <TbBrandCampaignmonitor className="mr-3" />
            <NavLink
              to="/available-camps"
              className={({ isActive }) =>
                isActive
                  ? "bg-teal-800 rounded px-4 py-2 text-white"
                  : "hover:bg-teal-700 rounded px-4 py-2"
              }
            >
              Available Camps
            </NavLink>
          </li>
          <li className="flex items-center">
            <BsEnvelope  className="mr-3" />
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "bg-teal-800 rounded px-4 py-2 text-white"
                  : "hover:bg-teal-700 rounded px-4 py-2"
              }
            >
              Contact
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-4 sm:ml-64">
        <div className="sm:hidden text-teal-600 flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">
            {isOrganizer ? "Organizer Dashboard" : "Participant Dashboard"}
          </h1>
          <button
            className="text-2xl text-teal-600 focus:outline-none"
            onClick={toggleSidebar}
          >
            <FaBars />
          </button>
        </div>
        <h1 className="text-2xl font-bold text-teal-600 mb-4 hidden text-center sm:block">
          {isOrganizer ? "Organizer Dashboard" : "Participant Dashboard"}
        </h1>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
