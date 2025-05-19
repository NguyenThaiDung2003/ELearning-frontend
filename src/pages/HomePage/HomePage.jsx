import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../../component/Header/Header';
import Footer from '../../component/Footer/Footer';
import './HomePage.css';
import { registerCourse } from "../../api/apiRequest";
import { useNavigate } from 'react-router-dom';
import { fetchUserCourses } from '../../api/apiRequest';  // <-- import hàm fetchUserCourses

const HomePage = () => {
  const [courses, setCourses] = useState([]);
  const [registeredCourses, setRegisteredCourses] = useState(new Set());
  const [filters, setFilters] = useState({ category: '', level: '', type: '', sort: '' });
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [loadingCourseId, setLoadingCourseId] = useState(null);
  const navigate = useNavigate();

  // Lấy danh sách khóa học đã đăng ký của user khi component mount
  useEffect(() => {
    const loadRegisteredCourses = async () => {
      try {
        const userCourses = await fetchUserCourses();
        const registeredIds = new Set(userCourses.map(c => c._id));
        setRegisteredCourses(registeredIds);
      } catch (error) {
        toast.error("Lỗi khi tải khóa học đã đăng ký!");
      }
    };
    loadRegisteredCourses();
  }, []);

  // Lấy danh sách tất cả khóa học
  useEffect(() => {
    fetch('https://elearning-backend-2kn5.onrender.com/api/course/get-courses?limit=100')
      .then(res => res.json())
      .then(data => setCourses(data.courses))
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

  const handleRegister = async (courseId) => {
    try {
      setLoadingCourseId(courseId);
      await registerCourse(courseId);
      setRegisteredCourses(prev => new Set(prev).add(courseId));
      navigate(`/course/${courseId}`);
    } catch (error) {
      // toast hoặc alert đã có trong registerCourse rồi, có thể không cần làm gì thêm
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
        ? (filters.type === 'Miễn phí' ? course.price === 0 : course.price > 0)
        : true;
      return matchSearch && matchCategory && matchLevel && matchType;
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
          </div>
        </div>
      </div>

      <div className="course-grid">
        {paginatedCourses.map((course) => {
          const isRegistered = registeredCourses.has(course._id);
          return (
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
                    onClick={() => handleRegister(course._id)}
                    disabled={isRegistered || loadingCourseId === course._id}
                    style={{ backgroundColor: isRegistered ? "#ccc" : undefined }}
                  >
                    {isRegistered
                      ? "Đã đăng ký"
                      : (loadingCourseId === course._id ? "Đang xử lý..." : "Đăng ký")}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
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





// import React, { useState, useEffect } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Header from '../../component/Header/Header';
// import Footer from '../../component/Footer/Footer';
// import './HomePage.css';

// const HomePage = () => {
//   const [courses, setCourses] = useState([]);
//   const [registeredCourses, setRegisteredCourses] = useState(new Set());
//   const [filters, setFilters] = useState({ category: '', level: '', type: '', sort: '' });
//   const [page, setPage] = useState(1);
//   const [search, setSearch] = useState('');
//   const [loadingCourseId, setLoadingCourseId] = useState(null);

//   useEffect(() => {
//     fetch('https://elearning-backend-2kn5.onrender.com/api/course/get-courses')
//       .then(res => res.json())
//       .then(data => setCourses(data.courses))
//       .catch(err => toast.error("Lỗi khi tải danh sách khóa học!"));
//   }, []);

//   const handleFilterChange = (e) => {
//     setFilters({ ...filters, [e.target.name]: e.target.value });
//     setPage(1);
//   };

//   const handleSearchChange = (e) => {
//     setSearch(e.target.value);
//     setPage(1);
//   };

//   const handleRegister = async (courseId, price) => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       toast.warning("Vui lòng đăng nhập để đăng ký!");
//       return;
//     }

//     try {
//       setLoadingCourseId(courseId);

//       if (price > 0) {
//         const createRes = await fetch("https://elearning-backend-2kn5.onrender.com/api/paypal/create-order", {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ amount: price }),
//         });

//         const createData = await createRes.json();
//         if (!createData.approvalUrl) throw new Error("Không tạo được đơn hàng");

//         window.open(createData.approvalUrl, "_blank");
//         const confirm = window.confirm("Sau khi thanh toán xong, nhấn OK để tiếp tục.");

//         if (!confirm) return;

//         await fetch(`https://elearning-backend-2kn5.onrender.com/api/paypal/capture-order/${courseId}`, {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ paymentId: "SAMPLE_PAYMENT_ID" }) // placeholder
//         });
//       }

//       const regRes = await fetch("https://elearning-backend-2kn5.onrender.com/api/register-course/register", {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({ courseId })
//       });

//       if (regRes.ok) {
//         toast.success("Đăng ký thành công!");
//         setRegisteredCourses(prev => new Set(prev).add(courseId));
//       } else {
//         const err = await regRes.json();
//         throw new Error(err.message || "Không rõ lỗi");
//       }
//     } catch (err) {
//       toast.error("Lỗi: " + err.message);
//     } finally {
//       setLoadingCourseId(null);
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
//     });

//   const coursesPerPage = 8;
//   const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
//   const paginatedCourses = filteredCourses.slice((page - 1) * coursesPerPage, page * coursesPerPage);

//   return (
//     <div className="home-page">
//       <Header />
//       <ToastContainer />

//       <div className="hero-section">
//         <h1>Chào mừng đến với BK Study</h1>
//         <p>Khám phá hàng trăm khóa học hấp dẫn từ giảng viên uy tín</p>
//       </div>

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
//               <option>AI</option>
//               <option>Data</option>
//               <option>DevOps</option>
//               <option>Mobile</option>
//               <option>Web</option>
//             </select>
//             <select name="level" onChange={handleFilterChange}>
//               <option value="">Trình độ</option>
//               <option>Dễ</option>
//               <option>Trung bình</option>
//               <option>Khó</option>
//             </select>
//             <select name="type" onChange={handleFilterChange}>
//               <option value="">Hình thức</option>
//               <option>Miễn phí</option>
//               <option>Trả phí</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       <div className="course-grid">
//         {paginatedCourses.map((course) => {
//           const isRegistered = registeredCourses.has(course._id);
//           return (
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
//                   <button
//                     className="btn-register"
//                     onClick={() => handleRegister(course._id, course.price)}
//                     disabled={isRegistered || loadingCourseId === course._id}
//                     style={{ backgroundColor: isRegistered ? "#ccc" : undefined }}
//                   >
//                     {isRegistered
//                       ? "Đã đăng ký"
//                       : (loadingCourseId === course._id ? "Đang xử lý..." : "Đăng ký")}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
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
