import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../component/Header/Header';
import Footer from '../../component/Footer/Footer';
import questions from './quiz.json';
import './QuizPage.css';

const QuizPage = () => {
  const { id, quizId } = useParams();
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleNext = () => {
    if (selected === questions[current].answer) {
      setScore(score + 1);
    }
    setSelected(null);
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setSubmitted(true);
    }
  };

  return (
    <div className="quiz-page">
      <Header />
      <div className="quiz-container">
        <h2>Bài kiểm tra hôm nay</h2>

        {!submitted ? (
          <div className="question-box">
            <p><strong>Câu {current + 1}:</strong> {questions[current].question}</p>
            <ul className="options">
              {questions[current].options.map((opt, idx) => (
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
            <p>Điểm số: {score} / {questions.length}</p>
            <a href={`/courses/${id}/lesson/${quizId}`} className="return-button">Quay lại bài học</a>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default QuizPage;
