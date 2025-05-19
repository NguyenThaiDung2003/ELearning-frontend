import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../component/Header/Header';
import Footer from '../../component/Footer/Footer';
import './LessonView.css';

const LessonView = () => {
  const { id: courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const [lessons, setLessons] = useState([]);
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://elearning-backend-2kn5.onrender.com/api/lesson/lessons-by-course/${courseId}`)
      .then(res => res.json())
      .then(data => {
        setLessons(data);
        const selected = data.find(l => l._id === lessonId);
        setLesson(selected || null);
      })
      .catch(err => console.error("Lỗi khi tải bài học:", err))
      .finally(() => setLoading(false));
  }, [courseId, lessonId]);

  if (loading) {
    return (
      <div className="lesson-view-page">
        <Header />
        <div className="lesson-container">
          <h3 style={{ textAlign: 'center' }}>Đang tải nội dung bài học...</h3>
        </div>
        <Footer />
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="lesson-view-page">
        <Header />
        <div className="lesson-container">
          <h3 style={{ textAlign: 'center' }}>Không tìm thấy bài học.</h3>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="lesson-view-page">
      <Header />
      <div className="lesson-container">
        <div className="tabs-section">
          <div className="video-section">
            <h2>{lesson.title}</h2>
            <iframe
              width="100%"
              height="600"
              src="https://www.youtube.com/embed/x0fSBAgBrOQ"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>

          </div>

          <div className="tab">
            <h3>Mô tả bài học</h3>
            <p>{lesson.description}</p>
          </div>

          <div className="tab">
            <h3>Ghi chú</h3>
            <textarea rows="5" placeholder="Viết ghi chú tại đây..."></textarea>
          </div>

          <div className="tab">
            <h3>Quiz</h3>
            <a href={`/courses/${courseId}/quiz/${lessonId}`} className="quiz-button">
              Làm bài kiểm tra
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LessonView;
