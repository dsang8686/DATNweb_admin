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
  CButton,
  CFormCheck,
  CSpinner,
} from "@coreui/react";
import API_BASE_URL from "../../../API/config";

const MemberPage = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

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

  const handleEditClick = (member) => {
    setEditMode(true);
    setSelectedMember({ ...member });
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setSelectedMember(null);
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;

    // Cập nhật selectedMember với giá trị mới của checkbox
    setSelectedMember((prev) => ({
      ...prev,
      [name]: checked, // cập nhật với giá trị của checkbox
    }));
  };

  const handleSaveChanges = async () => {

    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.put(
        `${API_BASE_URL}/api/v1/users/${selectedMember._id}`,
        {
          isAdmin: selectedMember.isAdmin,
          isVerified: selectedMember.isVerified,
          isActive: selectedMember.isActive,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Kiểm tra xem response có dữ liệu không trước khi ghi nhận
      if (response && response.data) {
        console.log("Phản hồi từ API:", response.data); // Kiểm tra phản hồi
      } else {
        console.log("Không có dữ liệu phản hồi từ API.");
      }

      setEditMode(false);
      setSelectedMember(null);
      // Refresh members after save
      const membersResponse = await axios.get(`${API_BASE_URL}/api/v1/users/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const adminMembers = membersResponse.data.filter(
        (user) => user.isAdmin === true
      );
      setMembers(adminMembers);
    } catch (error) {
      console.error("Lỗi khi cập nhật người dùng:", error);
      setError("Không thể cập nhật thông tin người dùng");
    }
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "200px" }}
      >
        <span> <CSpinner /></span>
      </div>
    );
  }

  if (error) {
    return <h4>{error}</h4>;
  }

  return (
    <CContainer>
      <h3 className="my-4">Danh sách thành viên là quản trị viên</h3>
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
                  checked={
                    selectedMember?._id === member._id
                      ? selectedMember.isAdmin
                      : member.isAdmin
                  }
                  disabled={!editMode || selectedMember?._id !== member._id}
                  onChange={handleCheckboxChange}
                />
                <CFormCheck
                  label="xác thực"
                  name="isVerified"
                  checked={
                    selectedMember?._id === member._id
                      ? selectedMember.isVerified
                      : member.isVerified
                  }
                  disabled={!editMode || selectedMember?._id !== member._id}
                  onChange={handleCheckboxChange}
                />
                <CFormCheck
                  label="Hoạt động"
                  name="isActive"
                  checked={
                    selectedMember?._id === member._id
                      ? selectedMember.isActive
                      : member.isActive
                  }
                  disabled={!editMode || selectedMember?._id !== member._id}
                  onChange={handleCheckboxChange}
                />
                {!editMode || selectedMember?._id !== member._id ? (
                  <div className="text-end">
                    <CButton
                      color="primary"
                      onClick={() => handleEditClick(member)}
                    >
                      <i
                        style={{ color: "white" }}
                        className="bi bi-pencil-square"
                      ></i>
                    </CButton>
                  </div>
                ) : (
                  <div className="text-end">
                    <CButton color="success" onClick={handleSaveChanges}>
                      <i class="bi bi-check2-square"></i>
                    </CButton>
                    <CButton
                      color="danger"
                      onClick={handleCancelEdit}
                      className="ms-2"
                    >
                      <i className="bi bi-x-square" />
                    </CButton>
                  </div>
                )}
              </CCardBody>
            </CCard>
          </CCol>
        ))}
      </CRow>
    </CContainer>
  );
};

export default MemberPage;
