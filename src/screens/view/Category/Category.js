import React, { useEffect, useState } from "react";
import {
  CRow,
  CCol,
  CCard,
  CCardBody,
  CCardImage,
  CCardTitle,
  CButton,
} from "@coreui/react";
import { Link } from "react-router-dom";
import "./Category.css";
import DeleteModal from "../../../Component/DeleteModal";
import API_BASE_URL from "../../../API/config";

const Category = ({ onDeleteCategory }) => {
  const [categories, setCategories] = useState([]); // Khởi tạo state cho danh mục
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const [error, setError] = useState(""); // Trạng thái lỗi
  const [visible, setVisible] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/category`); // Thay đổi URL cho đúng
      if (!response.ok) {
        throw new Error("Không thể lấy dữ liệu danh mục"); // Xử lý lỗi nếu không thành công
      }
      const data = await response.json();
      setCategories(data); // Cập nhật danh mục từ API
    } catch (error) {
      setError(error.message); // Lưu thông báo lỗi
    } finally {
      setLoading(false); // Đặt trạng thái loading thành false
    }
  };

  useEffect(() => {
    fetchCategories(); // Gọi hàm fetchCategories khi component được mount
  }, []);

  const handleDeleteClick = (id) => {
    setSelectedCategoryId(id); // Lưu ID của danh mục cần xóa
    setVisible(true); // Hiển thị modal
  };

  const handleConfirmDelete = () => {
    if (selectedCategoryId !== null) {
      onDeleteCategory(selectedCategoryId); // Xóa danh mục
      setVisible(false); // Đóng modal sau khi xóa
    }
  };

  if (loading) {
    return <div>Đang tải danh mục...</div>; // Thông báo khi đang tải
  }

  if (error) {
    return <div>{error}</div>; // Thông báo lỗi nếu có
  }
 


  return (
    <div className="container">
      <CCol className="d-flex justify-content-between my-3">
        <h4 className="mb-4">DANH SÁCH DANH MỤC</h4>

        <CButton color="primary" className="mb-3">
          <Link
            to="/category/add"
            style={{ color: "white", textDecoration: "none" }}
          >
            Thêm danh mục
          </Link>
        </CButton>
      </CCol>

      <CRow>
        {categories.map((category) => (
          <CCol md={3} key={category.id} className="mb-4">
            <CCard>
              <Link to="" style={{ textDecoration: "none", color: "inherit" }}>
                <div className="image-container">
                  <CCardImage
                    className="custom-image"
                    orientation="top"
                    src={category.image}
                    alt={category.name}
                  />
                </div>
              </Link>

              <CCardBody>
                <CCardTitle>{category.name}</CCardTitle>

                <div className="d-flex justify-content-end">
                  <CButton color="danger" className="mx-2">
                    <i className="bi bi-trash"></i>
                  </CButton>
                  <CButton color="primary" className="mx-2">
                    <i className="bi bi-pencil-square"></i>
                  </CButton>
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        ))}
      </CRow>

      {/* Modal xác nhận xóa */}
      <DeleteModal
        visible={visible}
        onClose={() => setVisible(false)} // Đóng modal
        onConfirm={handleConfirmDelete} // Xác nhận xóa
      />
    </div>
  );
};

export default Category;
