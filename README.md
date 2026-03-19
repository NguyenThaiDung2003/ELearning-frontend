# BK-STUDY — Website Học Trực Tuyến

BK-STUDY là một hệ thống học trực tuyến đơn giản, dễ sử dụng, hỗ trợ đầy đủ chức năng cho cả **người học** lẫn **quản trị viên**.

🌐 **Live Demo:** [https://projectweb-68a6b.web.app/](https://projectweb-68a6b.web.app/)
💻 **Backend repo:** [https://github.com/NguyenThaiDung2003/ELearning-backend](https://github.com/NguyenThaiDung2003/ELearning-backend)

---

## 📋 Mục lục

- [Tổng quan](#tổng-quan)
- [Tính năng](#tính-năng)
- [Công nghệ sử dụng](#công-nghệ-sử-dụng)
- [Cài đặt & Chạy dự án](#cài-đặt--chạy-dự-án)
- [Cấu trúc dự án](#cấu-trúc-dự-án)
- [Bảo mật](#bảo-mật)
- [Thành viên nhóm](#thành-viên-nhóm)

---

## Tổng quan

BK-STUDY được xây dựng nhằm đáp ứng nhu cầu học trực tuyến ngày càng phát triển. Hệ thống cung cấp giao diện thân thiện, hiệu suất cao và trải nghiệm mượt mà trên mọi thiết bị.

---

## Tính năng

- 🎨 **Giao diện hiện đại, responsive** — hiển thị tốt trên mọi thiết bị (desktop, tablet, mobile)
- 🔐 **Xác thực người dùng bằng JWT** — lưu token an toàn, phân quyền rõ ràng giữa User và Admin
- 📚 **Quản lý khóa học** — duyệt, đăng ký và theo dõi tiến độ học tập
- ✅ **Quiz tương tác** — làm bài kiểm tra với chấm điểm tự động và hiển thị kết quả ngay lập tức
- 🛡️ **Trang quản trị viên** — quản lý người dùng, khóa học và nội dung
- 🚀 **Tự động triển khai** — CI/CD qua GitHub Actions, hosting trên Firebase

---

## Công nghệ sử dụng

| Công nghệ | Mục đích |
|-----------|----------|
| **ReactJS** | Thư viện xây dựng giao diện người dùng |
| **Redux Toolkit** | Quản lý trạng thái tập trung, tối ưu hiệu suất |
| **JWT (JSON Web Token)** | Xác thực và phân quyền người dùng |
| **Firebase** | Hosting & triển khai ứng dụng |
| **GitHub Actions** | CI/CD pipeline tự động |

---

## Cài đặt & Chạy dự án

### Yêu cầu

- Node.js >= 16.x
- npm hoặc yarn

### Cài đặt

```bash
# Clone repository
git clone <repository-url>
cd bk-study-frontend

# Cài đặt dependencies
npm install
```

### Cấu hình môi trường

Tạo file `.env` ở thư mục gốc và thêm các biến môi trường:

```env
REACT_APP_API_URL=<backend-api-url>
REACT_APP_FIREBASE_API_KEY=<firebase-api-key>
```

### Chạy ứng dụng

```bash
# Development
npm start

# Build production
npm run build
```

---

## Cấu trúc dự án

```
src/
├── components/       # Các component dùng chung
├── pages/            # Các trang chính (Home, Course, Admin, ...)
├── features/         # Redux slices (auth, course, quiz, ...)
├── services/         # Gọi API
├── hooks/            # Custom hooks
├── utils/            # Hàm tiện ích
└── App.js            # Entry point
```

---

## Bảo mật

- JWT, phân quyền User/Admin
- Bcrypt hash mật khẩu, OTP đổi mật khẩu
- cấu hình CORS hợp lý
---

## Thành viên nhóm

| Thành viên | Vai trò | GitHub |
|------------|---------|--------|
| Nguyễn Thái Dũng | Backend | [@NguyenThaiDung2003](https://github.com/NguyenThaiDung2003) |
| Nguyễn Tiến Dũng | Frontend — Khóa học | [@ntd237](https://github.com/ntd237) |
| Nguyễn Thị Thùy Dung | Frontend — Quản trị viên | [@dunhdonh](https://github.com/dunhdonh) |
| Trần Anh Dũng | Frontend — Người dùng | [@tad-4963](https://github.com/tad-4963) |

---
