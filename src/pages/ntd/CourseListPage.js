// src/pages/CourseListPage.js
import { useEffect, useState } from 'react';
import { getCourses } from '../api/courses';
import { Link } from 'react-router-dom';

export default function CourseListPage() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getCourses().then(setCourses);
  }, []);

  return (
    <div>
      <h2>Danh sách khóa học</h2>
      <ul>
        {courses.map(course => (
          <li key={course._id}>
            <Link to={`/courses/${course._id}`}>{course.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
