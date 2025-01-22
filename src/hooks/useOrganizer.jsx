import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "./useAuth";


const useOrganizer = () => {
    const { user } = useAuth(); // Ensure user is being fetched properly
    const [isOrganizer, setIsOrganizer] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (user?.email) {
            axios
                .get(`http://localhost:5000/users/organizer/${user.email}`)
                .then((response) => {
                    setIsOrganizer(response.data.organizer);
                })
                .catch((error) => {
                    console.error("Error fetching organizer role:", error);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        } else {
            setIsLoading(false);
        }
    }, [user]);

    return [isOrganizer, isLoading];
};

export default useOrganizer;
