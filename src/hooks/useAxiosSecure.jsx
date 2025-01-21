import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import axios from "axios";


const useAxiosSecure = () => {
  const { token } = useContext(AuthContext);

  const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000', // Replace with your API base URL
  });

  axiosSecure.interceptors.request.use((config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return { axiosSecure };
};

export default useAxiosSecure;
