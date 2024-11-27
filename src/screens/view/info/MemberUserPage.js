import React, { useEffect, useState } from "react";
import axios from "axios";
import { CContainer, CRow, CCol, CCard, CCardBody, CCardHeader, CSpinner } from "@coreui/react";
import API_BASE_URL from "../../../API/config";

const MemberUserPage = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [verifiedUsers, setVerifiedUsers] = useState(0);
  const [unverifiedUsers, setUnverifiedUsers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/v1/users`, {
          headers: {
            Authorization: `Bearer ${token}`, // kiểm tra token
          },
        });
        const users = response.data;

        const verifiedCount = users.filter((user) => user.isVerified === true).length;
        const unverifiedCount = users.filter((user) => user.isVerified === false).length;

        setTotalUsers(users.length);
        setVerifiedUsers(verifiedCount);
        setUnverifiedUsers(unverifiedCount);
        setLoading(false);
      } catch (err) {
        console.error("Lỗi khi tải thông tin người dùng:", err);
        setError("Không thể tải thông tin người dùng");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "200px" }}
      >
        <CSpinner color="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <CContainer className="text-center">
        <h4 className="text-danger">{error}</h4>
      </CContainer>
    );
  }

  return (
    <CContainer>
      <CRow className="justify-content-center my-4">
        <CCol xs={12} md={8}>
          <CCard>
            <CCardHeader className="bg-primary text-white text-center">
              <h3>Thống kê người dùng</h3>
            </CCardHeader>
            <CCardBody>
              <CRow className="text-center">
                <CCol xs={12} md={4} className="mb-4 mb-md-0">
                  <div className="p-3 border rounded bg-light">
                    <h5 className="text-primary">Tổng người dùng</h5>
                    <h4>{totalUsers}</h4>
                  </div>
                </CCol>
                <CCol xs={12} md={4} className="mb-4 mb-md-0">
                  <div className="p-3 border rounded bg-light">
                    <h5 className="text-success">Đã xác minh</h5>
                    <h4>{verifiedUsers}</h4>
                  </div>
                </CCol>
                <CCol xs={12} md={4}>
                  <div className="p-3 border rounded bg-light">
                    <h5 className="text-danger">Chưa xác minh</h5>
                    <h4>{unverifiedUsers}</h4>
                  </div>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default MemberUserPage;
