import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage.jsx";
import LoginPage from "../pages/Login/LoginPage.jsx";
import RegisterPage from "../pages/Register/RegisterPage.jsx";
import ProfilePage from "../pages/ProfilePage/ProfilePage.jsx";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        {/* Thêm các route khác ở đây */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
