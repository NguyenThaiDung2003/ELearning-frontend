import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; 
import Header from "../../component/Header/Header";
import Footer from "../../component/Footer/Footer";
import "./style.css"; 

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Đăng nhập với:", email, password);
  };

  return (
    <div>  
      <Header />
    <div className="login-container">
      

      {/* Login Box */}
      <main className="login-box">
        <h1 className="title">Đăng Nhập</h1>
        <form onSubmit={handleLogin} className="login-form">
          
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

        {/* Register */}
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
