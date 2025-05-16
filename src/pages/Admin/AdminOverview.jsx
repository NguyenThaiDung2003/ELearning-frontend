import React from 'react';
import './AdminOverview.css'; // Import CSS file for styling
import SummaryInfoCard from '../../component/SummaryInfoCard/SummaryInfoCard';
import { FaBook, FaClipboardList } from 'react-icons/fa';


const AdminOverview = () => {
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
                        count: 150
                    }}
                />
                <SummaryInfoCard
                    content={{
                        title: "Tổng số khóa học",
                        icon: <FaClipboardList  size={40}/>,
                        count: 20
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