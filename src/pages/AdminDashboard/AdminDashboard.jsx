import React from 'react';

const DashboardAdmin = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-4">
        <h1 className="text-2xl font-bold text-blue-600 mb-8">🎓 LMS Admin</h1>
        <nav className="flex flex-col space-y-4">
          <a href="#" className="text-gray-700 hover:text-blue-600">Dashboard</a>
          <a href="#" className="text-gray-700 hover:text-blue-600">Người dùng</a>
          <a href="#" className="text-gray-700 hover:text-blue-600">Khóa học</a>
          <a href="#" className="text-gray-700 hover:text-blue-600">Bài học</a>
          <a href="#" className="text-gray-700 hover:text-blue-600">Thanh toán</a>
          <a href="#" className="text-gray-700 hover:text-blue-600">Phản hồi</a>
          <a href="#" className="text-gray-700 hover:text-blue-600">Cài đặt</a>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">
        <header className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Dashboard</h2>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Admin</span>
            <img
              src="https://via.placeholder.com/40"
              alt="Admin Avatar"
              className="w-10 h-10 rounded-full"
            />
          </div>
        </header>

        {/* Dashboard cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">👩‍🎓 Học viên</h3>
            <p className="text-2xl font-bold text-blue-600">1,240</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">📚 Khóa học</h3>
            <p className="text-2xl font-bold text-green-600">56</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">💰 Doanh thu tháng</h3>
            <p className="text-2xl font-bold text-yellow-600">89.2M</p>
          </div>
        </div>

        {/* Table section */}
        <div className="mt-10 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Danh sách học viên</h3>
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-left text-sm text-gray-600">
                <th className="p-2">STT</th>
                <th className="p-2">Tên</th>
                <th className="p-2">Email</th>
                <th className="p-2">Khóa học</th>
                <th className="p-2">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-2">1</td>
                <td className="p-2">Nguyễn Văn A</td>
                <td className="p-2">a@gmail.com</td>
                <td className="p-2">4</td>
                <td className="p-2 text-green-600">Hoạt động</td>
              </tr>
              {/* Thêm các dòng khác nếu cần */}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default DashboardAdmin;
