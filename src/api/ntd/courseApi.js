import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL ;
export const API = axios.create({ baseURL: BASE_URL });


export const getCourses = () => API.get('/courses');
export const getCourseById = (id) => API.get(`/courses/${id}`);
export const getLessonById = (id, lessonId) => API.get(`/courses/${id}/lesson/${lessonId}`);
export const getQuizById = (id, quizId) => API.get(`/courses/${id}/quiz/${quizId}`);
