import axios from "axios";
import Cookies from 'js-cookie';

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER,
});

instance.interceptors.request.use(async (config) => {
    const accessToken = Cookies.get("accessToken");
    if (accessToken) {
        config.headers.Authorization = accessToken;
    }
    return config;
},
(error) => {
    return Promise.reject(error);
});

instance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        originalRequest._retryCount = originalRequest._retryCount || 0;

        if (error.response && error.response.status === 401 && originalRequest._retryCount < 5) {
            originalRequest._retryCount += 1;

            try {
                const newToken = await refreshToken();
                originalRequest.headers.Authorization = newToken;
                return instance(originalRequest);
            } catch (err) {
                console.log(err);
                if (originalRequest._retryCount >= 5) {
                    logoutUser();
                }
                return Promise.reject(err);
            }
        }

        if (error.response && error.response.status === 403) {
            logoutUser();
        }

        return Promise.reject(error);
    }
);

async function refreshToken() {
    try {
        const refreshToken = Cookies.get("refreshToken");
        const response = await instance.post("/auth/refreshToken", {}, {
            headers: {
                RefreshToken: refreshToken
            }
        });
        const newAccessToken = response.data.data;
        Cookies.set("accessToken", newAccessToken);

        return newAccessToken;
    } catch (error) {
        throw error;
    }
}

function logoutUser() {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    // Add any additional logout logic here, such as redirecting to the login page
    window.location.href = '/auth/signin'; // Example redirect
}

export default instance;
