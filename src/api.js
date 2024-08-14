import axios from 'axios';
const token = localStorage.getItem("token");
if (token) {
  axios.defaults.headers.common["x-access-token"] = token; 
}
const API_URL = process.env.BACKEND_API_URL; 
export const signup = (data) => axios.post(`${API_URL}/signup`, data);
export const login = (data) => axios.post(`${API_URL}/login`, data);
export const getUserDetails = () => axios.get(`${API_URL}/getUserDetails`);
export const getListOfUser = () => axios.get(`${API_URL}/getListOfUser`);

export const updateUserData = (data) => axios.put(`${API_URL}/updateUserData`, data);
export const uploadVideo = (data) => axios.put(`${API_URL}/upload-video`, data);
export const uploadProfileImage = (data) => axios.put(`${API_URL}/upload-profile`, data, {  'Content-Type': 'multipart/form-data' });
