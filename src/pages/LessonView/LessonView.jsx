import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../component/Header/Header';
import Footer from '../../component/Footer/Footer';
import './LessonView.css';

const allLessons = {
  1: {
    title: 'Giới thiệu React',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    overview: 'Bạn sẽ nắm được tổng quan về React, lý do sử dụng và cách bắt đầu.',
    resources: ['Slide giới thiệu.pdf', 'Link tài liệu chính thức'],
    notes: ['Ghi chú mẫu: React là thư viện JavaScript dùng để xây dựng UI.']
  },
  2: {
    title: 'JSX và Component',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    overview: 'Tìm hiểu về JSX và cách viết component cơ bản.',
    resources: ['Code mẫu component.jsx', 'Tài liệu JSX'],
    notes: ['JSX trông giống HTML nhưng được viết trong JavaScript.']
  },
  3: {
    title: 'State và Props',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    overview: 'Học cách quản lý dữ liệu bên trong và truyền dữ liệu giữa các component.',
    resources: ['Slide state-vs-props.pdf'],
    notes: ['State thay đổi được, Props thì không.']
  }
};

const LessonView = () => {
  const { id, lessonId } = useParams();
  const lesson = allLessons[lessonId] || {
    title: 'Bài học không tồn tại',
    videoUrl: '',
    overview: '',
    resources: [],
    notes: ['']
  };

  return (
    <div className="lesson-view-page">
      <Header />
      <div className="lesson-container">
        <div className="video-section">
          <video controls src={lesson.videoUrl} />
          <h2>{lesson.title}</h2>
        </div>

        <div className="tabs-section">
          <div className="tab">
            <h3>Tổng quan</h3>
            <p>{lesson.overview}</p>
          </div>
          <div className="tab">
            <h3>Tài liệu</h3>
            <ul>
              {lesson.resources.map((item, idx) => (
                <li key={idx}>📄 {item}</li>
              ))}
            </ul>
          </div>
          <div className="tab">
            <h3>Ghi chú</h3>
            <textarea
              rows="5"
              placeholder="Viết ghi chú tại đây..."
              defaultValue={lesson.notes[0]}
            ></textarea>
          </div>
          <div className="tab">
            <h3>Quiz</h3>
            <a href={`/courses/${id}/quiz/${lessonId}`} className="quiz-button">Làm bài kiểm tra</a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LessonView;
