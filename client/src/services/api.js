import axios from 'axios';

const API = axios.create({
  baseURL: 'https://multi-channel-order-sync-tracker-avae.onrender.com' || 'http://localhost:5000/api',        //Render backend URL Or // MongoDB Atlas API base URL
});

export default API;
