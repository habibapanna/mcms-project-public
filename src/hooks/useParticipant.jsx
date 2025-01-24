import { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from './useAuth';

const useParticipant = () => {
    const { user } = useAuth();
    const [participant, setParticipant] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (user?.email) {
            axios
                .get(`https://mcms-project-server.vercel.app/participants/${user.email}`)
                .then((response) => {
                    setParticipant(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching participant:', error);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    }, [user]);

    const updateParticipant = (updatedData) => {
        return axios
            .put(`https://mcms-project-server.vercel.app/participants/${user.email}`, updatedData)
            .then((response) => response.data)
            .catch((error) => {
                console.error('Error updating participant:', error);
                throw error;
            });
    };

    return { participant, isLoading, updateParticipant };
};

export default useParticipant;
