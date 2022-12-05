import axios, { AxiosError, AxiosInstance } from 'axios';

// const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/api' : '/api';

const axiosInstance: AxiosInstance = axios.create({
     baseURL: 'http://154.53.56.67:8008/api/v1/',
    // withCredentials: true,
});

// axiosInstance.interceptors.response.use(
//     (response) => response,
//     (error: AxiosError) => {
//         if (!error.response) {
//             return Promise.reject(error);
//         }
//
//         if (error.response.status === 401) {
//             console.error('Code 401 (Unauthorized)');
//             error.response.data = 'Unauthorized error';
//         }
//
//         if (error.response.status >= 500 && error.response.status < 600) {
//             error.response.data = 'Server error';
//         }
//
//         return Promise.reject(error);
//     }
// );

export const setAuthToken = (token: string) => {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const removeAuthToken = () => {
    delete axiosInstance.defaults.headers.common['Authorization'];
};

// Also add/ configure interceptors && all the other cool stuff
axiosInstance.interceptors.response.use(
    response => response,
    async (err: AxiosError & { config?: { alreadyRetried: boolean} }) => {
        if (err.response?.status === 401 && !err.config?.alreadyRetried && err.config?.url !== 'api/v1/auth/login') {
            try {
                const userRefreshToken = localStorage.getItem("refreshToken")
                const res = await axios.post('http://154.53.56.67:8008/api/v1/'+`auth/refresh`, {
                    refreshToken: userRefreshToken,
                })
                const {accessToken, refreshToken} = res.data

                localStorage.setItem("accessToken", accessToken)
                localStorage.setItem("refreshToken", refreshToken)

                if(err.config){
                    err.config.alreadyRetried = true
                    setAuthToken(accessToken)
                    return await axiosInstance.request(err.config)
                }

            } catch (err: any) {
                // store.dispatch(logoutWithAxiosInterceptorEffect() as any)

            }
        }
        return Promise.reject(err);
    }
)

export default axiosInstance;
