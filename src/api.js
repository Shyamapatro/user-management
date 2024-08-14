import axios from 'axios';

const token = localStorage.getItem("token");
if (token) {
  axios.defaults.headers.common["x-access-token"] = token; 
}
const API_URL = "https://user-backend-k20c.onrender.com/api/user"; 
export const signup = (data) => axios.post(`${API_URL}/signup`, data);
export const login = (data) => axios.post(`${API_URL}/login`, data);
export const getUserDetails = () => axios.get(`${API_URL}/getUserDetails`);
export const getListOfUser = () => axios.get(`${API_URL}/getListOfUser`);
