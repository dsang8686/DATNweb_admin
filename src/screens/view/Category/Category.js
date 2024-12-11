import React, { useEffect, useState } from "react";
import {
  CRow,
  CCol,
  CCard,
  CCardBody,
  CCardImage,
  CCardTitle,
  CButton,
  CSpinner,
} from "@coreui/react";
import { Link, useNavigate } from "react-router-dom";
import "./Category.css";
import DeleteModal from "../../../Component/DeleteModal";
import API_BASE_URL from "../../../API/config";
import axios from "axios";
import ActiveModal from "../../../Component/ActiveModal";
import ActiveModalCategory from "../../../Component/ActiveModalCategory";
import { toast } from "react-toastify";

const Category = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]); // Khởi tạo state cho danh mục
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const [error, setError] = useState(""); // Trạng thái lỗi
  const [visible, setVisible] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/category`);
      if (!response.ok) {
        throw new Error("Không thể lấy dữ liệu danh mục");
      }
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      setError(error.message);
      toast.error("Lỗi khi tại đanh mục");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDeleteClick = (id) => {
    setSelectedCategoryId(id);
    setVisible(true);
  };
  // ẩn
  const handleConfirmDelete = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("Không có token, vui lòng đăng nhập.");
      navigate("/login");
      return;
    }

    if (selectedCategoryId) {
      try {
        const response = await axios.put(
          `${API_BASE_URL}/api/v1/category/${selectedCategoryId}`, // Đường dẫn API PUT
          { isActive: false }, // Cập nhật trạng thái isActive thành false
          {
            headers: {
              Authorization: `Bearer ${token}`, // Thêm token vào header
            },
          }
        );
        //console.log(response);
        if (response.data.success === false) {
          //console.log(response.data.message); // Hiển thị thông báo lỗi nếu không thành công
          toast.error("Lỗi khi ẩn");
        } else {
          toast.success("Ẩn danh mục thành công");
          await fetchCategories(); // Nếu cập nhật thành công, tải lại danh mục
        }
      } catch (error) {
        toast.error("Không thể ẩn danh mục khi đang có sản phẩm");
        console.error(
          "Có lỗi xảy ra khi cập nhật trạng thái danh mục.",
          error.response ? error.response.data : error
        );
      } finally {
        setVisible(false); // Đóng modal
      }
    }
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "200px" }}
      >
        <CSpinner color="primary" />
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container">
      {/* Header */}
      <CCol className="d-flex justify-content-between align-items-center my-3">
        <h4 className="text-uppercase">Danh Sách Danh Mục</h4>
        <CButton color="primary" className="mb-3">
          <Link
            to="/category/add"
            style={{ color: "white", textDecoration: "none" }}
          >
            + Thêm Danh Mục
          </Link>
        </CButton>
      </CCol>

      {/* Category List */}
      <CRow>
        {categories.map((category) => (
          <CCol xs={12} sm={6} md={4} lg={3} key={category.id} className="mb-4">
            <CCard className="shadow-sm border-0 h-100">
              <Link
                to=""
                style={{ textDecoration: "none", color: "inherit" }}
                className="hover-scale"
              >
                <div className="image-container">
                  <CCardImage
                    className="custom-image rounded-top"
                    orientation="top"
                    src={category.image}
                    alt={category.name}
                  />
                </div>
              </Link>

              <CCardBody className="d-flex flex-column">
                <CCardTitle className="fw-bold text-truncate">
                  {category.name}
                </CCardTitle>
                <div className="d-flex justify-content-end mt-auto">
                  <CButton
                    color="danger"
                    className="mx-1"
                    onClick={() => handleDeleteClick(category._id)}
                  >
                    <i className="bi bi-eye-slash"></i>
                  </CButton>
                  <CButton
                    color="primary"
                    className="mx-1"
                    onClick={() => navigate(`/category/edit/${category._id}`)}
                  >
                    <i className="bi bi-pencil-square"></i>
                  </CButton>
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        ))}
      </CRow>

      {/* Modal */}
      <ActiveModalCategory
        visible={visible}
        onClose={() => setVisible(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default Category;
