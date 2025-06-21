import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',        //Render backend URL Or // MongoDB Atlas API base URL
});

export default API;
