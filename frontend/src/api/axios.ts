import axios from "axios";
import { BASE_API_URL } from "@/constants";

const AxiosApi = axios.create({
  baseURL: BASE_API_URL,
});

// Request interceptor to add the token to headers
AxiosApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(`token`);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default AxiosApi;
