import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
import API_BASE_URL from "../../API/config";
import { CSpinner } from "@coreui/react";
import { toast, ToastContainer } from 'react-toastify';
const Login = () => {
  const [email, setEmail] = useState(""); // Trạng thái email
  const [password, setPassword] = useState(""); // Trạng thái password
  const [loading, setLoading] = useState(false); // Quản lý trạng thái loading

  const handleLogin = async () => {
    setLoading(true); // Bắt đầu loading
    try {
      const response = await axios.post(`${API_BASE_URL}/api/v1/users/login`, {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json", // Xác định kiểu dữ liệu là JSON
        },
      });
      const { token, userId, isAdmin } = response.data; // Giả sử API trả về cả token và _id của user

      if (!isAdmin) {
        // Kiểm tra quyền admin
        toast.error("Tài khoản của bạn không có quyền admin!");
        setLoading(false);
        return;
      }

      localStorage.setItem("authToken", token); // Lưu token vào localStorage
      localStorage.setItem("userId", userId); // Lưu _id của user vào localStorage
      window.location.href = "/"; // Chuyển hướng về trang chủ
    } catch (error) {
      toast.error("Lỗi email hoặc mật khẩu không đúng!");
      console.error("Error during login:", error);
      // Bạn có thể thêm thông báo lỗi cho người dùng ở đây
    } finally {
      setLoading(false); // Kết thúc loading
    }
  };

  return (
    <div id="loginContainer">
      <div id="loginContent">
      <ToastContainer position="top-right" autoClose={3000} />
        <div id="formLogin">
          <img src={require("./../../Img/goood.png")} alt="" />
          <p>Email</p>
          <input
            type="text"
            placeholder="...@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Cập nhật trạng thái email
          />
          <p>Password</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Cập nhật trạng thái password
            placeholder="*******"
          />
          <button
            className="loadingButton"
            onClick={handleLogin}
            disabled={loading} // Vô hiệu hóa nút khi đang loading
          >
            {loading ? (
              <span>Đang đăng nhập...</span> // Hiển thị thông báo khi loading
            ) : (
              <>         
                <p className="dangnhap">Đăng nhập</p>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
