import {
  CButton,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CImage,
  CRow,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Info() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Trạng thái đăng nhập

  const fetchAdminInformation = async () => {
    // Bạn có thể gọi API để lấy thông tin admin ở đây
    // Giả sử bạn đã có token trong localStorage để kiểm tra đăng nhập
    const token = localStorage.getItem("authToken");

    if (token) {
      setIsLoggedIn(true); // Nếu có token, đánh dấu đã đăng nhập
      // Gọi API lấy thông tin admin (thay thế URL API của bạn)
      // const response = await axios.get('/api/admin/info', {
      //   headers: { Authorization: `Bearer ${token}` }
      // });
      // const data = response.data;
      // setUserName(data.userName);
      // setEmail(data.email);
      // setDisplayName(data.displayName);
      // setPhone(data.phone);
    } else {
      toast.error("Bạn cần đăng nhập để xem thông tin này.");
      navigate("/login"); // Chuyển hướng đến trang đăng nhập nếu chưa đăng nhập
    }
  };

  useEffect(() => {
    fetchAdminInformation();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Xử lý cập nhật thông tin ở đây
    // Có thể gọi API để cập nhật thông tin admin
  };

  return (
    <CContainer>
      <CRow className="mb-3">
        <CCol md={6}>
          <h2>THÔNG TIN ADMIN</h2>
          <h6>Thông tin tài khoản</h6>
        </CCol>
        <CCol md={6}>
          <div className="d-flex justify-content-end">
            <Link to={"/admin/list"}>
              <CButton color="primary" size="sm">
                Thêm mới
              </CButton>
            </Link>
          </div>
        </CCol>
      </CRow>
      <CRow>
        <CCol md={6}>
          <CForm className="row gy-3">
            {isLoggedIn ? (
              <>
                <CCol md={12}>
                  <CFormInput
                    id="inputEmail4"
                    label="Tên đăng nhập"
                    value={userName}
                    disabled
                  />
                </CCol>

                <CCol md={12}>
                  <CFormInput
                    type="password"
                    id="inputPassword4"
                    label="Mật khẩu mới"
                    disabled
                  />
                </CCol>
              </>
            ) : (
              <h6>Bạn chưa đăng nhập. Vui lòng đăng nhập để xem thông tin.</h6>
            )}
          </CForm>
        </CCol>
      </CRow>
    </CContainer>
  );
}

export default Info;
