import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";


const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogout = () => {
    logOut()
      .then(() => {
        console.log("Logged out successfully");
      })
      .catch((error) => console.error("Logout error:", error));
  };

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-yellow-400 font-semibold"
              : "hover:text-yellow-400 transition"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/available-camps"
          className={({ isActive }) =>
            isActive
              ? "text-yellow-400 font-semibold"
              : "hover:text-yellow-400 transition"
          }
        >
          Available Camps
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="sticky top-0 z-50">
      <div className="navbar bg-gradient-to-r from-blue-200 via-white to-green-200 shadow-transparent">
        {/* Navbar Start */}
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 w-52 bg-white rounded-box shadow-lg z-[1]"
            >
              {links}
            </ul>
          </div>
          <a className="flex items-center space-x-3 text-2xl font-bold text-gray-800 hover:text-yellow-400 transition">
            <img
              className="w-12 h-12 rounded-full border-2 border-white shadow-lg"
              src="https://i.postimg.cc/qMctjC1W/download-24.jpg"
              alt="Logo"
            />
            <span className="tracking-wide">
              <span className="text-yellow-400">M</span>
              <span className="text-blue-600">C</span>
              <span className="text-green-600">M</span>
              <span className="text-pink-500">S</span>
            </span>
          </a>
        </div>

        {/* Navbar Center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-4">{links}</ul>
        </div>

        {/* Navbar End */}
        <div className="navbar-end">
          {user ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src={user.photoURL || "https://via.placeholder.com/40"} alt="Profile" />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <span className="font-semibold text-center">{user.displayName}</span>
                </li>
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            </div>
          ) : (
            <Link
              to="/login"
              className="btn btn-gradient bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 shadow-md hover:from-orange-500 hover:to-yellow-400"
            >
              Join Us
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
