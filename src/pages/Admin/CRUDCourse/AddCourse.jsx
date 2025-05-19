import React, { useState, useEffect } from 'react';
import './AddCourse.css';
import LessonForm from '../../../component/LessonForm/LessonForm';
import { adminCreateCourse, updateLesson, createLesson, getLessonsByCourseId } from '../../../api/adminAPI/adminApiRequest';

import { useNavigate } from 'react-router-dom';


const AddCourse = ({ initialData = {}, onSubmit, mode = 'add', courseId }) => {
  
  const navigate = useNavigate();

  useEffect(() => {
    if (initialData && mode === 'edit') {

      setFormValues({
        name: initialData.name || '',
        category: initialData.category || '',
        level: initialData.level || 'Trung bình',
        price: initialData.price || '',
        discountPrice: initialData.discountPrice || '',
        description: initialData.description || '',
        image: initialData.image || '',
      });
      setLessons(initialData.lessons || []);
    }
  }, [initialData, mode]);

  useEffect(() => {
  if (mode === 'edit' && courseId) {
    getLesson(courseId);
  }
}, [mode, courseId]);

  const [formValues, setFormValues] = useState({
    name: '',
    category: '',
    level: 'Trung bình',
    price: '',
    discountPrice: '',
    description: '',
    image: '',

  });

  const [thumbnail, setThumbnail] = useState(null);

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setThumbnail(e.target.files[0]);
  };

  const urlToFile = async (url, filename, mimeType) => {
    const res = await fetch(url);
    const buffer = await res.arrayBuffer();
    return new File([buffer], filename, { type: mimeType });
  };

  
  const [lessons, setLessons] = useState(initialData.lessons || []);

  const getLesson = async (courseId) => {
    try {
      const lessons = await getLessonsByCourseId(courseId);
      console.log('Danh sách bài học:', lessons);
      setLessons(lessons);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách bài học:', error);
    }
  };

  const handleAddLesson = () => {
    setLessons(prev => [...prev, { id: null, title: '', description: '', videoUrl: '' }]);
  };

  const handleRemoveLesson = (idToRemove) => {
    setLessons(prevLessons => {
    const updated = prevLessons.filter(l => l.id !== idToRemove);
    return updated;
    });
  };

  const refreshLessons = async () => {
  const data = await getLessonsByCourseId(courseId);
  setLessons(data); // cập nhật danh sách bài học mới
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

  const saveLessons = async (courseId) => {
  try {
    for (const lesson of lessons) {
      const payload = { ...lesson, courseId };

      if (!lesson.title.trim()) continue;

      if (!lesson.id) {
        const res = await createLesson(payload);
        console.log('Đã tạo bài học mới:', res.data);
      } else {
        await updateLesson(lesson.id, payload);
        console.log('Đã cập nhật bài học:', lesson.id);
      }
    }
  } catch (error) {
    console.error('Lỗi khi lưu bài học:', error);
  }
};

  const handleSave = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', formValues.name);
    formData.append('price', formValues.price);
    formData.append('discountPrice', formValues.discountPrice);
    formData.append('level', formValues.level);
    formData.append('description', formValues.description);
    formData.append('category', formValues.category);

    if (thumbnail) {
      formData.append('image', thumbnail);
    } else if (mode === 'edit' && initialData?.thumbnail) {
      const fileFromURL = await urlToFile(
        `${BASE_URL}${initialData.thumbnail}`,
        'thumbnail.jpg',
        'image/jpeg'
      );
      formData.append('image', fileFromURL);
    }

    // for (let pair of formData.entries()) {
    //   console.log(pair[0] + ':', pair[1]);
    // }

    try {
       let newCourseId = courseId; 

      if (mode === 'edit') {
        await onSubmit(formData);
      } else {

        const res = await adminCreateCourse(formData);
        alert('Tạo khóa học thành công!');
        navigate('/admin/courses');
      }

      await saveLessons(newCourseId);
      navigate('/admin/courses');


    } catch (error) {
      console.error('Lỗi tạo khóa học:', error);
      alert('Tạo khóa học thất bại!');
    }
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
          <input name="name" value={formValues.name} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Mô tả</label>
          <textarea name="description" value={formValues.description} onChange={handleChange} 
        />
        </div>

        <div className="form-group">
          <label>Danh mục</label>
          <input name="category" value={formValues.category} onChange={handleChange}  />
        </div>

        <div className="form-group">
          <label>Độ khó</label>
          <select name="level" value={formValues.level} onChange={handleChange} >
            <option value="Dễ">Dễ</option>
            <option value="Trung bình">Trung bình</option>
            <option value="Khó">Khó</option>
          </select>
        </div>

        <div className="form-group">
          <label>Học phí</label>
          <input type="number" name="price" value={formValues.price} onChange={handleChange}  />
        </div>

        <div className="form-group">
          <label>Học phí khuyến mãi</label>
          <input type="number" name="discountPrice" value={formValues.discountPrice} onChange={handleChange}  />
        </div>

        <div className="form-group">
          <label>Ảnh bìa</label>
          <input type="file" name='image' onChange={handleFileChange} />
        </div>

        {lessons.map((lesson, index) => (
          <LessonForm key={lesson.id|| `new-${index}`}
            courseId={courseId}
            lessonIndex={index + 1}
            lesson={lesson}
            onChange={handleLessonChange}
            onRemove={() => handleRemoveLesson(lesson.id)}
            refreshLessons={refreshLessons}
             />
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
