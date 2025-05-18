import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { FiLock, FiUnlock } from 'react-icons/fi';
import { AiOutlineClose } from 'react-icons/ai';
import { getAllUsers, deleteUser, editUserProfile, searchUsers } from '../../api/adminAPI/adminApiRequest';
import './UserList.css';

const UserList = () => {

  const [UserList, setUserList] = useState([]);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getAllUsers();
        setUserList(res.users);
      } catch (error) {
        console.error("Lỗi khi lấy users:", error);
      }
    };
    fetchUsers();
  }, []);


  const [searchTerm, setSearchTerm] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const filteredUsers = UserList.filter(user =>
    (user.name && user.name.toLowerCase().includes(searchKeyword.toLowerCase())) ||
    (user.userName && user.userName.toLowerCase().includes(searchKeyword.toLowerCase()))
  );

  const handleSearchClick = () => {
  setSearchKeyword(searchTerm);
};


  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirst, indexOfLast);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);




  // Sửa thông tin người dùng
  const handleEdit = (user) => {
    setEditData({ ...user });

  };

  const handleSave = () => {
    const updatedList = UserList.map((u) =>
      u._id === editData._id ? { ...editData } : u
    );
    setUserList(updatedList);
    setEditData(null);
    const updatedUser = {
      ...editData,
      createdAt: new Date().toISOString(),
    };
    editUserProfile(updatedUser)
      .then((res) => {
        console.log("Cập nhật người dùng thành công:", res);
      })
      .catch((error) => {
        console.error("Lỗi cập nhật người dùng:", error);
      });
  };

  // Xoá người dùng
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(`Bạn có chắc muốn xoá người dùng ID: ${id}?`);
    if (confirmDelete) {
      deleteUser(id)
        .then((res) => {
          console.log("Xoá người dùng thành công:", res);
        })
        .catch((error) => {
          console.error("Lỗi xoá người dùng:", error);
        });
      setUserList(UserList.filter((u) => u._id !== id));
    }
  };

  // Khoá / Mở khoá người dùng
  const toggleLock = (id) => {
    const targetUser = UserList.find((u) => u._id === id);
    const confirmLock = window.confirm(
      `Bạn có chắc muốn ${targetUser?.locked ? 'mở khoá' : 'khoá'} người dùng ID: ${id}?`
    );
    if (!confirmLock) return;

    const updatedList = UserList.map((u) =>
      u._id === id ? { ...u, locked: !u.locked } : u
    );
    setUserList(updatedList);
  };


  const handleChange = (field, value) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="user-list-page">

      <div className="ad-search-input-container">
        <input className="ad-search-input"
        type="text"
        placeholder="Tìm người dùng..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSearchClick();
          }
        }}
      />
      <button className="ad-search-button" onClick={handleSearchClick}>Tìm</button>
      </div>
      

      <div className="user-list-title">
        <h1>Danh sách người dùng</h1>
      </div>

      <table className="user-table">
        <thead>
          <tr>
            <th></th>
            <th>Tên người dùng</th>
            <th>username</th>
            <th>Ngày tham gia</th>
            <th>Vai trò</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user, index) => (
            <tr key={user._id} className={index % 2 === 0 ? 'row-even' : 'row-odd'}>
              <td>
                <img
                  src={user.avatarUrl || 'https://via.placeholder.com/40'} // fallback nếu chưa có ảnh
                  alt="avatar"
                  className="avatar"
                />
              </td>
              <td>{user.name || 'Chưa đặt tên'}</td>
              <td>{user.userName}</td>
              <td>{new Date(user.createdAt).toLocaleDateString()}</td>
              <td>{user.role}</td>
              <td>
                <button className="user-list-button" onClick={() => handleEdit(user)}><FaEdit /></button>
                <button className="user-list-button" onClick={() => handleDelete(user._id)}><FaTrash /></button>
                <button className="user-list-button" onClick={() => toggleLock(user._id)}>
                  {user.locked ? <FiUnlock /> : <FiLock />}
                </button>
              </td>
            </tr>
          ))}

        </tbody>
      </table>

      {editData && (
        <div className="modal-overlay" onClick={() => setEditData(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setEditData(null)}>
              <AiOutlineClose />
            </button>
            <h3>Chỉnh sửa người dùng</h3>
            <h4>Tên người dùng</h4>
            <input type="text" value={editData.name} onChange={(e) => handleChange('name', e.target.value)} />
            <h4>Email</h4>
            <input type="email" value={editData.email} onChange={(e) => handleChange('email', e.target.value)} />
            <h4>Vai trò</h4>
            <select value={editData.role} onChange={(e) => handleChange('role', e.target.value)}>
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
            <div className="btn-group">
              <button className="user-save" onClick={handleSave}>Lưu</button>
              <button className="user-cancel" onClick={() => setEditData(null)}>Huỷ</button>
            </div>
          </div>
        </div>
      )}

      <div className="pagination">
        <button
          className="numbering"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          ←
        </button>

        {[...Array(totalPages)].map((_, idx) => (
          <button
            className={`numbering ${currentPage === idx + 1 ? 'active' : ''}`}
            key={idx}
            onClick={() => setCurrentPage(idx + 1)}
          >
            {idx + 1}
          </button>
        ))}

        <button
          className="numbering"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          →
        </button>
      </div>

    </div>
  );
};

export default UserList;
