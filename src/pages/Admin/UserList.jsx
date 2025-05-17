import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { FiLock, FiUnlock } from 'react-icons/fi';
import { AiOutlineClose } from 'react-icons/ai';

import './UserList.css';

const initialUsers = [
  {
    id: 1,
    name: 'Nguyễn Văn A',
    username: 'nguyenvana',
    avatar: 'https://i.pravatar.cc/100?img=1',
    joinedAt: '2023-02-10',
    email: 'a@example.com',
    role: 'Học viên',
    locked: false,
  },
  {
    id: 2,
    name: 'Trần Thị B',
    username: 'tranthib',
    avatar: 'https://i.pravatar.cc/100?img=2',
    joinedAt: '2023-05-21',
    email: 'b@example.com',
    role: 'Học viên',
    locked: true,
  },
  {
    id: 3,
    name: 'Lê Văn C',
    username: 'levanc',
    avatar: 'https://i.pravatar.cc/100?img=3',
    joinedAt: '2023-08-15',
    email: 'c@example.com',
    role: 'Giáo viên',
    locked: false,
  },
  {
    id: 4,
    name: 'Phạm Thị D',
    username: 'phamthid',
    avatar: 'https://i.pravatar.cc/100?img=4',
    joinedAt: '2023-01-30',
    email: 'hehe@gmail.com',
    role: 'Quản trị viên',
    locked: false,
  },
];

const UserList = () => {
  const [users, setUsers] = useState(initialUsers);
  const [editData, setEditData] = useState(null);

  const handleEdit = (user) => {
    setEditData({ ...user });
  };

  const handleSave = () => {
    const updated = users.map((u) =>
      u.id === editData.id ? { ...editData } : u
    );
    setUsers(updated);
    setEditData(null);
  };

  const handleDelete = (id) => {
    const confirm = window.confirm(`Bạn có chắc muốn xoá người dùng ID: ${id}?`);
    if (confirm) {
      setUsers(users.filter((u) => u.id !== id));
    }
  };

  const toggleLock = (id) => {
    const confirm = window.confirm(`Bạn có chắc muốn ${users.find(u => u.id === id).locked ? 'mở khoá' : 'khóa'} người dùng ID: ${id}?`);
    if (!confirm) return; 
    const updated = users.map((u) =>
      u.id === id ? { ...u, locked: !u.locked } : u
    );
    setUsers(updated);
  };

  const handleChange = (field, value) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
  };
  const [searchTerm, setSearchTerm] = useState('');
  const handleSearch = (e) => {
    e.preventDefault();
    const filteredUsers = initialUsers.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setUsers(filteredUsers);
  }


  return (
    <div className="user-list-page">

      <input className="ad-search-input"
                type="text"
                placeholder="Tìm người dùng..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(e); }}
            />

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
          {users.map((user, index) => (
            <tr key={user.id} className={index % 2 === 0 ? 'row-even' : 'row-odd'}>
              <td><img src={user.avatar} alt="avatar" className="avatar" /></td>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.joinedAt}</td>
              <td>{user.role}</td>
              <td>
                <button className="user-list-button" onClick={() => handleEdit(user)}><FaEdit /></button>
                <button className="user-list-button" onClick={() => handleDelete(user.id)}><FaTrash /></button>
                <button className="user-list-button" onClick={() => toggleLock(user.id)}>
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
            <input type="text" value={editData.name} onChange={(e) => handleChange('name', e.target.value)} />
            <input type="email" value={editData.email} onChange={(e) => handleChange('email', e.target.value)} />
            <select value={editData.role} onChange={(e) => handleChange('role', e.target.value)}>
              <option value="Học viên">Học viên</option>
              <option value="Quản trị viên">Quản trị viên</option>
              <option value="Giáo viên">Giáo viên</option>
            </select>
            <div className="btn-group">
              <button className="user-save" onClick={handleSave}>Lưu</button>
              <button className="user-cancel" onClick={() => setEditData(null)}>Huỷ</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
