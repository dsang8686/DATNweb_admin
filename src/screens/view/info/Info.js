import {
  CButton,
  CCol,
  CContainer,
  CForm,
  CFormCheck,
  CFormInput,
  CImage,
  CRow,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import API_BASE_URL from "../../../API/config";

function Info() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [admin, setAdmin] = useState(false);
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const fetchAdminInformation = async () => {
    const token = localStorage.getItem("authToken");
    const userId = localStorage.getItem("userId");

    if (token && userId) {
      setIsLoggedIn(true);

      try {
        const response = await axios.get(
          `https://app-datn-gg.onrender.com/api/v1/users/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const data = response.data;
        setUserName(data.name);
        setEmail(data.email);
        setPhone(data.phone);
        setGender(data.gender);
        setAdmin(data.isAdmin);
        setImage(data.image);
        setPreviewImage(data.image);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin admin:", error);
        toast.error("Không thể lấy thông tin admin.");
      }
    } else {
      toast.error("Bạn cần đăng nhập để xem thông tin này.");
      navigate("/login");
    }
  };

  const handleEditToggle = () => setIsEditing(!isEditing);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    const token = localStorage.getItem("authToken");
    const userId = localStorage.getItem("userId");
    if (!token) return toast.error("Vui lòng đăng nhập lại.");

    const formData = new FormData();
    formData.append("name", userName);
    formData.append("phone", phone);
    formData.append("gender", gender);
    formData.append("isAdmin", admin);
    if (image) formData.append("image", image);

    try {
      await axios.put(
        `${API_BASE_URL}/api/v1/users/${userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Cập nhật thông tin thành công!");
      setIsEditing(false);
    } catch (error) {
      console.error("Lỗi khi cập nhật thông tin:", error);
      toast.error("Không thể cập nhật thông tin.");
    }
  };

  useEffect(() => {
    fetchAdminInformation();
  }, []);

  return (
    <CContainer>
      <CCol className="d-flex justify-content-between my-3">
        <h4 className="mb-4">THÔNG TIN ADMIN</h4>
        <CButton color="primary" className="mb-3">
          <Link
            to={"/admin/list"}
            style={{ color: "white", textDecoration: "none" }}
          >
            Thêm admin mới
          </Link>
        </CButton>
      </CCol>

      <CCol
        md={12}
        className="d-flex justify-content-between "
        style={{ alignItems: "center" }}
      >
        <h6>Thông tin tài khoản</h6>
        <button className="mb-3 border-0">
          <Link style={{ color: "white", textDecoration: "none" }}>
            <div onClick={handleEditToggle}>
              {isEditing ? (
                <div>
                  <CButton
                    color="danger"
                    className="bi bi-x-square"
                    style={{ fontSize: 20 }}
                  />
                  <CButton
                    color="success"
                    className="bi bi-check2-square ms-2"
                    style={{ fontSize: 20 }}
                    onClick={handleSave}
                  />
                </div>
              ) : (
                <CButton
                  color="primary"
                  className="bi bi-pencil-square"
                  style={{ fontSize: 20 }}
                />
              )}
            </div>
          </Link>
        </button>
      </CCol>

      <CRow>
        <CCol md={12}>
          <CForm className="row gy-3 mt-1">
            {isLoggedIn ? (
              <>
                <CCol md={12}>
                  <CFormInput
                    label="Tên Admin"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    disabled={!isEditing}
                  />
                </CCol>
                <CCol md={12}>
                  <CFormInput label="Email" value={email} disabled />
                </CCol>
                <CCol md={12}>
                  <CFormInput
                    label="Số điện thoại"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    disabled={!isEditing}
                  />
                </CCol>
                <CCol md={12}>
                  <CFormInput
                    label="Giới tính"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    disabled={!isEditing}
                  />
                </CCol>
                <CCol md={12}>
                  <CFormCheck
                    type="checkbox"
                    id="adminCheck"
                    label="Admin"
                    checked={admin}
                    onChange={(e) => setAdmin(e.target.checked)}
                    disabled={!isEditing}
                  />
                </CCol>
                <CCol md={12}>
                  <CFormInput
                    type="file"
                    label="Ảnh đại diện"
                    onChange={handleImageChange}
                    
                  />
                  {previewImage && (
                    <CImage
                      src={previewImage}
                      alt="Profile Preview"
                      width="200"
                      rounded
                      className="mt-3"
                    />
                  )}
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
