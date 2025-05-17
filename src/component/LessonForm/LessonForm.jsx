import React from 'react';
import './LessonForm.css';
import SingleQuiz from './SingleQuiz/SingleQuiz';
import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

export default function LessonForm({ lesson, onChange, onRemove }) {

  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  const [quizzes, setQuizzes] = useState([]);

  const handleAddQuiz = () => {
    setQuizzes(prev => [...prev, { id: Date.now() }]);
  };

  const handleRemoveQuiz = (id) => {
    setQuizzes(prev => prev.filter(q => q.id !== id));
  };

  const handleSaveQuiz = (id, data) => {
    setQuizzes(prev =>
      prev.map(q => (q.id === id ? { ...q, ...data } : q))
    );
  };
  return (
    <div className="lesson-form">

      <button className="close-button" onClick={onRemove}>
        <AiOutlineClose className="lesson-close-icon" size={24} />
      </button>
      <form>
        <div className="info-group">


          <label>Tên bài học</label>
          <input type="text" name="title"
            value={lesson.title || ''}
            onChange={e => onChange(lesson.id, 'title', e.target.value)}
            placeholder="Nhập tên bài học" />

          <label>Mô tả</label>
          <textarea name="description" placeholder="Mô tả ngắn về bài học..." />

          <label>Tài liệu </label>
          <input type="file" name="material" />

          <label>URL video bài giảng</label>
          <input type="url" name="videoUrl" placeholder="https://..." />

        </div>

        <div className="quiz-area">
          <label>Bài kiểm tra</label>

          {quizzes.map(quiz => (
        <SingleQuiz
          key={quiz.id}
          onCancel={() => handleRemoveQuiz(quiz.id)}
          onSave={(data) => handleSaveQuiz(quiz.id, data)}
        />
      ))}
      
          <div className="just-button">
          <button type="button" className="btn btn-secondary" onClick={handleAddQuiz}>
            Thêm câu hỏi
          </button>
        </div>
        </div>

        <div className="submit-area">
          <button type="submit" class="cancel" >Huỷ</button>
          <button type="submit" class="submit">Lưu</button>
        </div>

      </form>
    </div>
  );
}
