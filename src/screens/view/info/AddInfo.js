import {
  CButton,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CRow,
  CFormCheck,
} from '@coreui/react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import API_BASE_URL from '../../../API/config';

function AddInfo() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false); // Thêm state cho checkbox admin

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name: userName, // Sử dụng tên đăng nhập làm tên hiển thị
      email: email,
      password: password,
      phone: phone,
      isAdmin: isAdmin, // Gửi giá trị của checkbox admin
    };

    try {
      await axios.post(`${API_BASE_URL}api/v1/users/register`, data);
      toast.success('Thêm tài khoản thành công!');
      navigate('/admin/list'); // Chuyển hướng sau khi thêm thành công
    } catch (error) {
      console.error('Lỗi khi thêm tài khoản:', error);
      toast.error('Không thể thêm tài khoản.');
    }
  };

  return (
    <CContainer>
      <CRow className="mb-3">
        <CCol md={6}>
          <h2>THÊM ADMIN</h2>
          <h6>Thông tin tài khoản</h6>
        </CCol>
        <CCol md={6}>
          <div className="d-flex justify-content-end">
            <Link to={'/admin/list'}>
              <CButton color="primary" size="sm">
                Thêm mới
              </CButton>
            </Link>
          </div>
        </CCol>
      </CRow>
      <CRow>
        <CCol md={6}>
          <CForm className="row gy-3" onSubmit={handleSubmit}>
            <CCol md={12}>
              <CFormInput
                id="inputEmail4"
                label="Tên đăng nhập"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </CCol>

            <CCol md={12}>
              <CFormInput
                type="password"
                id="inputPassword4"
                label="Mật khẩu mới"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </CCol>

            <CCol md={12}>
              <CFormInput
                id="inputAddress"
                label="Thư điện tử"
                text="Thư điện tử (bắt buộc)."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </CCol>

            <CCol md={12}>
              <CFormInput
                id="inputPhone"
                label="Số điện thoại"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </CCol>

            <CCol md={12}>
              <CFormCheck
                type="checkbox"
                id="adminCheck"
                label="Admin"
                checked={isAdmin}
                onChange={() => setIsAdmin(!isAdmin)} // Đổi trạng thái khi click
              />
            </CCol>

            <CCol xs={12}>
              <CButton color="primary" type="submit" size="sm">
                Cập nhật
              </CButton>
            </CCol>
          </CForm>
        </CCol>
      </CRow>
    </CContainer>
  );
}

export default AddInfo;
