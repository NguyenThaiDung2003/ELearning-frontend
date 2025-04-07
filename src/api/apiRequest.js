import { axiosJWT } from "../api/axiosJWT"; 
import axios from "axios";
import { loginStart, loginFailed, loginSuccess, registerStart, registerFailed, registerSuccess, logoutStart, logoutSuccess, logoutFailed } from "../redux/authSlice";
import {store} from "../redux/store";  

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart()); 
    try {
        const res = await axios.post(`${BASE_URL}/login`, user, { 
            withCredentials: true 
        }); 
        dispatch(loginSuccess(res.data)); 
        navigate("/"); 
    } catch (error) {
        console.error("Lỗi đăng nhập:", error.response?.data || error.message);
        //tess
        if (error.response?.status === 401) {
            alert("Tên người dùng không tồn tại! Vui lòng kiểm tra lại.");
        } else if (error.response?.status === 400) {
            alert("Sai mật khẩu! Vui lòng nhập lại.");
        } else {
            alert("Đăng nhập thất bại! Lỗi không xác định.");
        }
        //test
        dispatch(loginFailed()); 
    }
};

export const registerUser = async (user, dispatch, navigate) => {
    dispatch(registerStart()); 
    try {
        await axios.post(`${BASE_URL}/register`, user); 
        dispatch(registerSuccess()); 
        alert(" Đăng ký thành công!");//test
        navigate("/login"); 
    } catch (error) {
        console.error("Lỗi đăng ký:", error.response?.data || error.message);
        //test
        if (error.response?.status === 500) {
            alert("Error in registerUser");
        } else if (error.response?.status === 400) {
            alert("All fields are required.");
        } else {
            alert("Đăng nhập thất bại! Lỗi không xác định.");
        }
        //test
        dispatch(registerFailed()); 
    }
};

export const logOut = async (dispatch,navigate) => {
    dispatch(logoutStart()); 
    try{
        const user = store.getState().auth.login?.currentUser;
        if (!user) throw new Error("User not logged in");

        await axiosJWT.post(`${BASE_URL}/logout`,{}, {
            headers: {
                Token: `Bearer ${user?.accessToken}`,
            },
        });
        dispatch(logoutSuccess());
        navigate("/");
    } catch (err) {
        dispatch(logoutFailed())
    }
}

export const getUserProfile = async () => {
    try {
        const user = store.getState().auth.login?.currentUser;
        if (!user) throw new Error("User not logged in");

        const res = await axiosJWT.get(`${BASE_URL}/profile`, {
            headers: {
                Token: `Bearer ${user?.accessToken}`,
            },
        });

        return res.data;
    } catch (err) {
        console.error("Lỗi lấy thông tin user:", err);
        if (err.response) {
            console.error("API Response Error:", err.response.data);
        }
    }
};
