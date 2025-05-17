import React, { useState } from 'react';
import './SingleQuiz.css';

import { AiOutlineClose } from 'react-icons/ai';

const SingleQuiz = ({ onCancel, onSave }) => {
    const [questionText, setQuestionText] = useState('');
    const [answers, setAnswers] = useState([
        { text: '', isCorrect: false },
        { text: '', isCorrect: false },
        { text: '', isCorrect: false },
        { text: '', isCorrect: false }
    ]);

    const handleAnswerChange = (index, field, value) => {
        const updated = [...answers];
        updated[index][field] = value;
        setAnswers(updated);
    };

    const handleSave = () => {
        onSave({ questionText, answers });
    };


    return (
        <div className="question-form">
            <button className='quiz-close-btn'>
                <AiOutlineClose onClick={onCancel} />
            </button>
            <h2 className='cauhoi'>Câu hỏi</h2>
            <textarea
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                placeholder="Nhập nội dung câu hỏi..."
            />

            <div className="answers-section">
                {answers.map((ans, index) => (
                    <div key={index} className="answer-item">
                        <label>
                            <input
                                type="radio"
                                name="correctAnswer"
                                checked={ans.isCorrect}
                                onChange={() => {
                                    setAnswers((prev) =>
                                        prev.map((a, i) => ({ ...a, isCorrect: i === index }))
                                    );
                                }}
                            />
                        </label>
                        <input
                            type="text"
                            value={ans.text}
                            onChange={(e) => handleAnswerChange(index, 'text', e.target.value)}
                            placeholder={`Đáp án ${index + 1}`}
                        />

                    </div>
                ))}
            </div>
        </div>
    );
};

export default SingleQuiz;
