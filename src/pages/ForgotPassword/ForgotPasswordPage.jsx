import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { requestForgotPassword, verifyOTP, resetPassword } from "../../api/apiRequest";
import Header from "../../component/Header/Header";
import Footer from "../../component/Footer/Footer";
import "./style.css";

const ForgotPasswordPage = () => {
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError(""); setMessage("");

    try {
      const res = await requestForgotPassword(email);
      setMessage(res.message);
      setStep(2);
    } catch (err) {
      setError(err);
    }
  };

  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    setError(""); setMessage("");

    try {
      const res = await verifyOTP(email, otp);
      setMessage(res.message);
      setStep(3);
    } catch (err) {
      setError(err);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError(""); setMessage("");

    try {
      const res = await resetPassword(email, otp, password);
      setMessage(res.message);
      setStep(1);
      setEmail(""); setOtp(""); setPassword("");
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div>
      <Header />
        <div className="forgot-password-container">
        <main className="forgot-password-box">
            <h1 className="title">Khôi phục mật khẩu</h1>

            {step === 1 && (
            <form onSubmit={handleEmailSubmit} className="forgot-password-form">
                <input
                type="email"
                placeholder="Nhập email của bạn"
                className="input-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />
                <button type="submit" className="forgot-password-button">
                Gửi mã xác nhận
                </button>
            </form>
            )}

            {step === 2 && (
            <form onSubmit={handleOTPSubmit} className="forgot-password-form">
                <input
                type="text"
                placeholder="Nhập mã OTP"
                className="input-field"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                />
                <button type="submit" className="forgot-password-button">
                Xác nhận OTP
                </button>
            </form>
            )}

            {step === 3 && (
            <form onSubmit={handleResetPassword} className="forgot-password-form">
                <input
                type="password"
                placeholder="Nhập mật khẩu mới"
                className="input-field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
                <button type="submit" className="forgot-password-button">
                Đổi mật khẩu
                </button>
            </form>
            )}

            {message && <p className="message">{message}</p>}
            {error && <p className="error">{error}</p>}
        </main>
        </div>

      <Footer />
    </div>
  );
};

export default ForgotPasswordPage;
