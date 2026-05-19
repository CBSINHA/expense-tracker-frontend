import axios from "axios";

const api = axios.create({
  baseURL: "https://expense-tracker-ojay.onrender.com",
});

export default api;