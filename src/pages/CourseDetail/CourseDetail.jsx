import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../component/Header/Header';
import Footer from '../../component/Footer/Footer';
import './CourseDetail.css';

const CourseDetail = () => {
  const { id } = useParams();  // courseId
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Gọi API để lấy danh sách khóa học
        const courseRes = await fetch('https://elearning-backend-2kn5.onrender.com/api/course/get-courses');
        const courseData = await courseRes.json();
        const foundCourse = courseData.courses.find((c) => c._id === id);
        setCourse(foundCourse);

        // Gọi API để lấy bài học theo courseId
        const lessonRes = await fetch(`https://elearning-backend-2kn5.onrender.com/api/lesson/lessons-by-course/${id}`);
        const lessonData = await lessonRes.json();
        setLessons(lessonData || []);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="course-detail-page">
        <Header />
        <div className="container">
          <h3 style={{ textAlign: 'center' }}>Đang tải thông tin khóa học...</h3>
        </div>
        <Footer />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="course-detail-page">
        <Header />
        <div className="container">
          <h3 style={{ textAlign: 'center' }}>Không tìm thấy khóa học.</h3>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="course-detail-page">
      <Header />

      <div className="container">
        <div className="main-content">
          <h1 className="course-title">{course.name}</h1>
          <p className="course-instructor">Danh mục: {course.category}</p>
          <p className="course-description">{course.description}</p>

          <h2>Nội dung khóa học</h2>
          <ul className="lesson-list">
            {lessons.map((lesson) => (
              <li key={lesson._id}>
                <button
                  className="lesson-link"
                  onClick={() => navigate(`/courses/${id}/lesson/${lesson._id}`)}
                >
                  📘 {lesson.title}
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
