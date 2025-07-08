
# Mini CMS - React + Sails.js

Một hệ thống quản lý sản phẩm đơn giản, được xây dựng bằng **React** ở phía frontend và **Sails.js** ở phía backend. Dự án bao gồm chức năng đăng ký, đăng nhập (JWT), quản lý sản phẩm với tìm kiếm và phân trang.

## 🛠️ Công nghệ sử dụng

- Frontend: React + React Router DOM
- Backend: Sails.js + Waterline ORM
- Authentication: JSON Web Token (JWT)
- API: RESTful

---

## 🚀 Hướng dẫn cài đặt và chạy dự án

### 1. Clone repository
```bash
git clone https://github.com/gianghuong13/mini-cms-project.git
cd mini-cms-project
```

### 2. Cài đặt backend (Sails.js)
```bash
cd backend
npm install
sails lift
```
Mặc định backend chạy ở: http://localhost:1337

### 3. Cài đặt frontend (React)
```bash
cd frontend
npm install 
npm run dev
```

Mặc định frontend chạy ở: http://localhost:5173

## 📦 Cấu trúc thư mục

```
mini-cms/
├── frontend/                # Frontend React
│   ├── components/          # Các component tái sử dụng (Button, Input, ...)
│   ├── pages/               # Các trang như Login, Register, Product
│   ├── App.jsx
│   └── main.jsx
├── backend/                  # Backend Sails.js
│   ├── api/
│   │   ├── controllers/     # Các controller xử lý request
│   │   ├── models/          # Các model định nghĩa dữ liệu
│   │   └── policies/        # Middleware xác thực quyền
│   ├── config/              # Cấu hình route, database, policies
│   └── app.js
└── README.md
```

## 💡 Gợi ý phát triển tiếp theo
#### ✅Đã có: Đăng ký, đăng nhập, thêm/sửa/xóa sản phẩm, tìm kiếm, phân trang.
### Gợi ý mở rộng:

- [ ] Phân quyền: Admin vs User (User chỉ xem, Admin mới được chỉnh sửa)

- [ ] Upload ảnh sản phẩm (Sails + Cloudinary hoặc local)

- [ ] Thêm bảng Category, tạo quan hệ 1-n với sản phẩm

- [ ] Quản lý người dùng: danh sách user, phân quyền trong admin dashboard
