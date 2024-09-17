import axios from "axios";
import config from "../config";

const token = localStorage.getItem("token");

const api = axios.create({
  baseURL: config.apiUrl,
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
  },
});

export default api;
