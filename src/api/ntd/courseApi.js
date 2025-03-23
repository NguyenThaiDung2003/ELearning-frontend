import axios from 'axios';

export const API = axios.create({ baseURL: 'http://localhost:5000/api' });

export const getCourses = () => API.get('/courses');
export const getCourseById = (id) => API.get(`/courses/${id}`);
export const getLessonById = (id, lessonId) => API.get(`/courses/${id}/lesson/${lessonId}`);
export const getQuizById = (id, quizId) => API.get(`/courses/${id}/quiz/${quizId}`);
