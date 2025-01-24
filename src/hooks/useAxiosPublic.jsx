import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://mcms-project-server.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;