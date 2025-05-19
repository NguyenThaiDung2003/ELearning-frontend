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
import { registerCourse, fetchUserCourses } from "../../api/apiRequest";
import { toast } from 'react-toastify';
import './CourseList.css';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [registeredCourses, setRegisteredCourses] = useState([]); // 🔸
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadRegisteredCourses = async () => {
      try {
        const userCourses = await fetchUserCourses(); // 👈 hàm gọi API lấy khóa học đã đăng ký
        setRegisteredCourses(userCourses); // lưu full thông tin khóa học
      } catch (error) {
        toast.error("Lỗi khi tải khóa học đã đăng ký!");
      }
    };
    loadRegisteredCourses();
  }, []);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const filteredCourses = registeredCourses.filter(course =>
    course.name.toLowerCase().includes(search.toLowerCase())
  );

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
            placeholder="Tìm kiếm trong khóa học đã đăng ký..."
            className="search-input"
          />
        </div>
      </div>

      <div className="course-grid">
        {paginatedCourses.length === 0 ? (
          <p style={{ textAlign: 'center', marginTop: 40 }}>Bạn chưa đăng ký khóa học nào.</p>
        ) : (
          paginatedCourses.map((course) => (
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
          ))
        )}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button key={i + 1} onClick={() => setPage(i + 1)} className={page === i + 1 ? 'active' : ''}>
              {i + 1}
            </button>
          ))}
        </div>
      )}

      <Footer />
    </div>
  );
};

export default CourseList;
