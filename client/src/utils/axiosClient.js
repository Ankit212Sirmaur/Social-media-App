import axios from 'axios';

export const axiosclient = axios.create({
    baseURL: 'http://localhost:1223',
    withCredentials: true,
    
})