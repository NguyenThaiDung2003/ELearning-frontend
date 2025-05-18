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
import AdminOverview from "../pages/Admin/AdminOverview.jsx";
import AddCourse from "../pages/Admin/CRUDCourse/AddCourse.jsx";
import RequireAdmin from "../component/RequireAdmin/RequireAdmin.jsx";


// Import các trang mới
import CourseList from "../pages/CourseList/CourseList.jsx";
import CourseDetail from "../pages/CourseDetail/CourseDetail.jsx";
import LessonView from "../pages/LessonView/LessonView.jsx";
import QuizPage from "../pages/QuizPage/QuizPage.jsx";
import EditCourse from "../pages/Admin/CRUDCourse/EditCourse.jsx";


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

        {/* ROUTE cho hệ thống quản trị viên */}
        <Route path="/admin" element={<RequireAdmin />} >
          <Route path="" element={<AdminDashboard />}>
            <Route path="" element={<AdminOverview />} />
            <Route path="courses" element={<CoursePage />} />
            <Route path="users" element={<UserList />} />
            <Route path="courses/add" element={<AddCourse />} />
            <Route path="courses/edit/:id" element={<EditCourse />} />
            {/* Thêm các route khác ở đây */}
          </Route>
        </Route>

        {/* <Route path="/admin" element={<AdminDashboard />}>
            <Route path="" element={<AdminOverview />} />
            <Route path="courses" element={<CoursePage />} />
            <Route path="users" element={<UserList />} />
            <Route path="courses/add" element={<AddCourse />} />
            <Route path="courses/edit/:id" element={<AddCourse mode="edit" />} />
          </Route> */}

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
