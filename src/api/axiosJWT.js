import axios from "axios";
import jwt_decode from 'jwt-decode';
import { loginSuccess } from "../redux/authSlice";
import {store} from "../redux/store";  

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
let axiosJWT = axios.create();

const refreshToken = async () => {
    try {
        const res = await axios.post(`${BASE_URL}/refresh`, {}, {  
            withCredentials: true,  
        });
        return res.data;
    } catch (err) {
        console.log(err);
    }
};

axiosJWT.interceptors.request.use(
    async (config) => {
        let date = new Date();
        const user = store.getState().auth.login?.currentUser;  
        if (!user) return config;

        const decodedToken = jwt_decode(user?.accessToken);
        if (decodedToken.exp < date.getTime() / 1000) {
            const data = await refreshToken();
            const refreshUser = {
                ...user,
                accessToken: data.accessToken,
            };
            store.dispatch(loginSuccess(refreshUser));  
            config.headers["Token"] = `Bearer ${data.accessToken}`;
        }
        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
);

export { axiosJWT };

