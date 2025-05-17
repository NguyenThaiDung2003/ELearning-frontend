import React, { useState } from 'react';
import './AddCourse.css';
import LessonForm from '../../../component/LessonForm/LessonForm';
import { useNavigate } from 'react-router-dom';

const AddCourse = ({ initialData = {}, onSubmit, mode = 'add' }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: initialData.name || '',
    description: initialData.description || '',
    category: initialData.category || '',
    difficulty: initialData.difficulty || 'Trung bình',
    price: initialData.price || '',
    discountPrice: initialData.discountPrice || ''
  });

  const [lessons, setLessons] = useState(initialData.lessons || []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

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
        updatedLessons[lessonIndex] = {
          ...updatedLessons[lessonIndex],
          [field]: value
        };
        return updatedLessons;
      }
      return prevLessons;
    });
  };

  const handleSave = () => {
    const fullData = { ...form, lessons };
    console.log(`${mode === 'edit' ? 'Cập nhật' : 'Lưu'} khóa học:`, fullData);
    if (onSubmit) {
      onSubmit(fullData); // gửi về component cha
    }
    alert(`${mode === 'edit' ? 'Đã cập nhật' : 'Đã lưu'} khóa học!`);
    navigate('/admin/courses');
  };

  const handleCancel = () => {
    if (window.confirm('Bạn có chắc muốn huỷ không?')) {
      // setForm({
      //   name: '',
      //   description: '',
      //   category: '',
      //   difficulty: 'Trung bình',
      //   price: '',
      //   discountPrice: ''
      // });
      // setLessons([]);
      navigate('/admin/courses');
    }
    
  };

  return (
    <div>
      <div className="ad-course-title">
        <h1>{mode === 'edit' ? 'Chỉnh sửa khóa học' : 'Thêm khóa học'}  </h1>
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
