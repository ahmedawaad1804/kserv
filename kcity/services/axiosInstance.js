import axios from 'axios';
import configs from './config';

// Add a request interceptor 
export const axiosInstance = axios.create({
    baseURL: configs.AUTH_CONFIG.domain,
});
export  const axiosInstanceUnauth = axios.create({
    baseURL: configs.AUTH_CONFIG_UNAUTH.domain,
});