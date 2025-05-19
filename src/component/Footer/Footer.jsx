import { FaFacebook, FaYoutube, FaTiktok } from "react-icons/fa";
import logo from "../../assets/logo.png";
import "./style.css"; 

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">

        <div>
          <div className="footer-logo">
            <img src={logo} alt="BK-Study Logo" className="logo-img" />
            {/* <span className="logo-text">BK-Study</span> */}
            <span>Học Mọi Lúc, Nâng Tầm Tương Lai!</span>
          </div>
          <p><strong>Điện thoại:</strong> 08 1489 8945</p>
          <p><strong>Email:</strong> abc@hust.edu.vn</p>
          <p><strong>Địa chỉ:</strong>  Số 1 Đại Cồ Việt, Hai Bà Trưng, Hà Nội</p>
        </div>


        <div>
          <h3>VỀ BK-Study</h3>
          <ul>
            <li><a href="#">Giới thiệu</a></li>
            <li><a href="#">Liên hệ</a></li>
            <li><a href="#">Điều khoản</a></li>
            <li><a href="#">Bảo mật</a></li>
          </ul>
        </div>


        <div>
          <h3>Khóa học tiêu biểu</h3>
          <ul>
            <li><a href="#">Khóa học A</a></li>
            <li><a href="#">Khóa học A</a></li>
            <li><a href="#">Khóa học B</a></li>
          </ul>
        </div>


        <div>
          <h3>CÔNG CỤ</h3>
          <ul>
            <li><a href="#">Video bài giảng</a></li>
            <li><a href="#">Hỏi đáp trực tiếp</a></li>
            <li><a href="#">Làm bài kiểm tra trực tuyến</a></li>
          </ul>
        </div>


        <div>
          <h3>BK-Study</h3>
          <p><strong>Ngày thành lập:</strong> 21/03/2025</p>
          <p><strong>Lĩnh vực:</strong> Giáo dục.</p>
        </div>
      </div>

      <div className="footer-social">
        <FaYoutube className="youtube" />
        <FaFacebook className="facebook" />
        <FaTiktok className="tiktok" />
      </div>


      <p className="footer-copyright">
        &copy; E-Learning. Học Mọi Lúc, Nâng Tầm Tương Lai
      </p>
    </footer>
  );
};

export default Footer;
