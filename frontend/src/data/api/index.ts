import axios from "axios";
import { API_URL } from "../config/apiConfig";

const instance = axios.create({
  baseURL: API_URL || "http://localhost:5000/api",
  withCredentials: true,
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    console.log("No token found in localStorage");
  }
  return config;
});

export default instance;
