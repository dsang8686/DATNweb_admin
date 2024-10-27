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
import DeleteModal from "../../../Component/DeleteModal"; // Import DeleteModal
import { toast } from "react-toastify";

const AllProduct = () => {
  const [products, setProducts] = useState([]);
  const [groupedProducts, setGroupedProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false); // Quản lý trạng thái của modal
  const [selectedProductId, setSelectedProductId] = useState(null); // Lưu ID của sản phẩm cần xóa
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/v1/products`);
        setProducts(response.data);

        const grouped = response.data.reduce((acc, product) => {
          const categoryName = product.category.name;
          if (!acc[categoryName]) {
            acc[categoryName] = [];
          }
          acc[categoryName].push(product);
          return acc;
        }, {});

        setGroupedProducts(grouped);
        setLoading(false);
      } catch (error) {
        console.error("Lỗi khi tải sản phẩm:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [products]);

  const handleViewDetail = (productId) => {
    navigate(`/product-detail/${productId}`);
  };

  const handleDeleteClick = (id) => {
    setSelectedProductId(id); // Lưu ID của sản phẩm cần xóa
    setVisible(true); // Hiển thị modal
  };

  // Kiểm tra xem token có tồn tại không để xóa sản phẩm
  const token = localStorage.getItem("authToken");
  if (!token) {
    toast.error("Bạn cần đăng nhập để thêm danh mục!");
    navigate("/login");
    return;
  }

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(
        `${API_BASE_URL}/api/v1/products/${selectedProductId}`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProducts(
        products.filter((product) => product._id !== selectedProductId)
      ); // Cập nhật danh sách sản phẩm sau khi xóa
      setVisible(false); // Đóng modal
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
      setVisible(false); // Đóng modal ngay cả khi lỗi
    }
  };

  const handleEditClick = (productId) => {
    navigate(`/edit-product/${productId}`);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
        <CSpinner />
      </div>
    );
  }

  // if (error) {
  //   return <div>{error}</div>;
  // }


  return (
    <div className="container">
      <CCol className="d-flex justify-content-between my-3">
        <h4 className="mb-4">DANH SÁCH TẤT CẢ SẢN PHẨM</h4>

        <CButton color="primary" className="mb-3">
          <Link
            to="/addproduct-new"
            style={{ color: "white", textDecoration: "none" }}
          >
            Thêm sản phẩm
          </Link>
        </CButton>
      </CCol>

      {loading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "200px" }}
        >
          <CSpinner />
        </div>
      ) : (
        Object.keys(groupedProducts).map((categoryName) => (
          <div key={categoryName} className="mb-4">
            <CCol className="d-flex justify-content-between my-3">
              <h5 style={{ textTransform: "uppercase" }}>
                Danh mục: {categoryName}
              </h5>
            </CCol>

            <CRow>
              {groupedProducts[categoryName].map((product) => (
                <CCol
                  key={product._id}
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  className="mb-4"
                >
                  <CCard>
                    <Link
                      to=""
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
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
                      <CCardTitle className="truncate">
                        {product.name}
                      </CCardTitle>
                      <CCardText className="truncate">
                        {product.description}
                      </CCardText>
                      <div className="d-flex justify-content-end">
                        <CButton
                          color="danger"
                          className="mx-2"
                          onClick={() => handleDeleteClick(product._id)}
                        >
                          <i style={{color: "white"}} className="bi bi-trash"></i>
                        </CButton>
                        <CButton
                          color="primary"
                          className="mx-2"
                          onClick={() => handleEditClick(product._id)}
                        >
                          <i style={{color: "white"}} className="bi bi-pencil-square"></i>
                        </CButton>

                        <CButton
                          color="success"
                          className="mx-2"
                          onClick={() => handleViewDetail(product._id)}
                        >
                          <i  style={{color: "white"}} className="bi bi-eye"></i>
                        </CButton>
                      </div>
                    </CCardBody>
                  </CCard>
                </CCol>
              ))}
            </CRow>
          </div>
        ))
      )}

      {/* Modal để xác nhận xóa sản phẩm */}
      <DeleteModal
        visible={visible}
        onClose={() => setVisible(false)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default AllProduct;
