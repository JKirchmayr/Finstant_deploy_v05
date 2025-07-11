import axios from "axios";

const axiosConfig = {
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || "",
  headers: {
    "Content-Type": "application/json",
    // Add other default headers here if needed
  },
  // You can add more config options like timeout, withCredentials, etc.
};

export const api = axios.create(axiosConfig);
