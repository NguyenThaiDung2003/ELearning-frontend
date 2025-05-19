import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../component/Header/Header';
import Footer from '../../component/Footer/Footer';
import './LessonView.css';
import { axiosJWT } from "../../api/axiosJWT"
import axios from "axios";
import { store } from "../../redux/store";

const LessonView = () => {
  const { id: courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const [lessons, setLessons] = useState([]);
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const convertToEmbedUrl = (url) => {
  const match = url.match(/v=([^&]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : '';
};

 useEffect(() => {
  const fetchLessons = async () => {
    try {
         const user = store.getState().auth.login?.currentUser;
      const res = await axiosJWT.get(`${BASE_URL}/api/lesson/lessons-by-course/${courseId}`, {
        headers: {
            Authorization: `Bearer ${user?.accessToken}`,
        },
    });
 
      const data = res.data;
         console.log(data);
      setLessons(data);
      const selected = data.find(l => l._id === lessonId);
      setLesson(selected || null);
      console.log()
    } catch (err) {
      console.error("Lỗi khi tải bài học:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchLessons();
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
               src={convertToEmbedUrl(lesson?.videos?.[0]?.url)}
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

    
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LessonView;
