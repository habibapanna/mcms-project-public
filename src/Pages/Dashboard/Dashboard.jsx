import { Link, Outlet } from "react-router-dom";


const Dashboard = () => {
  return (
    <div className="dashboard-layout bg-gray-100 min-h-screen">
      <nav className="bg-blue-600 text-white p-4 shadow-md">
        <ul className="flex justify-around">
          <li className="hover:bg-blue-700 rounded px-4 py-2 transition-colors">
            <Link to="profile">Organizer Profile</Link>
          </li>
          <li className="hover:bg-blue-700 rounded px-4 py-2 transition-colors">
            <Link to="add-camp">Add A Camp</Link>
          </li>
          <li className="hover:bg-blue-700 rounded px-4 py-2 transition-colors">
            <Link to="manage-camps">Manage Camps</Link>
          </li>
          <li className="hover:bg-blue-700 rounded px-4 py-2 transition-colors">
            <Link to="manage-registered-camps">Manage Registered Camps</Link>
          </li>
        </ul>
      </nav>
      <div className="dashboard-content p-6">
        <h1 className="text-2xl font-bold text-gray-700 mb-4">Organizer Dashboard</h1>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
