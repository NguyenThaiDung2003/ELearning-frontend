import React from 'react';
import './AdminOverview.css'; // Import CSS file for styling
import SummaryInfoCard from '../../component/SummaryInfoCard/SummaryInfoCard';
import {FaEye, FaUser, FaStar } from 'react-icons/fa';
import { MdLibraryBooks } from 'react-icons/md';
import { useEffect, useState } from 'react';

import { getTotalUsers, adminGetTotalCourses } from '../../api/adminAPI/adminApiRequest';



const AdminOverview = () => {

    const [userCount, setTotalUsers] = useState(0);
    const [courseCount, setTotalCourses] = useState(0);

    useEffect(() => {
    const fetchData = async () => {
      try {
        const usersData = await getTotalUsers(); // { totalUser: 7 }
        setTotalUsers(usersData.totalUsers);

        const coursesData = await adminGetTotalCourses(); // { totalCourses: 12 }
        setTotalCourses(coursesData.totalCourses);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu tổng:", error);
      }
    };

    fetchData();
  }, []);


    return (
        <div className="admin-overview">
            <div className="ov-title-container">
                <h1>Tổng quan</h1>
            </div>

            <div className="overview-content">
                <SummaryInfoCard
                    content={{
                        title: "Tổng số học viên",
                        icon: <FaUser size={40} color='#999999' />,
                        count: userCount || 0
                    }}
                />
                <SummaryInfoCard
                    content={{
                        title: "Tổng số khóa học",
                        icon: <MdLibraryBooks size={40} color='#220022' />,
                        count: courseCount || 0
                    }}
                />
                <SummaryInfoCard
                    content={{
                        title: "Lượt truy cập",
                        icon: <FaEye size={40} />,
                        count: 3899
                    }}
                />
                <SummaryInfoCard
                    content={{
                        title: "Đánh giá",
                        icon: <FaStar size={40} color='#ffff00'/>,
                        count: 4.7
                    }}
                />
            </div>
        </div>
    );
}

export default AdminOverview;