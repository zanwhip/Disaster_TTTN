import axios from "axios";
import Cookies from "js-cookie";

import { LoginData, AuthResponse } from "@/types/next-auth";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});


api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;


export const loginUser = async (data: LoginData): Promise<AuthResponse> => {
  const res = await api.post("/user/login", data);
  return res.data;
};
