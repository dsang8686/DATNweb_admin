import React, { useEffect, useState } from "react";
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
  CTableDataCell,
} from "@coreui/react";
import BackButton from "../../../Component/BackButton";
import axios from "axios";
import API_BASE_URL from "../../../API/config";

const ProductDetail = () => {
  const { productId } = useParams(); // Lấy productId từ URL
  const [product, setProduct] = useState(null); // Trạng thái cho sản phẩm
  const [loading, setLoading] = useState(true); // Quản lý trạng thái loading

  // Gọi API để lấy thông tin chi tiết sản phẩm
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/v1/products/${productId}`
        );
        setProduct(response.data); // Lưu sản phẩm vào state
        setLoading(false); // Tắt trạng thái loading
      } catch (error) {
        console.error("Lỗi khi tải chi tiết sản phẩm:", error);
        setLoading(false); // Tắt trạng thái loading nếu lỗi xảy ra
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return <div>Đang tải chi tiết sản phẩm...</div>;
  }

  if (!product) {
    return <h4>Không tìm thấy sản phẩm!</h4>;
  }

  return (
    <div className="container">
      <div className="d-flex justify-content-between my-3">
        <h4>Chi tiết sản phẩm - {product.name}</h4>
        <BackButton />
      </div>

      <div className="row">
       
        <div className="col-md-4">
          <CCardImage
            // className="custom-image"
            src={product.image}
            alt={product.name}
            style={{
              width: "100%", // Chiều rộng 100% của cột
              height: "auto",
              
            }}
          />
        </div>

        {/* Phần thông tin sản phẩm, chiếm md=7 */}
        <div className="col-md-8">
          <CCard>
            <CCardBody>
              <CCardTitle>Danh mục: {product.category.name}</CCardTitle>
              <CCardTitle>{product.name}</CCardTitle>
              <CCardText>{product.description}</CCardText>
            </CCardBody>
          </CCard>

          <CCard className="mt-3">
            <CCardBody>
              <CCardTitle>Kích cỡ và giá</CCardTitle>
              {/* Bảng hiển thị kích thước và giá */}
              <CTable>
                <CTableBody>
                  {/* Thông tin kích thước và giá sẽ được thêm ở đây */}
                </CTableBody>
              </CTable>

              <div className="d-flex justify-content-end">
                <CButton color="danger" className="mx-2">
                  <i className="bi bi-trash"></i>
                </CButton>
                <Link to={`/addattributes-new/${product.id}`}>
                  <CButton color="primary" className="mx-2">
                    <i className="bi bi-pencil-square"></i>
                  </CButton>
                </Link>
              </div>
            </CCardBody>
          </CCard>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
