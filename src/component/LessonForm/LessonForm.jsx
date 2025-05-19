import React from 'react';
import './LessonForm.css';
import SingleQuiz from './SingleQuiz/SingleQuiz';
import { useState, useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { createLesson, updateLesson, deleteLesson, createQuiz, getQuizzesByCourseId } from '../../api/adminAPI/adminApiRequest';

export default function LessonForm({ lesson, lessonIndex, onChange, onRemove, courseId, refreshLessons }) {

  const [lessonData, setLessonData] = useState(lesson);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLessonData(prev => ({ ...prev, [name]: value }));
    onChange(lesson._id, name, value);
  }

  const fetchQuizzesByCourse = async (courseId) => {
  try {
    const response = await getQuizzesByCourseId(courseId); // API trả về mảng quiz
    return response.data;  // Giả sử là mảng quiz
  } catch (error) {
    console.error('Lỗi lấy quiz theo courseId:', error);
    return [];
  }
};

  const handleSave = (data) => {
    setLessonData(prev => ({ ...prev, ...data }));
  };

  useEffect(() => {
    const fetchQuizzes = async () => {
      const www = await fetchQuizzesByCourse(courseId);
      console.log("Quizzes:", www);
    };
  }, [lessonData._id, courseId]);


  const handleRemoveLesson = async () => {
    const confirmDelete = window.confirm('Bạn có chắc muốn xoá bài học này không?');
    if (!confirmDelete) return;

    if (lessonData._id) {
      try {
        await deleteLesson(lessonData._id);
        alert('Xoá bài học thành công!');

      } catch (err) {
        console.error('Lỗi khi xoá bài học:', err);
        alert('Xoá bài học thất bại!');
        return;
      }
      onRemove(lessonData._id);
      await refreshLessons();
    }
  };

  const [quizzes, setQuizzes] = useState([]);

  const handleSubmit = async (e) => {

    e.preventDefault();

    const payload = {
      courseId: courseId,
      order: lessonData.order,
      title: lessonData.title,
      description: lessonData.description,
      videos: [
        {
          title: "Video bài giảng",
          url: lessonData.videoUrl,
          duration: "undefined",
        }
      ],
    };

    try {
      if (lessonData?._id) {

        await updateLesson(lessonData._id, payload);
        console.log("Đã cập nhật bài học!", lessonData._id, payload);
        console.log("Đã cập nhật bài học!");
      } else {

        const res = await createLesson(payload);
        console.log("Đã tạo bài học mới!", res.data);
        await refreshLessons();

      }

      alert("Lưu bài học thành công!");
    } catch (err) {
      console.error("Lỗi khi lưu bài học:", err);
      alert("Có lỗi khi lưu bài học.");
    }

    if (quizzes.length > 0)  // Nếu có quiz thì mới tạo
    {
      const questionlist = quizzes.map((q, idx) => ({
      question: q.questionText,
      options: q.answers.map(a => a.text),
      correctAnswer: q.answers.findIndex(a => a.isCorrect),
    }));

    const quizpayload = {
      courseId,
      order: lessonIndex,
      title: "Bài kiểm tra",
      description: "Kiểm tra cuối bài học",

      questions: questionlist // 👈 gộp quiz vào payload nếu cần
    };

    try {
      if (lessonData?._id) {
        await updateLesson(lessonData._id, quizpayload);
        console.log("Đã cập nhật bài kiểm tra!", lessonData._id, quizpayload);
      } else {
        const res = await createQuiz(quizpayload);
        console.log("Đã tạo bài kiểm tra mới!", res.data);
      }

      alert("Lưu bài kiểm tra thành công!");
    } catch (err) {
      console.error("Lỗi khi lưu bài kiểm tra:", err);
      alert("Có lỗi khi lưu bài kiểm tra.");
    }

    }
    
  };




  const handleAddQuiz = () => {
    setQuizzes(prev => [...prev, { _id: Date.now() }]);
  };

  const handleRemoveQuiz = (_id) => {
    setQuizzes(prev => prev.filter(q => q._id !== _id));
  };

  const handleSaveQuiz = (_id, data) => {
    setQuizzes(prev =>
      prev.map(q => (q._id === _id ? { ...q, ...data } : q))
    );
  };
  return (
    <div className="lesson-form">

      <button className="close-button" onClick={lesson._id ? handleRemoveLesson : onRemove}>
        <AiOutlineClose className="lesson-close-icon" size={24} />
      </button>
      <form onSubmit={handleSubmit}>
        <div className="info-group" >

          <label>Bài học số</label>
          <input type="number" name="order" placeholder="Bài học số"
            value={lessonData.order || ''}
            onChange={handleInputChange}
          />

          <label>Tên bài học</label>
          <input type="text" name="title"
            value={lessonData.title || ''}
            onChange={handleInputChange}
            placeholder="Nhập tên bài học" />

          <label>Mô tả</label>
          <textarea name="description" placeholder="Mô tả ngắn về bài học..."
            onChange={handleInputChange}
            value={lessonData.description || ''}
          />

          <label>Tài liệu </label>
          <input type="file" name="material" />

          <label>URL video bài giảng</label>
          <input type="url" name="videoUrl" placeholder="https://..."
            value={lessonData.videoUrl || ''}
            onChange={handleInputChange}
          />

        </div>

        <div className="quiz-area">
          <label>Bài kiểm tra</label>

          {quizzes.map(quiz => (
            <SingleQuiz
              key={quiz._id}
              quiz={quiz}
              onCancel={() => handleRemoveQuiz(quiz._id)}
              onSave={(data) => handleSaveQuiz(quiz._id, data)}
            />
          ))}


          <div className="just-button">
            <button type="button" className="btn btn-secondary" onClick={handleAddQuiz}>
              Thêm câu hỏi
            </button>
          </div>
        </div>

        <div className="submit-area">
          <button type="submit" class="submit" >{lesson._id ? "Lưu thay đổi" : "Thêm"}</button>
        </div>

      </form>
    </div>
  );
}
