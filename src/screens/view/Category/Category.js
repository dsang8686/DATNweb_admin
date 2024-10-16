import React, { useState } from "react";
import { CRow, CCol, CCard, CCardBody, CCardImage, CCardTitle, CCardText, CButton } from "@coreui/react";
import { Link } from "react-router-dom";
import "./Category.css";
import DeleteModal from "../../../Component/DeleteModal";

const Category = ({ categories, onDeleteCategory }) => {
  const [visible, setVisible] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

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
              <Link
                to=""
                style={{ textDecoration: "none", color: "inherit" }}
              >
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
                  <CButton
                    color="danger"
                    onClick={() => handleDeleteClick(category.id)}
                    className="mx-2"
                  >
                    Delete
                  </CButton>
                  <CButton color="primary" className="mx-2">
                    Edit
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
