import { useState } from "react";
import Header from "../../component/Header/Header";
import Footer from "../../component/Footer/Footer";
import { changePassword } from "../../api/apiRequest";
import "./style.css";

const ChangePassword = () => {
    const [form, setForm] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);

    const handleInputChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleChangePassword = async () => {
        if (form.newPassword !== form.confirmPassword) {
            setMessage("Mật khẩu mới và xác nhận không khớp.");
            setSuccess(false);
            return;
        }

        try {
            const res = await changePassword({
                currentPassword: form.currentPassword,
                newPassword: form.newPassword,
            });
            setMessage(res.message || "Đổi mật khẩu thành công!");
            setSuccess(true);
            setForm({
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
            });
        } catch (err) {
            setMessage(err.message || "Đổi mật khẩu thất bại.");
            setSuccess(false);
        }
    };

    return (
        <div>
            <Header />
            <div class="wrapper">
                <div className="user-profile-container">

                    <div className="sidebar">
                        <ul>
                            <li><a href="/">Trang chủ</a></li>
                            <li><a href="/profile">Thông tin cá nhân</a></li>
                            <li><a href="/change-password" style={{ color: '#EF5350' }}>Đổi mật khẩu</a></li>
                            <li><a href="#">Lịch sử thanh toán</a></li>
                            <li><a href="#">Bình luận</a></li>
                            <li><a href="#">Khóa học của tôi</a></li>
                        </ul>
                    </div>

                    <div className="password-change-container">
                        <div className="password-change-right">
                            <h1 className="password-change-header">Thay đổi mật khẩu</h1>

                            <div className="input-row">
                                <span className="input-label">Mật khẩu hiện tại:</span>
                                <input
                                    className="input-field"
                                    type="password"
                                    name="currentPassword"
                                    value={form.currentPassword}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="input-row">
                                <span className="input-label">Mật khẩu mới:</span>
                                <input
                                    className="input-field"
                                    type="password"
                                    name="newPassword"
                                    value={form.newPassword}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="input-row">
                                <span className="input-label">Xác nhận mật khẩu mới:</span>
                                <input
                                    className="input-field"
                                    type="password"
                                    name="confirmPassword"
                                    value={form.confirmPassword}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="action-buttons">
                                <button className="submit-btn" onClick={handleChangePassword}>Đổi mật khẩu</button>
                            </div>

                            {message && (
                                <p style={{ color: success ? "green" : "red", marginTop: "10px" }}>{message}</p>
                            )}
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ChangePassword;
