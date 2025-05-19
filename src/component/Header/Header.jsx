import { Link } from "react-router-dom";
import { FaSearch, FaBell, FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import "./style.css";
import { useDispatch } from "react-redux"; 
import { logOut } from "../../api/apiRequest"; 
import { useNavigate } from "react-router-dom";
import { axiosJWT } from "../../api/axiosJWT";
import logo from "../../assets/logo.png";

const Header = () => {
  const user = useSelector((state) => state.auth.login.currentUser?.user); 
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const dropdownRef = useRef(null);
  const notificationRef = useRef(null);
  const dispatch = useDispatch(); 
  const navigate = useNavigate();

    const handleLogout = async () => {    
        await logOut(dispatch, navigate);
    };

    const handleToggleDropdown = () => {
      setShowDropdown(!showDropdown);
      setShowNotification(false); 
    };
  
    const handleToggleNotification = () => {
      setShowNotification(!showNotification);
      setShowDropdown(false);
    };


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current && !dropdownRef.current.contains(event.target) &&
        notificationRef.current && !notificationRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
        setShowNotification(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  
  return (
    <header className="header">
      <Link to="/" className="Logo">
      <img src={logo} alt="BK-Study Logo" className="logo-img" />
      <span className="logo-text">BK-Study</span>
      </Link>


      <div className="relative search-container">
        <input
          type="text"
          placeholder="Tìm kiếm khóa học, bài giảng ..."
          className="search-input-header"
        />
        <FaSearch className="search-icon-header" />
      </div>

      <div className="UserSection">
        {user ? (
          <>
            {/* Thông báo */}
            <div className="notification" ref={notificationRef}>
              <FaBell
                className="bell-icon"
                onClick={handleToggleNotification }
              />
              <div className={`notification-box ${showNotification ? "show" : ""}`}>
                <h3 className="notification-title">Thông báo</h3>
                <div  className="notification-text">
                <p >Không có thông báo nào</p>
                </div>
              </div>
            </div>

            {/* Menu User */}
            <div className="user-menu" ref={dropdownRef}>
              {user.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt="avatar"
                  className="User-avatar"
                  onClick={handleToggleDropdown}
                />
              ) : (
                <FaUserCircle
                  className="user-icon"
                  onClick={handleToggleDropdown}
                />
              )}
              <div className={`dropdown ${showDropdown ? "show" : ""}`}>
                <div className="dropdown-header">
                  {user.avatarUrl ? (
                    <img
                      src={user.avatarUrl}
                      alt="avatar"
                      className="dropdown-avatar"
                    />
                  ) : (
                    <FaUserCircle className="dropdown-icon" />
                  )}
                  <span className="dropdown-username">{user.userName}</span>
                </div>
                <hr />
                <Link to="/profile">Hồ sơ</Link>

                <button className="logout-btn" onClick={handleLogout}>Đăng xuất</button>
              </div>
            </div>
          </>
        ) : (
          <div className="Login">
            <Link to="/register" className="register-btn">Đăng ký</Link>
            <Link to="/login" className="login-btn">Đăng nhập</Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
