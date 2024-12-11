import React, { useEffect, useState } from "react";
import {
  CCol,
  CButton,
  CCard,
  CCardBody,
  CCardImage,
  CCardTitle,
  CCardText,
  CRow,
  CSpinner,
} from "@coreui/react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../../../API/config";
import DeleteModal from "../../../Component/DeleteModal";
import { toast } from "react-toastify";
import UnActiveModal from "../../../Component/UnActiveModal";

const AllProductUnActive = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/v1/products/get/un_active`
      );

      // Lọc sản phẩm có `category` khác `null`
      const filteredProducts = response.data.filter(
        (product) => product.category
      );

      setProducts(filteredProducts);
      setLoading(false);
    } catch (error) {
      console.error("Lỗi khi tải sản phẩm:", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const handleViewDetail = (productId) => {
    navigate(`/product-detail/${productId}`);
  };


  const token = localStorage.getItem("authToken");
  if (!token) {
    toast.error("Bạn cần đăng nhập để thêm danh mục!");
    navigate("/login");
    return;
  }

  //bỏ ẩn sản phẩm
  const handleActieve = (id) => {
    setSelectedProductId(id);
    setVisible(true);
  };
  const handleActieveConfirm = async () => {
    try {
      await axios.put(
        `${API_BASE_URL}/api/v1/products/${selectedProductId}`,
        { isActive: true },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProducts(
        products.map((product) =>
          product._id === selectedProductId
            ? { ...product, isActive: false }
            : product
        )
      );
      setVisible(false);
      toast.success("Bỏ ẩn sản phẩm thành công");
      fetchProducts();
    } catch (error) {
      toast.error("Lỗi khi ẩn");
      console.error("Lỗi khi chuyển trạng thái sản phẩm:", error);
      setVisible(false);
    }
  };

  const handleEditClick = (productId) => {
    navigate(`/edit-product/${productId}`);
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "200px" }}
      >
        <CSpinner />
      </div>
    );
  }

  return (
    <div className="container">
      <CCol className="d-flex justify-content-between align-items-center my-3">
        <h4 className="mb-4">TẤT CẢ SẢN PHẨM ẨN</h4>
      </CCol>

      <CRow>
        {products.map((product) => (
          <CCol key={product._id} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <CCard>
              <Link to="" style={{ textDecoration: "none", color: "inherit" }}>
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
                <CCardTitle className="truncate">{product.name}</CCardTitle>
                <CCardText className="truncate">
                  {product.description}
                </CCardText>
                {/* <CCardText className="truncate">
                  {product.category}
                </CCardText> */}
                <div className="d-flex justify-content-end">
                  <CButton
                    color="info"
                    className="mx-1"
                    onClick={() => handleActieve(product._id)}
                  >
                    <i style={{ color: "white" }} className="bi-eye-slash"></i>
                  </CButton>
                  <CButton
                    color="primary"
                    className="mx-1"
                    onClick={() => handleEditClick(product._id)}
                  >
                    <i
                      style={{ color: "white" }}
                      className="bi bi-pencil-square"
                    ></i>
                  </CButton>
                  <CButton
                    color="success"
                    className="mx-1"
                    onClick={() => handleViewDetail(product._id)}
                  >
                    <i style={{ color: "white" }} className="bi bi-eye"></i>
                  </CButton>
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        ))}
      </CRow>

      <UnActiveModal
        visible={visible}
        onClose={() => setVisible(false)}
        onConfirm={handleActieveConfirm}
      />
    </div>
  );
};

export default AllProductUnActive;
