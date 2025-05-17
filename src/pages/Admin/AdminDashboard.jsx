import React from 'react';
import Footer from '../../component/Footer/Footer';
import Header from '../../component/Header/Header';
import Sidebar from '../../component/Sidebar/Sidebar';
import SingleQuiz from '../../component/LessonForm/SingleQuiz/SingleQuiz';
import { FaBook, FaClipboardList} from 'react-icons/fa';
import { MdDashboard} from 'react-icons/md';
import { AiOutlineUser } from 'react-icons/ai';
import { Outlet } from 'react-router-dom'; 

import './AdminDashboard.css'; 

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <Header />

      <div className="main">
        <Sidebar
          // menuName="Quản lý"
          menuItems={[
            { path: '/admin', label: 'Tổng quan', icon: <MdDashboard /> },
            { path: '/admin/courses', label: 'Khóa học', icon: <FaBook /> },
            { path: '/admin/users', label: 'Người dùng', icon: <AiOutlineUser /> }
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
