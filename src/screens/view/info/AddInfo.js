import {
  CButton,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CRow,
  CFormCheck,
} from "@coreui/react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import API_BASE_URL from "../../../API/config";
import SuccessModal from "../../../Component/SuccessModal";

function AddInfo() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false); // State cho modal
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    const phoneRegex = /^[0-9]{10,15}$/;

    if (!userName) {
      toast.error("Tên không được để trống.");
      return false;
    }
    if (!emailRegex.test(email)) {
      toast.error("Email không đúng định dạng.");
      return false;
    }
    if (!passwordRegex.test(password)) {
      toast.error(
        "Mật khẩu phải có ít nhất 8 ký tự, bao gồm ít nhất 1 chữ số, 1 chữ thường và 1 chữ hoa."
      );
      return false;
    }
    if (!phoneRegex.test(phone)) {
      toast.error("Số điện thoại phải là số hợp lệ.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    const token = localStorage.getItem("authToken");
    e.preventDefault();

    if (!validateForm()) return;

    const data = {
      name: userName,
      email: email,
      password: password,
      phone: phone,
      isAdmin: isAdmin,
    };
    setIsLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/api/v1/users/register`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Thêm tài khoản thành công!");
      setModalVisible(true); // Hiển thị modal thành công
      setTimeout(() => navigate("/member"), 2000); // Chuyển hướng sau 2 giây
    } catch (error) {
      console.error("Lỗi khi thêm tài khoản:", error);
      toast.error("Không thể thêm tài khoản.");
    }finally {
      setIsLoading(false); // Kết thúc trạng thái loading
    }
  };

  return (
    <CContainer>
      <CCol className="d-flex justify-content-between align-items-center my-3">
        <h4 className="mb-4">THÊM TÀI KHOẢN MỚI</h4>

        <CButton color="primary" className="mb-3">
          <Link
            to="/member"
            style={{ color: "white", textDecoration: "none" }}
          >
           Danh sách
          </Link>
        </CButton>
      </CCol>

      <CRow>
        <CCol md={12}>
          <CForm className="row gy-3" onSubmit={handleSubmit}>
            <CCol md={12}>
              <CFormInput
                label="Tên đăng nhập"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </CCol>
            <CCol md={12}>
              <CFormInput
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </CCol>
            <CCol md={12}>
              <CFormInput
                type="password"
                label="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </CCol>
            <CCol md={12}>
              <CFormInput
                label="Số điện thoại"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </CCol>
            <CCol md={12}>
              <CFormCheck
                type="checkbox"
                label="Admin"
                checked={isAdmin}
                onChange={() => setIsAdmin(!isAdmin)}
              />
            </CCol>
            <CCol xs={12}>
              <CButton color="primary" type="submit" size="sm" disabled={isLoading}>
                {isLoading ? "Đang thêm..." : "Thêm"}
              </CButton>
            </CCol>
          </CForm>
        </CCol>
      </CRow>
      <SuccessModal
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
      />
    </CContainer>
  );
}

export default AddInfo;
