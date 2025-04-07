import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; 
import Header from "../../component/Header/Header";
import Footer from "../../component/Footer/Footer";
import "./style.css"; 
import { useDispatch } from "react-redux";
import { loginUser } from "../../api/apiRequest";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const newUser = {
      username: username,
      password: password,
    };
    loginUser(newUser, dispatch, navigate);
  };

  return (
    <div>  
      <Header />
      <div className="login-container">
        <main className="login-box">
          <h1 className="title">Đăng Nhập</h1>
          <form onSubmit={handleLogin} className="login-form">
            
            <input
              type="text"
              placeholder="Tên đăng nhập"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input-field"
              required
            />

            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <button type="submit" className="login-button">
              Đăng nhập
            </button>
          </form>

          <p className="register-link">
            Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
          </p>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
