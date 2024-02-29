import axios from 'axios';
import { Key_Access_Token, getItem, removeItem, setItem } from './localStorageManager';

export const axiosclient = axios.create({
    baseURL: process.env.REACT_APP_SERVER_BASE_URL,
    withCredentials: true,
  });

axiosclient.interceptors.request.use((request) => {
    const access_token = getItem(Key_Access_Token)
    request.headers['Authorization'] = `Bearer ${access_token}`;
    return request;
});

axiosclient.interceptors.response.use(async (response) => {
    const data = response.data;
    console.log(data);
    if (data.status === 'ok') {
        return data;
    }
    const originalRequest = response.config;
    const statusCode = data.statusCode;
    const error = data.error;

    // if the refresh token key expires direct the user to login page
    if (statusCode === 401 && originalRequest.url === `${process.env.REACT_APP_SERVER_BASE_URL}/auth/refresh`
    ) {
        removeItem(Key_Access_Token);
        window.location.replace('/login', '_self');
        return Promise.reject(error);
    }

    if (statusCode === 401) {   // means accesstoken expires generate a new access_token
        const response = await axiosclient.get(`${process.env.REACT_APP_SERVER_BASE_URL}/auth/refresh`);
        console.log( "interceptor response", response);
        if (response.status === 'ok') {
            setItem(Key_Access_Token, response.data.newAccesstoken); 
            originalRequest.headers['Authorization'] = `Bearer ${response.data.newAccesstoken}`;
            return axios(originalRequest);
        }
    }
    return Promise.reject(error);

});