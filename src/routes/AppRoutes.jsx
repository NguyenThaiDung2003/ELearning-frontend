import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage.jsx";
import LoginPage from "../pages/Login/LoginPage.jsx";


const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* Thêm các route khác ở đây */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
