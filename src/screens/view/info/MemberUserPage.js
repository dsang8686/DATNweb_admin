import React, { useEffect, useState } from "react";
import axios from "axios";
import { CContainer, CRow, CCol, CSpinner } from "@coreui/react";
import API_BASE_URL from "../../../API/config";

const MemberUserPage = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [verifiedUsers, setVerifiedUsers] = useState(0);
  const [unverifiedUsers, setUnverifiedUsers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
            `${API_BASE_URL}/api/v1/users`,
            {
              headers: {
                Authorization: `Bearer ${token}`, // kiểm trả token
              },
            }
          );
        const users = response.data;

        const verifiedCount = users.filter(user => user.isVerified === true).length;
        const unverifiedCount = users.filter(user => user.isVerified === false).length;

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
      <div className="d-flex justify-content-center align-items-center" style={{ height: "200px" }}>
        <span> <CSpinner /></span>
      </div>
    );
  }

  if (error) {
    return <h4>{error}</h4>;
  }

  return (
    <CContainer>
      <h3 className="my-4">Thống kê người dùng</h3>
      <CRow>
        <CCol xs={12}>
          <h5>Tổng số người dùng đã đăng ký: {totalUsers}</h5>
          <h5>Số lượng người đã xác minh: {verifiedUsers}</h5>
          <h5>Số lượng người chưa xác minh: {unverifiedUsers}</h5>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default MemberUserPage;
