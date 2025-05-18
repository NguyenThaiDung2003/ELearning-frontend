// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Header from '../../component/Header/Header';
// import Footer from '../../component/Footer/Footer';
// import './HomePage.css';

// const mockCourses = Array.from({ length: 100 }).map((_, i) => ({
//   id: 'home-course-' + (i + 1),
//   title: `Khóa học ${i + 1}`,
//   instructor: 'Giảng viên ' + String.fromCharCode(65 + i),
//   category: ['Lập trình', 'Thiết kế', 'Marketing', 'Ngoại ngữ'][i % 4],
//   level: ['Cơ bản', 'Nâng cao', 'Mọi trình độ'][i % 3],
//   type: i % 2 === 0 ? 'Miễn phí' : 'Trả phí',
//   rating: (Math.random() * 1.5 + 3.5).toFixed(1),
//   students: Math.floor(Math.random() * 1000 + 100),
//   price: i % 2 === 0 ? 0 : Math.floor(Math.random() * 300000 + 100000),
//   uploaded: new Date(Date.now() - i * 86400000).toISOString().split('T')[0],
//   thumbnail: 'https://via.placeholder.com/300x180'
// }));

// const HomePage = () => {
//   const navigate = useNavigate();
//   const [filters, setFilters] = useState({ category: '', level: '', type: '', sort: '' });
//   const [page, setPage] = useState(1);
//   const [search, setSearch] = useState('');

//   const handleFilterChange = (e) => {
//     setFilters({ ...filters, [e.target.name]: e.target.value });
//     setPage(1);
//   };

//   const handleSearchChange = (e) => {
//     setSearch(e.target.value);
//     setPage(1);
//   };

//   const filteredCourses = mockCourses
//     .filter(course => {
//       const matchSearch = course.title.toLowerCase().includes(search.toLowerCase());
//       const matchCategory = filters.category ? course.category === filters.category : true;
//       const matchLevel = filters.level ? course.level === filters.level : true;
//       const matchType = filters.type ? course.type === filters.type : true;
//       return matchSearch && matchCategory && matchLevel && matchType;
//     })
//     .sort((a, b) => {
//       switch (filters.sort) {
//         case 'Mới nhất':
//           return new Date(b.uploaded) - new Date(a.uploaded);
//         case 'Phổ biến':
//           return b.students - a.students;
//         case 'Đánh giá cao':
//           return b.rating - a.rating;
//         default:
//           return 0;
//       }
//     });

//   const coursesPerPage = 8;
//   const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
//   const paginatedCourses = filteredCourses.slice((page - 1) * coursesPerPage, page * coursesPerPage);

//   return (
//     <div className="home-page">
//       <Header />

//       <div className="hero-section">
//         <h1>Chào mừng đến với BK Study</h1>
//         <p>Khám phá hàng trăm khóa học hấp dẫn từ giảng viên uy tín</p>
//       </div>

//       <div className="search-filter">
//         <div className="search-container">
//           <div style={{ position: 'relative', width: '100%' }}>
//             <input
//               type="text"
//               value={search}
//               onChange={handleSearchChange}
//               placeholder="Tìm kiếm khóa học..."
//               className="search-input"
//             />
//           </div>
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
//           <div key={course.id} className="course-card">
//             <img src={course.thumbnail} alt="Thumbnail" />
//             <div className="card-body">
//               <h3>{course.title}</h3>
//               <p className="instructor">GV. {course.instructor}</p>
//               <p className="meta">📁 {course.category} | 🎓 {course.level} | 💳 {course.type}</p>
//               <p className="rating">⭐ {course.rating} ({course.students} học viên)</p>
//               <p className="uploaded">🕒 Tải lên: {course.uploaded}</p>
//               <p className="price">{course.price === 0 ? 'Miễn phí' : `${course.price.toLocaleString()}đ`}</p>
//               <div className="home-buttons">
//                 <button className="btn-intro" onClick={() => navigate(`/courses/${course.id}`)}>Xem giới thiệu</button>
//                 <button className="btn-register" onClick={() => navigate('/register')}>Đăng ký</button>
//               </div>
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

// export default HomePage;





