import axios from "axios";
import Cookies from 'js-cookie';

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER,
})
instance.interceptors.request.use(async (config: any): Promise<any> => {
    const accessToken = Cookies.get("accessToken");
    if (accessToken) {
        config.headers.Authorization = accessToken;
    };

    return config;
},
(error) => {
    return Promise.reject(error);
});
  
instance.interceptors.response.use(
      (response) => {
        return response;
      },
      async(error) => {
            const originalRequest = error;
    
            if (error.response && error.response.status === 403 && !originalRequest._retry) {
                originalRequest._retry = true;

                try {
                    const newToken = await refreshToken();

                    originalRequest.headers.Authorization = newToken;
                    return instance(originalRequest);
                } catch(err) {
                    console.log(err);
                    return err;
                }
            } 
            return error;
      }
  )

async function refreshToken() {
    
    try {
        const refreshToken = Cookies.get("refreshToken");
        const response = await instance.post("/auth/refreshToken", {}, {
            headers: {
                RefreshToken: refreshToken
            }
        });
        Cookies.set("accessToken", response.data.data);

        return response.data.data;
    } catch(error) {
        throw error;
    }
}

export default instance;