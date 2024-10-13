import React from "react";
import { useParams, Link } from "react-router-dom";
import { CCard, CCardBody, CCardTitle, CCardText, CButton } from "@coreui/react";
import categories from "../../../Data"; // Giả sử bạn đã lưu dữ liệu danh mục ở đây
import BackButton from "../../../Component/BackButton";

const ProductDetail = () => {
  const { name } = useParams(); // Lấy tên sản phẩm từ URL

  // Tìm sản phẩm trong danh sách
  const product = categories
    .flatMap(category => category.products) // Lấy tất cả sản phẩm từ tất cả danh mục
    .find(product => product.name === name); // Tìm sản phẩm theo tên

  if (!product) {
    return (
      <h4>
        Sản phẩm không tồn tại. <BackButton label="Quay lại" />
      </h4>
    );
  }

  return (
    <div className="container">
      <CButton color="primary" className="my-3">
        <Link to="/category" style={{ color: "white", textDecoration: "none" }}>
          Quay lại danh sách danh mục
        </Link>
      </CButton>

      <CCard>
        <CCardBody>
          <CCardTitle style={{ textTransform: "uppercase" }}>{product.name}</CCardTitle>
          <CCardText>
            <strong>Mô tả:</strong> {product.description}
          </CCardText>
          {product.size && (
            <CCardText>
              <strong>Kích thước có sẵn:</strong> {product.size.join(", ")}
            </CCardText>
          )}
          {product.price && (
            <CCardText>
              <strong>Giá:</strong> {product.price.map((p, index) => (
                <span key={index}>
                  ${p.toFixed(2)} {product.size[index]}
                  {index < product.price.length - 1 ? ", " : ""}
                </span>
              ))}
            </CCardText>
          )}
        </CCardBody>
      </CCard>
    </div>
  );
};

export default ProductDetail;
