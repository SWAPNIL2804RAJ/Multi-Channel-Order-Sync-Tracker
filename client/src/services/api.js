import axios from 'axios';

const API = axios.create({
  baseURL: 'https://multi-channel-order-sync-tracker3.onrender.com'       //Render backend URL Or // MongoDB Atlas API base URL
});

export default API;
