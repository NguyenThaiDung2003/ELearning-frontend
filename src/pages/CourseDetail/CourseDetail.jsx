import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../component/Header/Header';
import Footer from '../../component/Footer/Footer';
import './CourseDetail.css';

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const course = {
    title: "Thiết kế UI chuyên sâu",
    instructor: "Võ Thị E",
    lessons: ["Phân tích yêu cầu", "Sketch và Wireframe", "Nguyên mẫu"],
    description: "Thiết kế giao diện hiện đại, theo xu hướng mới nhất."
  };

  return (
    <div className="course-detail-page">
      <Header />

      <div className="container">
        <div className="main-content">
          <h1 className="course-title">{course.title}</h1>
          <p className="course-instructor">Giảng viên: {course.instructor}</p>
          <p className="course-description">{course.description}</p>

          <h2>Nội dung khóa học</h2>
          <ul className="lesson-list">
            {course.lessons.map((lesson, idx) => (
              <li key={idx}>
                <button
                  className="lesson-link"
                  onClick={() => navigate(`/courses/${id}/lesson/${idx + 1}`)}
                >
                  📘 {lesson}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CourseDetail;
