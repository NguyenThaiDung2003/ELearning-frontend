import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import './style.css';

const Header = () => {
  return (
    <header className="header">
      <div className="Logo">
        <div className="logo-box">E</div>
        <span className="logo-text">BK-Study</span>
      </div>


      <div className="relative search-container">
        <input
          type="text"
          placeholder="Tìm kiếm khóa học, bài giảng ..."
          className="search-input"
        />
        <FaSearch className="search-icon" />
      </div>


      <div className="Login">
        <Link to="/register" className="login-btn">Đăng ký</Link>
        <Link to="/login" className="login-btn">Đăng nhập</Link>
      </div>
    </header>
  );
};

export default Header;
