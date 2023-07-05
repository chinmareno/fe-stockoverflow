import axios from "axios";

const axiosDummy = axios.create({
  baseURL: "https://dummyjson.com",
});
export default axiosDummy;
