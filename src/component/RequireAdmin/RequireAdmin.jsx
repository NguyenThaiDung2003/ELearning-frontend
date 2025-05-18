// components/RequireAdmin.jsx
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import jwtDecode from "jwt-decode";

const RequireAdmin = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);

  if (!user || !user.accessToken) {
    alert("Bạn cần đăng nhập để truy cập trang này.");
    return <Navigate to="/login" replace />;
  }

  let role;
  try {
    const decodedToken = jwtDecode(user.accessToken);
    role = decodedToken.role;
  } catch (error) {
    console.error("Lỗi khi decode token:", error);
    alert("Token không hợp lệ. Vui lòng đăng nhập lại.");
    return <Navigate to="/login" replace />;
  }

  if (role !== "Admin") {
    alert("Bạn không có quyền truy cập vào trang này.");
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default RequireAdmin;
