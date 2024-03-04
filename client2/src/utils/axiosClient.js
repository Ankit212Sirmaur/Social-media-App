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
    console.log(response);
    const data = response.data;
    if (data.status === 'ok') {
        return data;
    }
    const originalRequest = response.config;
    const statusCode = data.statusCode;
    const error = data.error;

    if (statusCode === 401 && !originalRequest._retry) {
        // means the access token has expired
        originalRequest._retry = true;

        const response = await axios
            .create({
                withCredentials: true,
            })
            .get(`${process.env.REACT_APP_SERVER_BASE_URL}/auth/refresh`);

        if (response.data.status === "ok") {
            setItem(Key_Access_Token, response.data.result.newAccesstoken);
            originalRequest.headers[
                "Authorization"
            ] = `Bearer ${response.data.result.newAccesstoken}`;

            return axios(originalRequest);
        } else {
            removeItem( Key_Access_Token);
            window.location.replace("/login", "_self");
            return Promise.reject(error);
        }
    }
    return Promise.reject(error);
});