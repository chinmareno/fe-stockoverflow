import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:2000",
  withCredentials: true,
});
export default axiosInstance;
