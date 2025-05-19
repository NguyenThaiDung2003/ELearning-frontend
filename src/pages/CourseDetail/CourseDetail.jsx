import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../component/Header/Header';
import Footer from '../../component/Footer/Footer';
import './CourseDetail.css';
import { axiosJWT } from "../../api/axiosJWT"
import axios from "axios";
import { store } from "../../redux/store";
const CourseDetail = () => {
  const { id } = useParams();  // courseId
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

useEffect(() => {
  const fetchData = async () => {
    try {
      // Lấy danh sách khóa học
         const user = store.getState().auth.login?.currentUser;
      const courseRes = await axiosJWT.get(`${BASE_URL}/api/course/get-courses`);
      const courseData = courseRes.data;
      const foundCourse = courseData.courses.find((c) => c._id === id);
      setCourse(foundCourse);

      // Lấy danh sách bài học
      const lessonRes = await axiosJWT.get(`${BASE_URL}/api/lesson/lessons-by-course/${id}`,{
        headers: {
            Authorization: `Bearer ${user?.accessToken}`,
        },
    });
      setLessons(lessonRes.data || []);
      console.log(lessonRes.data);

      // Lấy danh sách quiz
      const quizRes = await axiosJWT.get(`${BASE_URL}/api/quiz/quizzes-by-course/${id}`,{
        headers: {
            Authorization: `Bearer ${user?.accessToken}`,
        },
    });
      setQuizzes(quizRes.data || []);
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
          <h2>Quiz kiểm tra</h2>
          <ul className="lesson-list">
            {quizzes.map((quiz) => (
              <li key={quiz._id}>
                <button
                  className="lesson-link"
                  onClick={() => navigate(`/courses/${id}/quiz/${quiz._id}`)}
                >
                  🧠 {quiz.title}
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
