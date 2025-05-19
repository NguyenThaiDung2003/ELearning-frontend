import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../component/Header/Header';
import Footer from '../../component/Footer/Footer';
import './QuizPage.css';
import { axiosJWT } from "../../api/axiosJWT"
import axios from "axios";
import { store } from "../../redux/store";
const QuizPage = () => {
  const { id, quizId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
useEffect(() => {
  const fetchQuiz = async () => {

    try {
            const user = store.getState().auth.login?.currentUser;
      const res = await axios.get(`${BASE_URL}/api/quiz/quizzes-by-course/${id}`,{
        headers: {
            Authorization: `Bearer ${user?.accessToken}`,
        },
    });
      const data = res.data;
      const found = data.find((q) => q._id === quizId);
      setQuiz(found || null);
    } catch (error) {
      console.error('Lỗi khi tải quiz:', error);
    } finally {
      setLoading(false);
    }
  };

  fetchQuiz();
}, [id, quizId]);

  const handleNext = () => {
    if (selected === quiz.questions[current].correctAnswer) {
      setScore(score + 1);
    }
    setSelected(null);
    if (current + 1 < quiz.questions.length) {
      setCurrent(current + 1);
    } else {
      setSubmitted(true);
    }
  };

  if (loading) {
    return (
      <div className="quiz-page">
        <Header />
        <div className="quiz-container">
          <p>Đang tải bài kiểm tra...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="quiz-page">
        <Header />
        <div className="quiz-container">
          <p>Không tìm thấy bài kiểm tra.</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="quiz-page">
      <Header />
      <div className="quiz-container">
        <h2>{quiz.title}</h2>

        {!submitted ? (
          <div className="question-box">
            <p><strong>Câu {current + 1}:</strong> {quiz.questions[current].question}</p>
            <ul className="options">
              {quiz.questions[current].options.map((opt, idx) => (
                <li key={idx}>
                  <label>
                    <input
                      type="radio"
                      name="option"
                      value={idx}
                      checked={selected === idx}
                      onChange={() => setSelected(idx)}
                    />
                    {opt}
                  </label>
                </li>
              ))}
            </ul>
            <button onClick={handleNext} disabled={selected === null}>Tiếp theo</button>
          </div>
        ) : (
          <div className="result-box">
            <h3>Kết quả</h3>
            <p>Điểm số: {score} / {quiz.questions.length}</p>
            <a href={`/courses/${id}`} className="return-button">Quay lại khóa học</a>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default QuizPage;
