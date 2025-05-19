// import React, { useEffect, useState } from 'react';
// import Header from '../../component/Header/Header';
// import Footer from '../../component/Footer/Footer';
// import './CourseList.css';

// const CourseList = () => {
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       alert("Vui lòng đăng nhập trước khi xem khóa học.");
//       return;
//     }

//     fetch('https://elearning-backend-2kn5.onrender.com/api/course/my-courses', {
//       method: 'GET',
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     })
//       .then(res => res.json())
//       .then(data => {
//         setCourses(data.courses || []);
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error("Lỗi khi gọi API my-courses:", err);
//         setLoading(false);
//       });
//   }, []);

//   return (
//     <div className="course-list-page">
//       <Header />

//       <div className="hero-section">
//         <h1>Danh sách khóa học đã đăng ký</h1>
//         <p>Đây là các khóa học bạn đã đăng ký học tại BK Study.</p>
//       </div>

//       {loading ? (
//         <div style={{ textAlign: 'center', padding: '2rem' }}>
//           <h3>Đang tải danh sách khóa học...</h3>
//         </div>
//       ) : courses.length === 0 ? (
//         <div style={{ textAlign: 'center', padding: '2rem' }}>
//           <h3>Hiện chưa có khóa học nào được đăng ký.</h3>
//         </div>
//       ) : (
//         <div className="course-grid">
//           {courses.map((course) => (
//             <div key={course._id} className="course-card">
//               <img src={course.image} alt={course.name} />
//               <div className="card-body">
//                 <h3>{course.name}</h3>
//                 <p className="meta">📁 {course.category} | 🎓 {course.level}</p>
//                 <p className="price">
//                   {course.discountPrice
//                     ? <span>{course.discountPrice.toLocaleString()}đ <s>{course.price.toLocaleString()}đ</s></span>
//                     : course.price === 0
//                       ? 'Miễn phí'
//                       : `${course.price.toLocaleString()}đ`}
//                 </p>
//                 <p className="uploaded">🕒 {new Date(course.createdAt).toLocaleDateString()}</p>
//                 <p className="description">{course.description}</p>
//                 <div className="home-buttons">
//                   <button className="btn-register" disabled style={{ backgroundColor: "#ccc" }}>
//                     Đã đăng ký
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       <Footer />
//     </div>
//   );
// };

// export default CourseList;






import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../component/Header/Header';
import Footer from '../../component/Footer/Footer';
import './CourseList.css';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [filters, setFilters] = useState({ category: '', level: '', type: '', sort: '' });
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://elearning-backend-2kn5.onrender.com/api/course/get-courses')
      .then(res => res.json())
      .then(data => setCourses(data.courses))
      .catch(err => console.error("Lỗi khi tải danh sách khóa học!"));
  }, []);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    setPage(1);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const filteredCourses = courses
    .filter(course => {
      const matchSearch = course.name.toLowerCase().includes(search.toLowerCase());
      const matchCategory = filters.category ? course.category === filters.category : true;
      const matchLevel = filters.level ? course.level === filters.level : true;
      const matchType = filters.type
        ? (filters.type === 'Miễn phí' ? course.price === 0 : course.price > 0)
        : true;
      return matchSearch && matchCategory && matchLevel && matchType;
    })
    .sort((a, b) => {
      if (filters.sort === 'Mới nhất') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      return 0;
    });

  const coursesPerPage = 8;
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
  const paginatedCourses = filteredCourses.slice((page - 1) * coursesPerPage, page * coursesPerPage);

  return (
    <div className="home-page">
      <Header />

      <div className="search-filter">
        <div className="search-container">
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Tìm kiếm khóa học..."
            className="search-input"
          />
          <div className="filters">
            <select name="category" onChange={handleFilterChange}>
              <option value="">Danh mục</option>
              <option>AI</option>
              <option>Data</option>
              <option>DevOps</option>
              <option>Mobile</option>
              <option>Web</option>
            </select>
            <select name="level" onChange={handleFilterChange}>
              <option value="">Trình độ</option>
              <option>Dễ</option>
              <option>Trung bình</option>
              <option>Khó</option>
            </select>
            <select name="type" onChange={handleFilterChange}>
              <option value="">Hình thức</option>
              <option>Miễn phí</option>
              <option>Trả phí</option>
            </select>
            <select name="sort" onChange={handleFilterChange}>
              <option value="">Sắp xếp theo</option>
              <option>Mới nhất</option>
            </select>
          </div>
        </div>
      </div>

      <div className="course-grid">
        {paginatedCourses.map((course) => (
          <div key={course._id} className="course-card">
            <img src={course.image} alt={course.name} />
            <div className="card-body">
              <h3>{course.name}</h3>
              <p className="meta">📁 {course.category} | 🎓 {course.level}</p>
              <p className="price">
                {course.discountPrice
                  ? <span>{course.discountPrice.toLocaleString()}đ <s>{course.price.toLocaleString()}đ</s></span>
                  : course.price === 0
                    ? 'Miễn phí'
                    : `${course.price.toLocaleString()}đ`}
              </p>
              <p className="uploaded">🕒 {new Date(course.createdAt).toLocaleDateString()}</p>
              <p className="description">{course.description}</p>
              <div className="home-buttons">
                <button
                  className="btn-register"
                  onClick={() => navigate(`/courses/${course._id}`)}
                >
                  Xem chi tiết
                </button>
              </div>
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
