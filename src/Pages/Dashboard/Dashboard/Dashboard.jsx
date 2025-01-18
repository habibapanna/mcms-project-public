import { Link, Outlet, NavLink } from "react-router-dom";
import { FaUser, FaPlus, FaClipboardList, FaRegListAlt, FaBars, FaHome, FaCampground, FaEnvelope } from "react-icons/fa"; // Import icons

const Dashboard = ({ isOrganizer }) => { // Make sure to pass `isOrganizer` as a prop
  return (
    <div className="dashboard-layout min-h-screen flex flex-col sm:flex-row max-w-6xl mx-auto">
      {/* Sidebar Navigation Bar */}
      <nav className="bg-blue-600 text-white w-full sm:w-64 p-4 shadow-md sm:static sm:h-auto fixed top-0 left-0 sm:translate-x-0 transform transition-transform ease-in-out duration-300">
        {/* Hamburger Icon for mobile */}
        <div className="sm:hidden flex justify-end mb-4">
          <button className="text-2xl">
            <FaBars />
          </button>
        </div>

        {/* Organizer or Participant Navigation */}
        <ul className="space-y-6">
          {isOrganizer ? (
            <>
              <li className="flex items-center">
                <FaUser className="mr-3" />
                <NavLink
                  to="organizer-profile"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-white rounded px-4 py-2 transition-colors text-black"
                      : "hover:bg-blue-700 rounded px-4 py-2 transition-colors"
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
                      ? "bg-white rounded px-4 py-2 transition-colors text-black"
                      : "hover:bg-blue-700 rounded px-4 py-2 transition-colors"
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
                      ? "bg-white rounded px-4 py-2 transition-colors text-black"
                      : "hover:bg-blue-700 rounded px-4 py-2 transition-colors"
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
                      ? "bg-white rounded px-4 py-2 transition-colors text-black"
                      : "hover:bg-blue-700 rounded px-4 py-2 transition-colors"
                  }
                >
                  Manage Registered Camps
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
                      ? "bg-white rounded px-4 py-2 transition-colors text-black"
                      : "hover:bg-blue-700 rounded px-4 py-2 transition-colors"
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
                      ? "bg-white rounded px-4 py-2 transition-colors text-black"
                      : "hover:bg-blue-700 rounded px-4 py-2 transition-colors"
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
                      ? "bg-white rounded px-4 py-2 transition-colors text-black"
                      : "hover:bg-blue-700 rounded px-4 py-2 transition-colors"
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
                      ? "bg-white rounded px-4 py-2 transition-colors text-black"
                      : "hover:bg-blue-700 rounded px-4 py-2 transition-colors"
                  }
                >
                  Payment History
                </NavLink>
              </li>

{/* <li className="flex items-center">
                <FaUser className="mr-3" />
                <NavLink
                  to="organizer-profile"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-white rounded px-4 py-2 transition-colors text-black"
                      : "hover:bg-blue-700 rounded px-4 py-2 transition-colors"
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
                      ? "bg-white rounded px-4 py-2 transition-colors text-black"
                      : "hover:bg-blue-700 rounded px-4 py-2 transition-colors"
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
                      ? "bg-white rounded px-4 py-2 transition-colors text-black"
                      : "hover:bg-blue-700 rounded px-4 py-2 transition-colors"
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
                      ? "bg-white rounded px-4 py-2 transition-colors text-black"
                      : "hover:bg-blue-700 rounded px-4 py-2 transition-colors"
                  }
                >
                  Manage Registered Camps
                </NavLink>
              </li> */}

              
            </>
          )}
        </ul>

        {/* Divider */}
        <hr className="border-t border-blue-500 my-6" />

        {/* Shared Routes */}
        <ul className="space-y-6">
          <li className="flex items-center">
            <FaHome className="mr-3" />
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "bg-blue-800 rounded px-4 py-2 transition-colors text-white"
                  : "hover:bg-blue-700 rounded px-4 py-2 transition-colors"
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
                  ? "bg-blue-800 rounded px-4 py-2 transition-colors text-white"
                  : "hover:bg-blue-700 rounded px-4 py-2 transition-colors"
              }
            >
              Available Camps
            </NavLink>
          </li>
          <li className="flex items-center">
            <FaEnvelope className="mr-3" />
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "bg-blue-800 rounded px-4 py-2 transition-colors text-white"
                  : "hover:bg-blue-700 rounded px-4 py-2 transition-colors"
              }
            >
              Contact
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Dashboard Content */}
      <div className="dashboard-content flex-1 p-4 sm:p-6 max-w-5xl mx-auto w-full">
        <h1 className="text-2xl font-bold text-gray-700 mb-4 text-center">
          {isOrganizer ? "Organizer Dashboard" : "Participant Dashboard"}
        </h1>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
