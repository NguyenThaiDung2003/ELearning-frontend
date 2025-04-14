// import { useEffect, useState } from 'react';
// import { API } from '../api/courseApi';
// import CourseCard from '../components/CourseCard';

// const Courses = () => {
//     const [courses, setCourses] = useState([]);

//     useEffect(() => {
//         API.get('/courses').then(response => setCourses(response.data));
//     }, []);

//     return (
//         <div>
//             <h2>Danh sách khóa học</h2>
//             <div className="course-list">
//                 {courses.map(course => <CourseCard key={course._id} course={course} />)}
//             </div>
//         </div>
//     );
// };

// export default Courses;







// src/api/courses.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/courses';

export const getCourses = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const getCourseById = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};
