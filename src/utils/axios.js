import axios from "axios";
import Cookies from "js-cookie";

const apiClient = axios.create({
  baseURL: "https://form-backend-7v65.onrender.com/api",
  // baseURL: "http://localhost:3000/api",
});

apiClient.interceptors.request.use(
  (config) => {
    if (!config.headers["skipAuth"]) {
      const token = Cookies.get("accessToken");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    } else {
      delete config.headers["skipAuth"];
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
