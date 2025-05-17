import axios from "axios";
import { axiosJWT } from "../axiosJWT";
import { store } from "../../redux/store";

const BASE_URL = 'https://elearning-backend-2kn5.onrender.com';

// Lấy danh sách khóa học
export const getCourses = async () => {
  const res = await axios.get(`${BASE_URL}/api/course/get-courses?limit=50`);
  console.log("Lấy danh sách khóa học:", res.data);
  return res.data;
};

// Lấy danh sách khóa học theo url slug
export const getCourseByUrlSlug = async (urlSlug) => {
  const res = await axios.get(`${BASE_URL}/api/course/detail/url/${urlSlug}`);
  return res.data;
};

// Tạo nhiều khoá học
export const createCourseMany = async (data) => {
  const user = store.getState().auth.login?.currentUser;
  const res = await axiosJWT.post(`${BASE_URL}/api/course/create-many`, data, {
    headers: {
      Authorization: `Bearer ${user?.accessToken}`,
    },
  });
  return res.data;
};

// Lấy khoá học của người dùng
export const getMyCourses = async () => {
  const user = store.getState().auth.login?.currentUser;
  const res = await axiosJWT.get(`${BASE_URL}/api/course/my-courses`, {
    headers: {
      Authorization: `Bearer ${user?.accessToken}`,
    },
  });
  return res.data;
};

