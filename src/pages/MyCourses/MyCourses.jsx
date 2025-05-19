import React, { useEffect, useState } from "react";
import Header from "../../component/Header/Header";
import Footer from "../../component/Footer/Footer";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { fetchUserCourses } from "../../api/apiRequest";
import "./style.css";

dayjs.extend(relativeTime);

const MyCourses = ({ userId }) => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        const data = await fetchUserCourses(userId);
        setCourses(data);
      } catch (err) {
        console.error("Error fetching my courses", err);
      }
    };
    fetchMyCourses();
  }, [userId]);

    return (
        <div>
            <Header />
            <div class="wrapper">
                <div className="my-courses-container">

                    <div className="sidebar-mc">
                        <ul>
                            <li><a href="/">Trang chủ</a></li>
                            <li><a href="/profile">Thông tin cá nhân</a></li>
                            <li><a href="/change-password" >Đổi mật khẩu</a></li>
                            <li><a href="#">Lịch sử thanh toán</a></li>
                            <li><a href="#">Bình luận</a></li>
                            <li><a href="#"style={{ color: '#EF5350' }}>Khóa học của tôi</a></li>
                        </ul>
                    </div>

                    <div className="my-courses-content">
                        <h2 className="my-courses-title">Khóa Học Của Tôi</h2>
                        <div className="my-courses-list">
                            {courses.length === 0 ? (
                                <p className="my-courses-list-0">Hiện bạn chưa đăng ký khóa học nào.</p>
                            ) : (
                                courses.map((course) => (
                                <div key={course._id} className="my-courses-item">
                                    <img
                                    src={course.image}
                                    alt={course.name}
                                    className="my-courses-item-image"
                                    />
                                    <div className="my-courses-item-info">
                                    <h3 className="my-courses-item-name">{course.name}</h3>
                                    <p className="my-courses-item-registered-time">
                                        Học cách đây {dayjs(course.registeredAt).fromNow()}
                                    </p>
                                    <div className="my-courses-progress-bar">
                                        <div
                                        className="my-courses-progress-bar-fill"
                                        style={{ width: `${Math.floor(Math.random() * 60) + 20}%` }}
                                        ></div>
                                    </div>
                                    </div>
                                </div>
                                ))
                            )}
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </div>
    );
};

export default MyCourses;
