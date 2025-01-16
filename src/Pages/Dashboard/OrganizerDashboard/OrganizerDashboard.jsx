import { Link, Outlet } from "react-router-dom";

const OrganizerDashboard = () => {
  return (
    <div className="dashboard-layout bg-gray-100 min-h-screen flex flex-col max-w-6xl mx-auto">
      {/* Navigation Bar */}
      <nav className="bg-blue-600 text-white p-4 shadow-md">
        <ul className="flex flex-wrap justify-center gap-4 sm:justify-around">
          <li className="hover:bg-blue-700 rounded px-4 py-2 transition-colors">
            <Link to="organizer-profile" className="block text-center">
              Organizer Profile
            </Link>
          </li>
          <li className="hover:bg-blue-700 rounded px-4 py-2 transition-colors">
            <Link to="add-camp" className="block text-center">
              Add A Camp
            </Link>
          </li>
          <li className="hover:bg-blue-700 rounded px-4 py-2 transition-colors">
            <Link to="manage-camps" className="block text-center">
              Manage Camps
            </Link>
          </li>
          <li className="hover:bg-blue-700 rounded px-4 py-2 transition-colors">
            <Link to="manage-registered-camps" className="block text-center">
              Manage Registered Camps
            </Link>
          </li>
        </ul>
      </nav>

      {/* Dashboard Content */}
      <div className="dashboard-content flex-1 p-4 sm:p-6 max-w-5xl mx-auto w-full">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-700 mb-4 text-center sm:text-left">
          Organizer Dashboard
        </h1>
        <Outlet />
      </div>
    </div>
  );
};

export default OrganizerDashboard;
