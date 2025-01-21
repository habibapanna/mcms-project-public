import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";

const useOrganizer = () => {
  const { user } = useContext(AuthContext);  // Get user from context
  const axiosSecure = useAxiosSecure();

  // If user doesn't exist, do not run the query
  if (!user) {
    console.log('No user found in AuthContext');
    return [null];  // Return null if no user
  }

  // Log the email to ensure it's passed correctly
  console.log('Fetching organizer status for:', user.email);

  // Fetch organizer status if user is available
  const { data: isOrganizer, error } = useQuery(
    {
      queryKey: [user.email, "isOrganizer"],
      queryFn: async () => {
        try {
          const res = await axiosSecure.get(`/users/organizer/${user.email}`);
          console.log('API Response:', res.data);  // Log the response
          return res.data?.organizer;
        } catch (err) {
          console.error('Error fetching organizer status:', err);
          return false;  // In case of error, return false
        }
      },
      enabled: !!user,  // Only run query when user is available
    }
  );

  // Log the query status for debugging
  if (error) {
    console.error('Query Error:', error);
  }

  return [isOrganizer];
};

export default useOrganizer;
