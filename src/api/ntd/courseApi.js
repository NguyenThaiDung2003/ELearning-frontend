import axios from 'axios';

// export const API = axios.create({ baseURL: 'http://localhost:5000/api' });
// export const API = axios.create({ baseURL: 'https://elearning-backend-1-4fic.onrender.com/api' });
export const API = axios.create({ baseURL: 'https://elearning-backend-2kn5.onrender.com' });
// export const API = axios.create({ baseURL: BASE_URL });

export const getCourses = () => API.get('/courses');
export const getCourseById = (id) => API.get(`/courses/${id}`);
export const getLessonById = (id, lessonId) => API.get(`/courses/${id}/lesson/${lessonId}`);
export const getQuizById = (id, quizId) => API.get(`/courses/${id}/quiz/${quizId}`);
