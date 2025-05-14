import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../component/Header/Header';
import Footer from '../../component/Footer/Footer';
import './CourseList.css';

const mockCourses = Array.from({ length: 100 }).map((_, i) => {
  const daysAgo = Math.floor(Math.random() * 60);
  const uploadDate = new Date();
  uploadDate.setDate(uploadDate.getDate() - daysAgo);
  const formattedDate = uploadDate.toISOString().split('T')[0];

  return {
    id: 'course-' + (i + 1),
    title: `Khóa học ${i + 1}`,
    instructor: 'Giảng viên ' + String.fromCharCode(65 + i),
    category: ['Lập trình', 'Thiết kế', 'Marketing', 'Ngoại ngữ'][i % 4],
    level: ['Cơ bản', 'Nâng cao', 'Mọi trình độ'][i % 3],
    type: i % 2 === 0 ? 'Miễn phí' : 'Trả phí',
    rating: (Math.random() * 1.5 + 3.5).toFixed(1),
    students: Math.floor(Math.random() * 1000 + 100),
    price: i % 2 === 0 ? 0 : Math.floor(Math.random() * 300000 + 100000),
    uploaded: formattedDate,
    thumbnail: 'https://via.placeholder.com/300x180'
  };
});

const CourseList = () => {
  const [filters, setFilters] = useState({ category: '', level: '', type: '', sort: '' });
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    setPage(1); // reset to first page when filtering
  };

  const filteredCourses = mockCourses
    .filter(course => {
      const categoryMatch = filters.category ? course.category === filters.category : true;
      const levelMatch = filters.level ? course.level === filters.level : true;
      const typeMatch = filters.type ? course.type === filters.type : true;
      return categoryMatch && levelMatch && typeMatch;
    })
    .sort((a, b) => {
      switch (filters.sort) {
        case 'Mới nhất':
          return new Date(b.uploaded) - new Date(a.uploaded);
        case 'Phổ biến':
          return b.students - a.students;
        case 'Đánh giá cao':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

  const coursesPerPage = 8;
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
  const paginatedCourses = filteredCourses.slice((page - 1) * coursesPerPage, page * coursesPerPage);

  return (
    <div className="course-list-page">
      <Header />

      <div className="search-filter">
        <div className="search-container">
          <input type="text" placeholder="Tìm kiếm khóa học..." className="search-input" />
          <div className="filters">
            <select name="category" onChange={handleFilterChange}>
              <option value="">Danh mục</option>
              <option>Lập trình</option>
              <option>Thiết kế</option>
              <option>Marketing</option>
              <option>Ngoại ngữ</option>
            </select>
            <select name="level" onChange={handleFilterChange}>
              <option value="">Trình độ</option>
              <option>Cơ bản</option>
              <option>Nâng cao</option>
              <option>Mọi trình độ</option>
            </select>
            <select name="type" onChange={handleFilterChange}>
              <option value="">Hình thức</option>
              <option>Miễn phí</option>
              <option>Trả phí</option>
            </select>
            <select name="sort" onChange={handleFilterChange}>
              <option value="">Sắp xếp theo</option>
              <option>Mới nhất</option>
              <option>Phổ biến</option>
              <option>Đánh giá cao</option>
            </select>
          </div>
        </div>
      </div>

      <div className="course-grid">
        {paginatedCourses.map((course) => (
          <div key={course.id} className="course-card">
            <img src={course.thumbnail} alt="Thumbnail" />
            <div className="card-body">
              <h3>{course.title}</h3>
              <p className="instructor">GV. {course.instructor}</p>
              <p className="meta">📁 {course.category} | 🎓 {course.level} | 💳 {course.type}</p>
              <p className="rating">⭐ {course.rating} ({course.students} học viên)</p>
              <p className="uploaded">🕒 Tải lên: {course.uploaded}</p>
              <p className="price">{course.price === 0 ? 'Miễn phí' : `${course.price.toLocaleString()}đ`}</p>
              <button className="btn-detail" onClick={() => navigate(`/courses/${course.id}`)}>Xem chi tiết</button>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button key={i + 1} onClick={() => setPage(i + 1)} className={page === i + 1 ? 'active' : ''}>
            {i + 1}
          </button>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default CourseList;
