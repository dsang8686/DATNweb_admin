import React from "react";
import { useParams, Link } from "react-router-dom";
import {
  CCard,
  CCardBody,
  CCardImage,
  CCardTitle,
  CCardText,
  CButton,
  CTable,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
} from "@coreui/react";
import BackButton from "../../../Component/BackButton";
import categories from "../../../Data";

const ProductDetail = () => {
  const { id, productId } = useParams(); // Lấy categoryId và productId từ URL
  const category = categories.find((cat) => cat.id === parseInt(id));
  const product = category?.products.find(
    (prod) => prod.id === parseInt(productId)
  ); // Tìm sản phẩm theo productId

  if (!product) {
    return <h4>Không tìm thấy sản phẩm!</h4>;
  }

  return (
    <div className="container">
      <div className="d-flex justify-content-between my-3">
        <h4>Chi tiết sản phẩm - {product.name}</h4>
        <BackButton />
      </div>

      <div className="d-flex">
        {/* Phần hình ảnh */}
        <div className="me-4" style={{ flex: "0 0 30%" }}>
          <CCardImage
            className="custom-image"
            src={product.image}
            alt={product.name}
            style={{
              width: "30%",
              height: "auto",
              marginTop: 150,
              marginLeft: 50,
            }}
          />
        </div>

        {/* Phần thông tin sản phẩm */}
        <div style={{ flex: "1" }}>
          <CCard>
            <CCardBody>
              <CCardTitle>{product.name}</CCardTitle>
              <CCardText>{product.description}</CCardText>
            </CCardBody>
          </CCard>
          <CCard className="mt-3">
            <CCardBody>
              <CCardTitle>
                Chi tiết sản phẩm
                {/* Bảng hiển thị kích thước và giá */}
                <CTable>
                  <CTableBody>
                    {product.attributes.size.map((size, index) => (
                      <CTableRow key={size}>
                        <CTableDataCell>{size}</CTableDataCell>
                        <CTableDataCell>
                          {product.attributes.price[index]} USD
                        </CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                </CTable>
              </CCardTitle>
              <div className="d-flex justify-content-end">
                <Link to={`/addproduct-new/${product.id}`}>
                  <CButton color="primary" className="mx-1">
                    Thêm
                  </CButton>
                </Link>
                <CButton color="primary" className="mx-1">
                  Chỉnh sửa
                </CButton>
              </div>
            </CCardBody>
          </CCard>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
