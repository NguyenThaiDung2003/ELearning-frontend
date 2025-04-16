import React, { useState } from 'react';
import './AddCourse.css';
import LessonForm from '../../../component/LessonForm/LessonForm';

const AddCourse = () => {
  const [form, setForm] = useState({
    name: '',
    description: '',
    category: '',
    difficulty: 'Trung bình',
    price: '',
    discountPrice: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const [lessons, setLessons] = useState([]);

  const handleAddLesson = () => {
    setLessons(prev => [...prev, { id: Date.now() }]);
  };

  const handleRemoveLesson = (idToRemove) => {
    setLessons(prevLessons => prevLessons.filter(l => l.id !== idToRemove));
  };

  const handleLessonChange = (id, field, value) => {
    setLessons(prevLessons => {
      const lessonIndex = prevLessons.findIndex(l => l.id === id);
      if (lessonIndex !== -1) {
        const updatedLessons = [...prevLessons];
        updatedLessons[lessonIndex] = {...updatedLessons[lessonIndex],
          [field]: value
        };
        return updatedLessons;
      }
      return prevLessons;
    });
  };
  const handleSave = () => {
    console.log('Lưu khóa học:', form);
    alert('Đã lưu khóa học!');
  };

  const handleCancel = () => {
    if (window.confirm('Bạn có chắc muốn huỷ không?')) {
      setForm({
        name: '',
        description: '',
        category: '',
        difficulty: 'Trung bình',
        price: '',
        discountPrice: ''
      });
    }
  };

  return (
    <div>
      <div className="ad-course-title">
        <h1>Thêm khóa học</h1>
      </div>

      <div className="add-course-form">
        <div className="form-group">
          <label>Tên khóa học</label>
          <input name="name" value={form.name} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Mô tả</label>
          <textarea name="description" value={form.description} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Danh mục</label>
          <input name="category" value={form.category} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Độ khó</label>
          <select name="difficulty" value={form.difficulty} onChange={handleChange}>
            <option value="Dễ">Dễ</option>
            <option value="Trung bình">Trung bình</option>
            <option value="Khó">Khó</option>
          </select>
        </div>

        <div className="form-group">
          <label>Học phí</label>
          <input type="number" name="price" value={form.price} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Học phí khuyến mãi</label>
          <input type="number" name="discountPrice" value={form.discountPrice} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Ảnh bìa</label>
          <input type="file" accept="image/*" />
        </div>

        {lessons.map((lesson, index) => (
          <LessonForm key={lesson.id}
            lessonIndex={index + 1}
            lesson={lesson}
            onChange={handleLessonChange}
            onRemove={() => handleRemoveLesson(lesson.id)} />
        ))}

        <div className="just-button">
          <button type="button" className="btn btn-secondary" onClick={handleAddLesson}>
            Thêm bài học
          </button>
        </div>

        <div className="form-actions">
          <button className="btn btn-cancel" onClick={handleCancel}>Huỷ</button>
          <button className="btn btn-save" onClick={handleSave}>Lưu</button>
        </div>
      </div>

    </div>
  );
};

export default AddCourse;
