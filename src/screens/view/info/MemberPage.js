import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  CContainer,
  CRow,
  CCol,
  CCard,
  CCardBody,
  CCardImage,
  CCardTitle,
  CSpinner,
  CFormCheck,
} from "@coreui/react";
import API_BASE_URL from "../../../API/config";

const MemberPage = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    const fetchMembers = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/v1/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const adminMembers = response.data.filter(
          (user) => user.isAdmin === true
        );
        setMembers(adminMembers);
        setLoading(false);
      } catch (err) {
        console.error("Lỗi khi lấy thông tin người dùng:", err);
        setError("Không thể tải thông tin thành viên");
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "200px" }}
      >
        <span>
          <CSpinner />
        </span>
      </div>
    );
  }

  if (error) {
    return <h4>{error}</h4>;
  }

  return (
    <CContainer>
      <h4 className="my-4">DANH SÁCH QUẢN TRỊ VIÊN</h4>
      <CRow>
        {members.map((member) => (
          <CCol key={member._id} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <CCard>
              <div className="image-container">
                <CCardImage
                  className="custom-image"
                  orientation="top"
                  src={member.image}
                  alt={member.name}
                />
              </div>
              <CCardBody>
                <CCardTitle>{member.name}</CCardTitle>
                <p>Email: {member.email}</p>
                <p>Điện thoại: {member.phone}</p>
                <CFormCheck
                  label="Admin"
                  name="isAdmin"
                  checked={member.isAdmin}
                  disabled
                />
                <CFormCheck
                  label="Xác thực"
                  name="isVerified"
                  checked={member.isVerified}
                  disabled
                />
                <CFormCheck
                  label="Hoạt động"
                  name="isActive"
                  checked={member.isActive}
                  disabled
                />
              </CCardBody>
            </CCard>
          </CCol>
        ))}
      </CRow>
    </CContainer>
  );
};

export default MemberPage;
