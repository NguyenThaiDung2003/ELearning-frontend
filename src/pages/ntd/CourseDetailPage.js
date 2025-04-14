// src/pages/CourseDetailPage.js
import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCourseById } from '../api/courses';

export default function CourseDetailPage() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    getCourseById(id).then(setCourse);
  }, [id]);

  if (!course) return <div>Đang tải...</div>;

  return (
    <div>
      <h2>{course.title}</h2>
      <p>{course.description}</p>
      <h4>Giảng viên: {course.instructor}</h4>

      <h3>Bài giảng</h3>
      <ul>
        {course.lessons.map(lesson => (
          <li key={lesson._id}>
            <Link to={`/courses/${id}/lesson/${lesson._id}`}>{lesson.title}</Link>
          </li>
        ))}
      </ul>

      <h3>Bài kiểm tra</h3>
      <ul>
        {course.quizzes.map(quiz => (
          <li key={quiz._id}>
            <Link to={`/courses/${id}/quiz/${quiz._id}`}>Quiz: {quiz.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
