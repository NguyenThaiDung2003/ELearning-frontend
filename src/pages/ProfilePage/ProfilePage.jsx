import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../redux/authSlice"; // Đường dẫn đúng slice của bạn
import { store } from "../../redux/store"; // Để lấy currentUser nếu cần
import { useEffect, useState } from "react";
import { getUserProfile, updateUserProfile, uploadAvatar  } from "../../api/apiRequest";
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

    const [avatarPreview, setAvatarPreview] = useState(null);
    const [newAvatarFile, setNewAvatarFile] = useState(null);
    const [isAvatarChanged, setIsAvatarChanged] = useState(false);
    const dispatch = useDispatch(); 

    const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Hiện preview ảnh
    setAvatarPreview(URL.createObjectURL(file));

    // Lưu file để khi nhấn Lưu mới gửi lên API
    setNewAvatarFile(file);
    setIsAvatarChanged(true);
    };

    const handleSaveAvatar = async () => {
    if (!newAvatarFile||!user) return;

    const formData = new FormData();
    formData.append("avatarFile", newAvatarFile);

    try {
        const res = await uploadAvatar(formData);
        
        const prevAuth = store.getState().auth.login.currentUser;
        const updatedAuth = {
        ...prevAuth,
        user: {
            ...prevAuth.user,
            avatarUrl: res.avatarUrl,
        },
        };

        dispatch(loginSuccess(updatedAuth));

        setUser((prev) => ({
        ...prev,
        avatarUrl: res.avatarUrl,
        }));
        setAvatarPreview(null);
        setNewAvatarFile(null);
        setIsAvatarChanged(false);

        // window.location.reload();
    } catch (err) {
        console.error("Avatar upload failed:", err);
    }
    };


    return (
    <div>  
        <Header />
        <div className="wrapper">
            <div className="user-profile-container">

                <div className="sidebar-profile">
                    {/* Nội dung sidebar */}
                    <ul>
                    <li><a href="/">Trang chủ</a></li>
                    <li><a href="/profile" style={{ color: '#EF5350' }}>Thông tin cá nhân</a></li>
                    <li><a href="/change-password">Đổi mật khẩu</a></li>
                    <li><a href="#">Lịch sử thanh toán</a></li>
                    <li><a href="#">Bình luận</a></li>
                    <li><a href="/my-courses">Khóa học của tôi</a></li>
                    </ul>
                </div>

                {user ? (
                    <div className="user-profile-content">
                        {/* Avatar + Username */}
                        <div className="user-profile-left">
                            <div className="avatar-wrapper">
                            {avatarPreview ? (
                                <img
                                src={avatarPreview}
                                alt="Avatar Preview"
                                className="user-avatar"
                                style={{ marginBottom: "10px" }}
                                />
                            ) : user.avatarUrl ? (
                                <img src={user.avatarUrl} alt="Avatar" className="user-avatar" />
                            ) : (
                                <FaUserCircle className="user-icon-fallback" />
                            )}

                            <h2 className="user-username">{user.userName}</h2>

                               <input
                                type="file"
                                id="avatarUpload"
                                accept="image/*"
                                onChange={handleAvatarChange}
                                style={{ display: "none" }}
                                />

                                {!isAvatarChanged && (
                                    <label htmlFor="avatarUpload" className="upload-avatar-btn">
                                        Tải ảnh lên
                                    </label>
                                )}

                            {isAvatarChanged && (
                                <button
                                className="save-avatar-btn"
                                onClick={handleSaveAvatar}
                                style={{ marginTop: "10px" }}
                                >
                                Lưu ảnh
                                </button>
                            )}
                            </div>     
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
                                        <button className="save-btn-profile" onClick={handleSave}>Lưu</button>
                                        <button className="cancel-btn-profile" onClick={() => setEditMode(false)}>Hủy</button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <InfoRow label="Họ tên" value={user.profile?.fullName} />
                                    <InfoRow label="Số điện thoại" value={user.profile?.phone} />
                                    <InfoRow label="Email" value={user.email} />
                                    <InfoRow label="Ngày sinh" value={user.profile?.birthday} />
                                    <InfoRow label="Địa chỉ" value={user.profile?.address} />
                                    <button className="edit-btn-profile" onClick={() => setEditMode(true)}>Chỉnh sửa</button>
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
    <div className="info-row-a">
        <span className="info-label-a">{label}:</span>
        <input
            className="info-input-a"
            name={name}
            value={value ?? ""}
            onChange={onChange}
        />
    </div>
);

export default UserProfile;
