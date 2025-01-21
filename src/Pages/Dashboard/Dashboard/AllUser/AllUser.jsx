import { useState, useEffect } from 'react';
import { FaUser, FaTrash, FaUserTie, FaUsers } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const AllUser = () => {
  const { axiosSecure } = useAxiosSecure();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/users'); // Update the URL if necessary
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
      toast.error(`Error: ${err.message}`);
    }
  };

  useEffect(() => {
    fetchUsers(); // Fetch users when the component mounts
  }, []);

  const handleMakeOrganizer = (user) => {
    axiosSecure
      .patch(`/users/organizer/${user._id}`)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          fetchUsers(); // Re-fetch the users list after the role change
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `${user.name} is now an organizer!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((err) => {
        console.error('Error making user an organizer:', err);
        toast.error('Failed to make the user an organizer.');
      });
  };

  // Handle user deletion
  const handleDelete = async (userId) => {
    // Show a custom toast confirmation
    toast.info(
      <div>
        <p>Are you sure you want to delete this user?</p>
        <div className="mt-2 flex justify-center gap-2">
          <button
            onClick={async () => {
              try {
                const response = await fetch(`http://localhost:5000/users/${userId}`, {
                  method: 'DELETE',
                });
                if (!response.ok) {
                  throw new Error('Failed to delete user');
                }
                setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
                toast.dismiss();
                toast.success('User deleted successfully!');
              } catch (err) {
                toast.dismiss();
                toast.error('Error deleting user: ' + err.message);
              }
            }}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Yes
          </button>
          <button
            onClick={() => toast.dismiss()}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>,
      {
        autoClose: false, // Prevent auto-dismissal
        closeOnClick: false,
      }
    );
  };

  return (
    <div>
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4">All Users</h1>
      {error && <p className="text-red-500">Error: {error}</p>}
      {!error && users.length === 0 && <p>Loading...</p>}
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Role</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="border border-gray-300 px-4 py-2">{user.name || 'N/A'}</td>
              <td className="border border-gray-300 px-4 py-2">{user.email}</td>
              <td className="border border-gray-300 px-4 py-2 flex items-center gap-2">
                {user.role === 'organizer' ? (
                  'Organizer'
                ) : (
                  <button
                    onClick={() => handleMakeOrganizer(user)}
                    className="rounded-lg p-1 mx-auto btn btn-sm bg-blue-500"
                  >
                    <FaUsers className="text-white text-2xl" />
                  </button>
                )}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <button
                  onClick={() => handleDelete(user._id)}
                  className="text-red-500 hover:text-red-700"
                  title="Delete User"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUser;
