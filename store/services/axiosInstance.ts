import axios, { AxiosError, AxiosInstance } from 'axios';
import {getSession, signOut} from "next-auth/react";

// const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/api' : '/api';

const axiosInstance: AxiosInstance = axios.create({
     baseURL: 'http://154.53.56.67:8008/api/v1/',
    // withCredentials: true,
});


export const setAuthToken = (token: string) => {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const removeAuthToken = () => {
    delete axiosInstance.defaults.headers.common['Authorization'];
};

axiosInstance.interceptors.response.use(
    response => response,
    async (err: AxiosError & { config?: { alreadyRetried: boolean} }) => {
        if (err.response?.status === 401 && !err.config?.alreadyRetried && err.config?.url !== 'api/v1/auth/login') {
            try {
                const { accessToken, error } = await getSession() as any

                if(err.config && !error){
                    err.config.alreadyRetried = true
                    setAuthToken(accessToken)
                    return await axiosInstance.request(err.config)
                }

            } catch (err: any) {
                await signOut({ redirect: false })
            }
        }
        return Promise.reject(err);
    }
)

export default axiosInstance;
