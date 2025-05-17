import React from 'react';
import './AdminOverview.css'; // Import CSS file for styling
import SummaryInfoCard from '../../component/SummaryInfoCard/SummaryInfoCard';
import { FaBook, FaClipboardList } from 'react-icons/fa';

import {getTotalUsers, adminGetTotalCourses} from '../../api/adminAPI/adminApiRequest';



const AdminOverview = () => {

    const totalUser = async () => {
        try {
            const response = await getTotalUsers();
            if (response && response.data) {
                getTotalUsers(response.data.totalUsers);
            }
        } catch (error) {
            console.error("Error fetching total users:", error);
        }
    }
    const totalCourses= async () => {
        try {
            const response = await adminGetTotalCourses();
            if (response && response.data) {
                adminGetTotalCourses(response.data.totalCourses);
            }
        } catch (error) {
            console.error("Error fetching total courses:", error);
        }
    }

    return (
        <div className="admin-overview">
            <div className="ov-title-container">
                <h1>Tổng quan</h1>
            </div>

            <div className="overview-content">
                <SummaryInfoCard
                    content={{
                        title: "Tổng số học viên",
                        icon: <FaBook size={40}/>,
                        count: totalUser.totalUser || 0
                    }}
                />
                <SummaryInfoCard
                    content={{
                        title: "Tổng số khóa học",
                        icon: <FaClipboardList  size={40}/>,
                        count: totalCourses.totalCourses ||0
                    }}
                />
                <SummaryInfoCard
                    content={{
                        title: "Tổng số bài kiểm tra",
                        icon: <FaClipboardList  size={40}/>,
                        count: 10
                    }}
                />
                <SummaryInfoCard
                    content={{
                        title: "Tổng số người dùng",
                        icon: <FaClipboardList  size={40}/>,
                        count: 300
                    }}
                />
            </div>
        </div>
    );
}

export default AdminOverview;