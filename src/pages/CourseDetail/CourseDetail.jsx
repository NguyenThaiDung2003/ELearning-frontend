import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../component/Header/Header';
import Footer from '../../component/Footer/Footer';
import './CourseDetail.css';

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const course = {
    title: "Thiết kế UI chuyên sâu",
    instructor: "Võ Thị E",
    lessons: ["Phân tích yêu cầu", "Sketch và Wireframe", "Nguyên mẫu"],
    description: "Thiết kế giao diện hiện đại, theo xu hướng mới nhất."
  };

  return (
    <div className="course-detail-page">
      <Header />

      <div className="container">
        <div className="main-content">
          <h1 className="course-title">{course.title}</h1>
          <p className="course-instructor">Giảng viên: {course.instructor}</p>
          <p className="course-description">{course.description}</p>

          <h2>Nội dung khóa học</h2>
          <ul className="lesson-list">
            {course.lessons.map((lesson, idx) => (
              <li key={idx}>
                <button
                  className="lesson-link"
                  onClick={() => navigate(`/courses/${id}/lesson/${idx + 1}`)}
                >
                  📘 {lesson}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CourseDetail;





// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Header from '../../component/Header/Header';
// import Footer from '../../component/Footer/Footer';
// import './CourseList.css';

// const CourseList = () => {
//   const [courses, setCourses] = useState([]);
//   const [filters, setFilters] = useState({ category: '', level: '', type: '', sort: '' });
//   const [page, setPage] = useState(1);
//   const [search, setSearch] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       alert('Vui lòng đăng nhập để xem khóa học.');
//       navigate('/login');
//       return;
//     }

//     fetch('http://localhost:5000/api/course/my-courses', {
//       headers: {
//         Authorization: 'Bearer ' + token
//       }
//     })
//       .then(res => res.json())
//       .then(data => setCourses(data))
//       .catch(err => console.error('Lỗi lấy danh sách khóa học:', err));
//   }, [navigate]);

//   const handleFilterChange = (e) => {
//     setFilters({ ...filters, [e.target.name]: e.target.value });
//     setPage(1);
//   };

//   const handleSearchChange = (e) => {
//     setSearch(e.target.value);
//     setPage(1);
//   };

//   const handleDetail = async (courseId) => {
//     const token = localStorage.getItem('token');
//     try {
//       const res = await fetch(`http://localhost:5000/api/lesson/lessons-by-course/${courseId}`, {
//         headers: {
//           Authorization: 'Bearer ' + token
//         }
//       });
//       const lessons = await res.json();
//       localStorage.setItem('lessons', JSON.stringify(lessons));
//       navigate(`/courses/${courseId}`);
//     } catch (err) {
//       console.error('Lỗi tải bài học:', err);
//       alert('Không thể tải bài học.');
//     }
//   };

//   const filteredCourses = courses
//     .filter(course => {
//       const matchSearch = course.name.toLowerCase().includes(search.toLowerCase());
//       const matchCategory = filters.category ? course.category === filters.category : true;
//       const matchLevel = filters.level ? course.level === filters.level : true;
//       const matchType = filters.type
//         ? (filters.type === 'Miễn phí' ? course.price === 0 : course.price > 0)
//         : true;
//       return matchSearch && matchCategory && matchLevel && matchType;
//     })
//     .sort((a, b) => {
//       switch (filters.sort) {
//         case 'Mới nhất': return new Date(b.createdAt) - new Date(a.createdAt);
//         case 'Phổ biến': return (b.students || 0) - (a.students || 0);
//         case 'Đánh giá cao': return (b.rating || 0) - (a.rating || 0);
//         default: return 0;
//       }
//     });

//   const coursesPerPage = 8;
//   const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
//   const paginatedCourses = filteredCourses.slice((page - 1) * coursesPerPage, page * coursesPerPage);

//   return (
//     <div className="course-list-page">
//       <Header />

//       <div className="search-filter">
//         <div className="search-container">
//           <input
//             type="text"
//             value={search}
//             onChange={handleSearchChange}
//             placeholder="Tìm kiếm khóa học..."
//             className="search-input"
//           />
//           <div className="filters">
//             <select name="category" onChange={handleFilterChange}>
//               <option value="">Danh mục</option>
//               <option>Lập trình</option>
//               <option>Thiết kế</option>
//               <option>Marketing</option>
//               <option>Ngoại ngữ</option>
//             </select>
//             <select name="level" onChange={handleFilterChange}>
//               <option value="">Trình độ</option>
//               <option>Cơ bản</option>
//               <option>Nâng cao</option>
//               <option>Mọi trình độ</option>
//             </select>
//             <select name="type" onChange={handleFilterChange}>
//               <option value="">Hình thức</option>
//               <option>Miễn phí</option>
//               <option>Trả phí</option>
//             </select>
//             <select name="sort" onChange={handleFilterChange}>
//               <option value="">Sắp xếp theo</option>
//               <option>Mới nhất</option>
//               <option>Phổ biến</option>
//               <option>Đánh giá cao</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       <div className="course-grid">
//         {paginatedCourses.map((course) => (
//           <div key={course._id} className="course-card">
//             <img src={course.image || 'https://via.placeholder.com/300x180'} alt="Thumbnail" />
//             <div className="card-body">
//               <h3>{course.name}</h3>
//               <p className="instructor">GV. {course.instructor || 'Chưa cập nhật'}</p>
//               <p className="meta">📁 {course.category} | 🎓 {course.level}</p>
//               <p className="rating">⭐ {course.rating || 'Chưa có'} ({course.students || 0} học viên)</p>
//               <p className="uploaded">🕒 {new Date(course.createdAt).toLocaleDateString()}</p>
//               <p className="price">{course.price === 0 ? 'Miễn phí' : `${course.price.toLocaleString()}đ`}</p>
//               <button className="btn-detail" onClick={() => handleDetail(course._id)}>Xem chi tiết</button>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="pagination">
//         {Array.from({ length: totalPages }).map((_, i) => (
//           <button key={i + 1} onClick={() => setPage(i + 1)} className={page === i + 1 ? 'active' : ''}>
//             {i + 1}
//           </button>
//         ))}
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default CourseList;
