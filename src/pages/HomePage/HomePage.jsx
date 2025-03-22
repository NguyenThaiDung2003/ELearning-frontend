import Header from "../../component/Header/Header";
import Footer from "../../component/Footer/Footer";
import './style.css';

const HomePage = () => {
  return (
    <div className="Home">
      <Header />
      
    <div className="content">
      <p>Đây là phần nội dung</p>
    </div>


      <Footer />
    </div>
  );
};

export default HomePage;
