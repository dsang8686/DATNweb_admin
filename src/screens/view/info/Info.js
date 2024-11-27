import {
  CButton,
  CCol,
  CContainer,
  CForm,
  CFormCheck,
  CFormInput,
  CImage,
  CRow,
  CCard,
  CCardBody,
  CCardHeader,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

  const fetchAdminInformation = async () => {
    const token = localStorage.getItem("authToken");
    const userId = localStorage.getItem("userId");

    if (token && userId) {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/v1/users/${userId}`,
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
      await axios.put(`${API_BASE_URL}/api/v1/users/${userId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
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
      <CCard className="mt-4">
        <CCardHeader className="text-center">
          <h4>Thông Tin Quản Trị Viên</h4>
        </CCardHeader>
        <CCardBody>
          {/* Header Info */}
          <CRow className="text-center mb-4">
            <CCol md={4} className="mx-auto">
              <CImage
                src={previewImage || "https://via.placeholder.com/150"}
                alt="Avatar"
                width="150"
                height="150"
                roundedCircle
              />
            </CCol>
          </CRow>
          {/* Form */}
          <CForm>
            <CRow className="gy-3">
              <CCol md={6}>
                <CFormInput
                  label="Tên Quản Trị Viên"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  disabled={!isEditing}
                />
              </CCol>
              <CCol md={6}>
                <CFormInput label="Email" value={email} disabled />
              </CCol>
              <CCol md={6}>
                <CFormInput
                  label="Số Điện Thoại"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={!isEditing}
                />
              </CCol>
              <CCol md={6}>
                <CFormInput
                  label="Giới Tính"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  disabled={!isEditing}
                />
              </CCol>
              <CCol md={6}>
                <CFormCheck
                  type="checkbox"
                  id="adminCheck"
                  label="Admin"
                  checked={admin}
                  onChange={(e) => setAdmin(e.target.checked)}
                  disabled={!isEditing}
                />
              </CCol>
              <CCol md={6}>
                <CFormInput
                  type="file"
                  label="Tải Lên Ảnh Đại Diện"
                  onChange={handleImageChange}
                  disabled={!isEditing}
                />
              </CCol>
              {previewImage && (
                <CCol md={12} className="text-center mt-3">
                  <CImage
                    src={previewImage}
                    alt="Preview"
                    width="100"
                    height="100"
                    rounded
                  />
                </CCol>
              )}
            </CRow>

            {/* Action Buttons */}
            <CRow className="text-center mt-4">
              <CCol>
                {isEditing ? (
                  <>
                    <CButton color="danger" onClick={handleEditToggle}>
                      Hủy
                    </CButton>
                    <CButton
                      color="success"
                      className="ms-3"
                      onClick={handleSave}
                    >
                      Lưu
                    </CButton>
                  </>
                ) : (
                  <CButton color="primary" onClick={handleEditToggle}>
                    Chỉnh Sửa
                  </CButton>
                )}
              </CCol>
            </CRow>
          </CForm>
        </CCardBody>
      </CCard>
    </CContainer>
  );
}

export default Info;
