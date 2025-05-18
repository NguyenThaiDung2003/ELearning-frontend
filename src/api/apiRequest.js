import { axiosJWT } from "../api/axiosJWT"; 
import axios from "axios";
import { loginStart, loginFailed, loginSuccess, registerStart, registerFailed, registerSuccess, logoutStart, logoutSuccess, logoutFailed } from "../redux/authSlice";
import {store} from "../redux/store";  
const BASE_URL = import.meta.env.VITE_API_BASE_URL;


export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart()); 
    try {
        const res = await axios.post(`${BASE_URL}/api/user/login`, user, { 
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
        await axios.post(`${BASE_URL}/api/user/register`, user); 
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

        await axiosJWT.post(`${BASE_URL}/api/user/logout`,{}, {
            headers: {
                Authorization: `Bearer ${user?.accessToken}`,
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

        const res = await axiosJWT.get(`${BASE_URL}/api/user/profile`, {
            headers: {
                Authorization: `Bearer ${user?.accessToken}`,
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

export const updateUserProfile = async (profileData) => {
    try {
        const user = store.getState().auth.login?.currentUser;
        if (!user) throw new Error("User not logged in");
        
        const res = await axiosJWT.put(`${BASE_URL}/api/user/update`, profileData, {
            headers: {
                Authorization: `Bearer ${user?.accessToken}`,
            },
        });
        return res.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export const fetchUserCourses = async () => {
  try {
        const user = store.getState().auth.login?.currentUser;
        if (!user) throw new Error("User not logged in");

    const res = await axiosJWT.get(`${BASE_URL}/api/course/my-courses`, {
            headers: {
                Authorization: `Bearer ${user?.accessToken}`,
            },
        });
    return res.data;
  } catch (error) {
    throw new Error("Error fetching user courses: " + error.message);
  }
};

export const changePassword = async (data) => {
    try {
        const user = store.getState().auth.login?.currentUser;  
        if (!user)   throw new Error("User not logged in");
    
        const res = await axios.patch(`${BASE_URL}/api/user/change-password`, data, {
            headers: {
                Authorization: `Bearer ${user.accessToken}`,  
            },
            withCredentials: true,
        });

        return res.data;
    } catch (err) {
        console.error("Change password error:", err.response?.data || err.message);
        throw err.response?.data || { message: "Đã có lỗi xảy ra" };
    }
};

export const requestForgotPassword = async (email) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/user/forgot-password/${email}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || "Có lỗi xảy ra khi gửi yêu cầu!";
    }
  };
  
  // Xác minh OTP
  export const verifyOTP = async (email, otp) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/user/verify-reset-password-token/${email}`, { OTP: otp });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || "OTP không hợp lệ!";
    }
  };
  
  // Đặt lại mật khẩu mới
  export const resetPassword = async (email, otp, password) => {
    try {
      const response = await axios.patch(`${BASE_URL}/api/user/reset-password`, { email, verify_code: otp, password });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || "Không thể đặt lại mật khẩu!";
    }
  };
//uploadavt
  export const uploadAvatar = async (formData) => {
        const user = store.getState().auth.login?.currentUser;  
        if (!user)   throw new Error("User not logged in");

    const res = await axiosJWT.put(`${BASE_URL}/api/user/updateAvatar`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.accessToken}`,  
        },
        withCredentials: true,
    });
    return res.data;
};