import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../../component/Header/Header';
import Footer from '../../component/Footer/Footer';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [filters, setFilters] = useState({ category: '', level: '', type: '', sort: '' });
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [loadingCourseId, setLoadingCourseId] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/course/get-courses')
      .then(res => res.json())
      .then(data => setCourses(data))
      .catch(err => toast.error("Lỗi khi tải danh sách khóa học!"));
  }, []);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    setPage(1);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleRegister = async (courseId, price) => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.warn('Vui lòng đăng nhập trước khi đăng ký!');
      return navigate('/login');
    }

    try {
      setLoadingCourseId(courseId);

      if (price > 0) {
        toast.info('Đang tạo đơn PayPal...');
        const createRes = await fetch('http://localhost:5000/api/paypal/create-order', {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ amount: price }),
        });

        const createData = await createRes.json();
        if (createData?.approvalUrl) {
          window.open(createData.approvalUrl, '_blank');
        }

        const confirm = window.confirm('Sau khi thanh toán, hãy xác nhận để tiếp tục đăng ký.');
        if (!confirm) return;

        await fetch(`http://localhost:5000/api/paypal/capture-order/${courseId}`, {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ paymentId: 'PAYPAL_PAYMENT_ID_SAMPLE' }) // Thay thế bằng real paymentId nếu cần
        });
      }

      const regRes = await fetch('http://localhost:5000/api/register-course/register', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ courseId }),
      });

      if (regRes.ok) {
        toast.success('Đăng ký thành công!');
      } else {
        const err = await regRes.json();
        toast.error('Đăng ký thất bại: ' + (err.message || 'Không rõ lỗi'));
      }
    } catch (error) {
      toast.error('Lỗi hệ thống: ' + error.message);
    } finally {
      setLoadingCourseId(null);
    }
  };

  const filteredCourses = courses
    .filter(course => {
      const matchSearch = course.name.toLowerCase().includes(search.toLowerCase());
      const matchCategory = filters.category ? course.category === filters.category : true;
      const matchLevel = filters.level ? course.level === filters.level : true;
      const matchType = filters.type
        ? (filters.type === "Miễn phí" ? course.price === 0 : course.price > 0)
        : true;
      return matchSearch && matchCategory && matchLevel && matchType;
    })
    .sort((a, b) => {
      switch (filters.sort) {
        case 'Mới nhất':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'Phổ biến':
          return (b.students || 0) - (a.students || 0);
        case 'Đánh giá cao':
          return (b.rating || 0) - (a.rating || 0);
        default:
          return 0;
      }
    });

  const coursesPerPage = 8;
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
  const paginatedCourses = filteredCourses.slice((page - 1) * coursesPerPage, page * coursesPerPage);

  return (
    <div className="home-page">
      <Header />
      <ToastContainer />

      <div className="hero-section">
        <h1>Chào mừng đến với BK Study</h1>
        <p>Khám phá hàng trăm khóa học hấp dẫn từ giảng viên uy tín</p>
      </div>

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
          <div key={course._id} className="course-card">
            <img src={course.image || 'https://via.placeholder.com/300x180'} alt="Thumbnail" />
            <div className="card-body">
              <h3>{course.name}</h3>
              <p className="instructor">GV. {course.instructor || 'Chưa cập nhật'}</p>
              <p className="meta">📁 {course.category} | 🎓 {course.level}</p>
              <p className="rating">⭐ {course.rating || 'Chưa có'} ({course.students || 0} học viên)</p>
              <p className="uploaded">🕒 {new Date(course.createdAt).toLocaleDateString()}</p>
              <p className="price">{course.price === 0 ? 'Miễn phí' : `${course.price.toLocaleString()}đ`}</p>
              <div className="home-buttons">
                <button className="btn-intro" onClick={() => navigate(`/courses/${course._id}`)}>Xem giới thiệu</button>
                <button
                  className="btn-register"
                  onClick={() => handleRegister(course._id, course.price)}
                  disabled={loadingCourseId === course._id}
                >
                  {loadingCourseId === course._id ? 'Đang xử lý...' : 'Đăng ký'}
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

export default HomePage;
