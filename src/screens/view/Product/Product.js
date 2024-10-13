import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CRow, CCol, CButton } from "@coreui/react";
import BackButton from "../../../Component/BackButton";
import CustomCard from "../../../Component/CustomCard";
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
      // Call onDeleteProduct with both category ID and product ID
      const categoryId = parseInt(id); // Get category ID from URL
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
          {/* <BackButton label="Quay lại" /> */}

          <CButton color="primary" className="mb-3 me-3">
            <Link to={`/category`} style={{ color: "white", textDecoration: "none" }}>
              Danh mục
            </Link>
          </CButton>

          <CButton color="primary" className="mb-3">
            <Link to={`/category/${id}/addproduct`} style={{ color: "white", textDecoration: "none" }}>
              Thêm sản phẩm
            </Link>
          </CButton>
        </div>
      </CCol>

      <CRow >
        {category.products.length > 0 ? (
          category.products.map((product) => (
            <CCol md={3}>
            <CustomCard
            
              key={product.id}
              item={product}
              onDeleteClick={handleDeleteClick} // Thêm hàm xử lý xóa sản phẩm
              showButtons={true}
            />
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
