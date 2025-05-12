import React from 'react';
import Footer from '../../component/Footer/Footer';
import Header from '../../component/Header/Header';
import Sidebar from '../../component/Sidebar/Sidebar';
import { Outlet } from 'react-router-dom'; 
import './AdminDashboard.css'; // Import CSS file for styling

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <Header />

      <div className="main">
        <Sidebar
          menuName="Quản lý"
          menuItems={[
            { path: '/admin/courses', label: 'Khóa học', icon: '📘' },
            { path: '/admin/users', label: 'Người dùng', icon: '👤' },
            { path: '/admin/quizzes', label: 'Bài kiểm tra', icon: '📝' }
          ]}
        />

        <div className="content">
          <Outlet />
        </div>
      </div>

      <Footer />
    </div>

  );
};

export default AdminDashboard;
