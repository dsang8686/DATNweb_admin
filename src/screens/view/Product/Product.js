import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  CRow,
  CCol,
  CButton,
  CCard,
  CCardBody,
  CCardImage,
  CCardTitle,
  CCardText,
} from "@coreui/react";
import DeleteModal from "../../../Component/DeleteModal"; // Modal xác nhận xóa

const Product = ({ categories, onDeleteProduct }) => {
  const { id } = useParams(); // Lấy ID từ URL
  const category = categories.find((cat) => cat.id === parseInt(id)); // Tìm danh mục theo ID
  const [visible, setVisible] = useState(false); // Quản lý trạng thái hiển thị modal
  const [selectedProductId, setSelectedProductId] = useState(null); // Sản phẩm được chọn để xóa

  const handleDeleteClick = (productId) => {
    setSelectedProductId(productId); // Lưu ID của sản phẩm cần xóa
    setVisible(true); // Hiển thị modal
  };

  const handleConfirmDelete = () => {
    if (selectedProductId !== null) {
      const categoryId = parseInt(id); // Lấy ID danh mục từ URL
      onDeleteProduct(categoryId, selectedProductId); // Xóa sản phẩm
      setVisible(false); // Đóng modal sau khi xóa
    }
  };

  return (
    <div className="container">
      <CCol className="d-flex justify-content-between my-3">
        <h4 style={{ textTransform: "uppercase" }}>
          Sản phẩm - [{category.name}]
        </h4>
        <div>
          <CButton color="primary" className="mb-3 me-3">
            <Link
              to={`/allproducts`}
              style={{ color: "white", textDecoration: "none" }}
            >
              Tất cả sản phấm
            </Link>
          </CButton>

          <CButton color="primary" className="mb-3">
            <Link
              to={`/addproduct-new`}
              style={{ color: "white", textDecoration: "none" }}
            >
              Thêm sản phẩm
            </Link>
          </CButton>
        </div>
      </CCol>

      <CRow>
        {category.products.length > 0 ? (
          category.products.map((product) => (
            <CCol md={3} key={product.id}>
              <CCard className="mb-4 me-1">
                <Link style={{ textDecoration: "none", color: "inherit" }}>
                  <div className="image-container">
                    <CCardImage
                      className="custom-image"
                      orientation="top"
                      src={product.image}
                      alt={product.name}
                    />
                  </div>
                </Link>
                <CCardBody>
                  <CCardTitle>{product.name}</CCardTitle>
                  <CCardText className="truncate">{product.description}</CCardText>

                  <div className="d-flex justify-content-end">
                    <CButton
                      color="danger"
                      onClick={() => handleDeleteClick(product.id)}
                      className="mx-1"
                    >
                      Xóa
                    </CButton>
                    <CButton color="primary" className="mx-1">
                      Chỉnh sửa
                    </CButton>
                    <CButton color="secondary" className="mx-1">
                      <Link
                        to={`/category/${id}/product/${product.id}`}
                        style={{ color: "white", textDecoration: "none" }}
                      >
                        Chi tiết
                      </Link>
                    </CButton>
                  </div>
                </CCardBody>
              </CCard>
            </CCol>
          ))
        ) : (
          <h4>DANH MỤC NÀY CHƯA CÓ SẢN PHẨM</h4>
        )}
      </CRow>

      {/* Modal xác nhận xóa sản phẩm */}
      <DeleteModal
        visible={visible}
        onClose={() => setVisible(false)} // Đóng modal
        onConfirm={handleConfirmDelete} // Xác nhận xóa sản phẩm
      />
    </div>
  );
};

export default Product;
