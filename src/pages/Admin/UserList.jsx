import React, { useState } from 'react';
import './UserList.css';

const mockUsers = [
  {
    id: 1,
    name: 'Nguyễn Văn A',
    avatar: 'https://i.pravatar.cc/100?img=1',
    joinedAt: '2023-02-10',
    email: 'a@example.com',
    role: 'Học viên'
  },
  {
    id: 2,
    name: 'Trần Thị B',
    avatar: 'https://i.pravatar.cc/100?img=2',
    joinedAt: '2023-05-21',
    email: 'b@example.com',
    role: 'Học viên'
  },
  {
    id: 3,
    name: 'Lê Văn C',
    avatar: 'https://i.pravatar.cc/100?img=3',
    joinedAt: '2023-08-15',
    email: 'c@example.com',
    role: 'Giáo viên'
  },
  {
    id: 4,
    name: 'Phạm Thị D',
    avatar: 'https://i.pravatar.cc/100?img=4',
    joinedAt: '2023-01-30',
    email: 'hehe@gmail.com',
    role: 'Quản trị viên'
  }
];

const UserList = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [editData, setEditData] = useState(null);

  const handleEdit = () => {
    setEditData({ ...selectedUser });
  };

  const handleSave = () => {
    console.log('Lưu dữ liệu:', editData);
    // Gửi dữ liệu về API 
    setSelectedUser(editData);
    setEditData(null);
  };

  const handleChange = (field, value) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="user-list-container">
      <h2>Danh sách người dùng</h2>
      <ul className="user-list">
        {mockUsers.map(user => (
          <li key={user.id} className="user-item" onClick={() => setSelectedUser(user)}>
            <img src={user.avatar} alt="avatar" className="avatar" />
            <div>
              <h4>{user.name}</h4>
              <p>Tham gia: {user.joinedAt}</p>
            </div>
          </li>
        ))}
      </ul>

      {selectedUser && (
        <div className="modal-overlay" onClick={() => { setSelectedUser(null); setEditData(null); }}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>Thông tin người dùng</h3>
            <img src={selectedUser.avatar} alt="avatar" className="modal-avatar" />
            {editData ? (
              <>
                <input
                  type="text"
                  value={editData.name}
                  onChange={e => handleChange('name', e.target.value)}
                  placeholder="Tên"
                />
                <input
                  type="email"
                  value={editData.email}
                  onChange={e => handleChange('email', e.target.value)}
                  placeholder="Email"
                />
                <input
                  type="text"
                  value={editData.role}
                  onChange={e => handleChange('role', e.target.value)}
                  placeholder="Vai trò"
                />
                <div className="btn-group">
                  <button onClick={handleSave}>💾 Lưu</button>
                  <button onClick={() => setEditData(null)}>❌ Huỷ</button>
                </div>
              </>
            ) : (
              <>
                <p><strong>Tên:</strong> {selectedUser.name}</p>
                <p><strong>Email:</strong> {selectedUser.email}</p>
                <p><strong>Vai trò:</strong> {selectedUser.role}</p>
                <p><strong>Ngày tham gia:</strong> {selectedUser.joinedAt}</p>
                <div className="btn-group">
                  <button onClick={handleEdit}>✏️ Chỉnh sửa</button>
                  <button onClick={() => alert('Xoá người dùng')}>🗑️ Xoá</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
