import axios from 'axios';




const BASE_URL = import.meta.env.VITE_API_BASE_URL ;
export const API = axios.create({ baseURL: BASE_URL });




export const getCourses = () => API.get('/api/courses');
export const getCourseById = (id) => API.get(`/api/courses/${id}`);
export const getLessonById = (id, lessonId) => API.get(`/api/courses/${id}/lesson/${lessonId}`);
export const getQuizById = (id, quizId) => API.get(`/api/courses/${id}/quiz/${quizId}`);
