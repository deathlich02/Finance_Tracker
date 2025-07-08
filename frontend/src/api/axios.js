import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000", // backend server
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;