// components/RequireAdmin.jsx
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const RequireAdmin = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);

  if (!user) {
    alert("Bạn cần đăng nhập để truy cập trang này.");
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "admin") {
    alert("Bạn không có quyền truy cập vào trang này.");
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default RequireAdmin;
