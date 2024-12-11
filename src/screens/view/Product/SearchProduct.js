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
import { Link, useNavigate, useLocation  } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../../../API/config";

const SearchProduct = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();


  useEffect(() => {
    // Lấy query từ URL
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get("query");
    if (query) {
      setSearchInput(query);
      handleSearch(query);
    }
  }, [location.search]);

  const handleSearch = async (query) => {
    if (!query.trim()) return; // Bỏ qua nếu input rỗng
    setLoading(true);
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/v1/products/search?input=${query}`
      );
      setSearchResults(response.data.products);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  };

  const token = localStorage.getItem("authToken");
  if (!token) {
    //toast.error("Bạn cần đăng nhập để thêm danh mục!");
    navigate("/login");
    return;
  }

  const handleViewDetail = (productId) => {
    navigate(`/product-detail/${productId}`);
  };

  const handleEditClick = (productId) => {
    navigate(`/edit-product/${productId}`);
  };

  return (
    <div className="container">
      <CCol className="d-flex justify-content-between align-items-center my-3">
        <h4 className="mb-4">SẢN PHẨM TÌM KIẾM</h4>

        <CButton color="primary" className="mb-3">
          <Link
            to="/addproduct-new"
            style={{ color: "white", textDecoration: "none" }}
          >
            Thêm sản phẩm
          </Link>
        </CButton>
      </CCol>

      {/* Search bar */}
      <div className="mx-3" style={{ position: "relative" }}>
        <CButton onClick={() => handleSearch(searchInput)} style={{ position: "absolute", top: 0, right: 0 }}>
          Tìm Kiếm <i className="ms-1 bi bi-search" />
        </CButton>
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          className="form-control"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>

      {/* Display search results */}
      <CRow className="mt-4">
        {loading ? (
          <div className="d-flex justify-content-center align-items-center" style={{ height: "200px" }}>
            <CSpinner />
          </div>
        ) : (
          searchResults.map((product) => (
            <CCol key={product._id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <CCard>
                <Link to={`/product-detail/${product._id}`} style={{ textDecoration: "none", color: "inherit" }}>
                  <CCardImage
                    orientation="top"
                    src={product.image}
                    alt={product.name}
                  />
                </Link>
                <CCardBody>
                  <CCardTitle>{product.name}</CCardTitle>
                  <CCardText>{product.description}</CCardText>
                  <CCardText>Danh mục: {product.category?.name}</CCardText>
                      <div className="d-flex justify-content-end">
                      {/* <CButton
                        color="danger"
                        className="mx-2"
                        onClick={() => handleDeleteClick(product._id)}
                      >
                        <i
                          style={{ color: "white" }}
                          className="bi bi-eye-slash"
                        ></i>
                      </CButton> */}
                      <CButton
                        color="primary"
                        className="mx-2"
                        onClick={() => handleEditClick(product._id)}
                      >
                        <i
                          style={{ color: "white" }}
                          className="bi bi-pencil-square"
                        ></i>
                      </CButton>

                      <CButton
                        color="success"
                        className="mx-2"
                        onClick={() => handleViewDetail(product._id)}
                      >
                        <i style={{ color: "white" }} className="bi bi-eye"></i>
                      </CButton>
                    </div>
                </CCardBody>
              </CCard>
            </CCol>
          ))
        )}
      </CRow>
    </div>
  );
};

export default SearchProduct;
