import { useEffect, useState } from "react";
import { getUserProfile } from "../../api/apiRequest";
import Header from "../../component/Header/Header";
import Footer from "../../component/Footer/Footer";
import { FaUserCircle } from "react-icons/fa";
import "./style.css";

const UserProfile = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const data = await getUserProfile();
            if (data) setUser(data);
        };
        fetchProfile();
    }, []);

    return (
    <div>  
        <Header />
        <div className="user-profile-container">

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
                        <h2 className="user-username">{user.username}</h2>
                    </div>

                    {/* Thông tin cá nhân */}
                    <div className="user-profile-right">
                        <h1 className="user-profile-title">Thông tin cá nhân</h1>
                        <InfoRow label="Họ tên" value={user.fullName} />
                        <InfoRow label="Số điện thoại" value={user.phone} />
                        <InfoRow label="Email" value={user.email} />
                        <InfoRow label="Ngày sinh" value={user.dob} />
                        <InfoRow label="Địa chỉ" value={user.address} />
                    </div>
                </div>
            ) : (
                <p className="loading-text">Đang tải...</p>
            )}
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

export default UserProfile;
