import { useEffect, useState } from "react";
import { getUserProfile, updateUserProfile } from "../../api/apiRequest";
import Header from "../../component/Header/Header";
import Footer from "../../component/Footer/Footer";
import { FaUserCircle } from "react-icons/fa";
import "./style.css";

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        const fetchProfile = async () => {
            const data = await getUserProfile();
            if (data) {
                setUser(data);
                setFormData({
                fullName: data.profile?.fullName || "",
                phone: data.profile?.phone || "",
                birthday: data.profile?.birthday || "",
                address: data.profile?.address || "",
                });
            }
        };
        fetchProfile();
    }, []);

    const handleInputChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSave = async () => {
        try {
            const updatedUser = await updateUserProfile(formData);
            setUser((prev) => ({
                ...prev,
                ...formData,
            }));
            const data = await getUserProfile();
            setUser(data);
            setEditMode(false);
        } catch (err) {
            console.error("Update failed:", err);
        }
    };

    return (
    <div>  
        <Header />
        <div className="wrapper">
            <div className="user-profile-container">

                <div className="sidebar">
                    {/* Nội dung sidebar */}
                    <ul>
                    <li><a href="/">Trang chủ</a></li>
                    <li><a href="/profile" style={{ color: '#EF5350' }}>Thông tin cá nhân</a></li>
                    <li><a href="/change-password">Đổi mật khẩu</a></li>
                    <li><a href="#">Lịch sử thanh toán</a></li>
                    <li><a href="#">Bình luận</a></li>
                    <li><a href="#">Khóa học của tôi</a></li>
                    </ul>
                </div>

                {user ? (
                    <div className="user-profile-content">
                        {/* Avatar + Username */}
                        <div className="user-profile-left">
                            <div className="avatar-wrapper">
                                {user.avatar ? (
                                    <img
                                    src={user.avatar}
                                    alt="Avatar"
                                    className="user-avatar"
                                    />
                                ) : (
                                    <FaUserCircle className="user-icon-fallback" />
                                )}
                            </div>
                            <h2 className="user-username">{user.userName}</h2>
                        </div>

                        {/* Thông tin cá nhân */}
                        <div className="user-profile-right">
                            <h1 className="user-profile-title">Thông tin cá nhân</h1>

                            {editMode ? (
                                <>
                                    <InputRow label="Họ tên" name="fullName" value={formData.fullName} onChange={handleInputChange} />
                                    <InputRow label="Số điện thoại" name="phone" value={formData.phone} onChange={handleInputChange} />
                                    <InputRow label="Ngày sinh" name="birthday" value={formData.birthday} onChange={handleInputChange} />
                                    <InputRow label="Địa chỉ" name="address" value={formData.address} onChange={handleInputChange} />

                                    <div className="edit-buttons">
                                        <button className="save-btn" onClick={handleSave}>Lưu</button>
                                        <button className="cancel-btn" onClick={() => setEditMode(false)}>Hủy</button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <InfoRow label="Họ tên" value={user.profile?.fullName} />
                                    <InfoRow label="Số điện thoại" value={user.profile?.phone} />
                                    <InfoRow label="Email" value={user.email} />
                                    <InfoRow label="Ngày sinh" value={user.profile?.birthday} />
                                    <InfoRow label="Địa chỉ" value={user.profile?.address} />
                                    <button className="edit-btn" onClick={() => setEditMode(true)}>Chỉnh sửa</button>
                                </>
                            )}
                        </div>
                    </div>
                ) : (
                    <p className="loading-text">Đang tải...</p>
                )}
            </div>
        </div>
    <Footer />
    </div>
    );
};

const InfoRow = ({ label, value }) => (
    <div className="info-row">
        <span className="info-label">{label}:</span>
        <span className="info-value">{value || <span className="info-empty">Chưa có thông tin</span>}</span>
    </div>
);

const InputRow = ({ label, name, value, onChange }) => (
    <div className="info-row">
        <span className="info-label">{label}:</span>
        <input
            className="info-input"
            name={name}
            value={value ?? ""}
            onChange={onChange}
        />
    </div>
);

export default UserProfile;