// Tạo khoá học
export const adminCreateCourse = async (formData) => {
  const user = store.getState().auth.login?.currentUser;
  const res = await axiosJWT.post(`${BASE_URL}/api/course/admin/create`, formData, {
    headers: {
      Authorization: `Bearer ${user?.accessToken}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

// Admin Lấy khoá học theo id
export const adminGetCourseById = async (courseId) => {
  const user = store.getState().auth.login?.currentUser;
  const res = await axiosJWT.get(`${BASE_URL}/api/course/admin/course/${courseId}`, {
    headers: {
      Authorization: `Bearer ${user?.accessToken}`,
    },
  });
  return res.data;
};

// Admin cập nhật khoá học
export const adminUpdateCourse = async (courseId, formData) => {
  const user = store.getState().auth.login?.currentUser;
  const res = await axiosJWT.patch(`${BASE_URL}/api/course/admin/${courseId}`, formData, {
    headers: {
      Authorization: `Bearer ${user?.accessToken}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

// Admin xoá khoá học
export const adminDeleteCourse = async (courseId) => {
  const user = store.getState().auth.login?.currentUser;
  const res = await axiosJWT.delete(`${BASE_URL}/api/course/admin/${courseId}`, {
    headers: {
      Authorization: `Bearer ${user?.accessToken}`,
    },
  });
  return res.data;
};

// Admin - Lấy danh sách học viên đã đăng ký khoá học
export const adminGetRegisteredUsers = async (courseId) => {
  const user = store.getState().auth.login?.currentUser;
  const res = await axiosJWT.get(`${BASE_URL}/api/course/admin/${courseId}/registered-users`, {
    headers: {
      Authorization: `Bearer ${user?.accessToken}`,
    },
  });
  return res.data;
};

// Admin - Lấy tổng số khoá học
export const adminGetTotalCourses = async () => {
  const user = store.getState().auth.login?.currentUser;
  const res = await axiosJWT.get(`${BASE_URL}/api/course/admin/get-total-courses`, {
    headers: {
      Authorization: `Bearer ${user?.accessToken}`,
    },
  });
  console.log("Tổng số khoá học:", res.data);
  return res.data;
};

// Admin - Lấy danh sách người dùng
export const getAllUsers = async () => {
  try {
    const res = await axiosJWT.get(`${BASE_URL}/api/user/admin/get-all`);
    return res.data;
  } catch (err) {
    console.error("Lỗi lấy danh sách người dùng:", err.response?.data || err.message);
    throw err;
  }
};

//Admin: tạo người dùng
export const createUser = async (newUserData) => {
  try {
    const res = await axiosJWT.post(`${BASE_URL}/api/user/admin/create-user`, newUserData);
    return res.data;
  } catch (err) {
    console.error("Lỗi tạo người dùng:", err.response?.data || err.message);
    throw err;
  }
};

//Admin edit người dùng
export const editUserProfile = async (userData) => {
  try {
    const res = await axiosJWT.put(`${BASE_URL}/api/user/admin/edit-profile`, userData);
    return res.data;
  } catch (err) {
    console.error("Lỗi chỉnh sửa người dùng:", err.response?.data || err.message);
    throw err;
  }
};

//Admin xoá người dùng
export const deleteUser = async (userId) => {
  try {
    const res = await axiosJWT.delete(`${BASE_URL}/api/user/admin/${userId}`);
    return res.data;
  } catch (err) {
    console.error("Lỗi xoá người dùng:", err.response?.data || err.message);
    throw err;
  }
};

//Admin: tìm kiếm người dùng
export const searchUsers = async (keyword) => {
  try {
    const res = await axiosJWT.get(`${BASE_URL}/api/user/admin/search`, {
      params: { keyword }
    });
    return res.data;
  } catch (err) {
    console.error("Lỗi tìm kiếm người dùng:", err.response?.data || err.message);
    throw err;
  }
};

//admin lấy tổng số người dùng
export const getTotalUsers = async () => {
  try {
    const res = await axiosJWT.get(`${BASE_URL}/api/user/admin/get-total-users`);
    return res.data;
  } catch (err) {
    console.error("Lỗi lấy tổng số người dùng:", err.response?.data || err.message);
    throw err;
  }
};

//Admin: lấy danh sách bài học theo id khoá học
export const getLessonsByCourseId = async (courseId) => {
  try {
    const res = await axiosJWT.get(`${BASE_URL}/api/lesson/lessons-by-course/${courseId}`);
    return res.data;
  } catch (err) {
    console.error("Lỗi lấy danh sách bài học:", err.response?.data || err.message);
    throw err;
  }
};

//Admin: tạo bài học
export const createLesson = async (lessonData) => {
  try {
    const res = await axiosJWT.post(`${BASE_URL}/api/lesson/admin/create`, lessonData);
    return res.data;
  } catch (err) {
    console.error("Lỗi tạo bài học:", err.response?.data || err.message);
    throw err;
  }
};

//Admin: lấy bài học theo id
export const getLessonById = async (lessonId) => {
  try {
    const res = await axiosJWT.get(`${BASE_URL}/api/lesson/admin/details/${lessonId}`);
    return res.data;
  } catch (err) {
    console.error("Lỗi lấy chi tiết bài học:", err.response?.data || err.message);
    throw err;
  }
};

//Admin: cập nhật bài học
export const updateLesson = async (lessonId, lessonData) => {
  try {
    const res = await axiosJWT.put(`${BASE_URL}/api/lesson/admin/update/${lessonId}`, lessonData);
    return res.data;
  } catch (err) {
    console.error("Lỗi cập nhật bài học:", err.response?.data || err.message);
    throw err;
  }
};

//Admin: xoá bài học
export const deleteLesson = async (lessonId) => {
  try {
    const res = await axiosJWT.delete(`${BASE_URL}/api/lesson/delete/${lessonId}`);
    return res.data;
  } catch (err) {
    console.error("Lỗi xóa bài học:", err.response?.data || err.message);
    throw err;
  }
};

//Admin: lấy danh sách quiz theo id khoá học
export const getQuizzesByCourseId = async (courseId) => {
  try {
    const res = await axiosJWT.get(`${BASE_URL}/api/quiz/quizzes-by-course/${courseId}`);
    return res.data;
  } catch (err) {
    console.error("Lỗi lấy danh sách quiz:", err.response?.data || err.message);
    throw err;
  }
};

//Admin: tạo quiz
export const createQuiz = async (quizData) => {
  try {
    const res = await axiosJWT.post(`${BASE_URL}/api/quiz/admin/create`, quizData);
    return res.data;
  } catch (err) {
    console.error("Lỗi tạo quiz:", err.response?.data || err.message);
    throw err;
  }
};

//Admin: lấy quiz theo id
export const getQuizById = async (quizId) => {
  try {
    const res = await axiosJWT.get(`${BASE_URL}/api/quiz/admin/details/${quizId}`);
    return res.data;
  } catch (err) {
    console.error("Lỗi lấy chi tiết quiz:", err.response?.data || err.message);
    throw err;
  }
};

//Admin: cập nhật quiz
export const updateQuiz = async (quizId, quizData) => {
  try {
    const res = await axiosJWT.put(`${BASE_URL}/api/quiz/admin/update/${quizId}`, quizData);
    return res.data;
  } catch (err) {
    console.error("Lỗi cập nhật quiz:", err.response?.data || err.message);
    throw err;
  }
};

//Admin: xoá quiz
export const deleteQuiz = async (quizId) => {
  try {
    const res = await axiosJWT.delete(`${BASE_URL}/api/quiz/delete/${quizId}`);
    return res.data;
  } catch (err) {
    console.error("Lỗi xoá quiz:", err.response?.data || err.message);
    throw err;
  }
};



