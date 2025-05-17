import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage.jsx";
import LoginPage from "../pages/Login/LoginPage.jsx";
import RegisterPage from "../pages/Register/RegisterPage.jsx";
import ProfilePage from "../pages/ProfilePage/ProfilePage.jsx";
import ChangePassword from "../pages/ChangePassword/ChangePassword.jsx";
import ForgotPasswordPage from "../pages/ForgotPassword/ForgotPasswordPage.jsx";
import MyCourses from "../pages/MyCourses/MyCourses.jsx";
import AdminDashboard from "../pages/Admin/AdminDashboard.jsx";
import CoursePage from "../pages/Admin/CoursesPage.jsx";
import UserList from "../pages/Admin/UserList.jsx";
// import QuizPage from "../pages/Admin/QuizPage.jsx";


// Import các trang mới
import CourseList from "../pages/CourseList/CourseList.jsx";
import CourseDetail from "../pages/CourseDetail/CourseDetail.jsx";
import LessonView from "../pages/LessonView/LessonView.jsx";
import QuizPage from "../pages/QuizPage/QuizPage.jsx";


const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CourseList />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/my-courses" element={<MyCourses />} />
        <Route path="/admin" element={<AdminDashboard />} >
          <Route path="courses" element={<CoursePage/>} />
          <Route path="users" element={<UserList/>} />
          {/* <Route path="quizzes" element={<QuizPage />} /> */}
        </Route>

        {/* ROUTE cho hệ thống khóa học */}
        <Route path="/courses" element={<CourseList />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
        <Route path="/courses/:id/lesson/:lessonId" element={<LessonView />} />
        <Route path="/courses/:id/quiz/:quizId" element={<QuizPage />} />
        {/* Thêm các route khác ở đây */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
