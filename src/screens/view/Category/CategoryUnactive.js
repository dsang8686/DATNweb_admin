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

const CategoryUnactive = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]); // Khởi tạo state cho danh mục
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const [error, setError] = useState(""); // Trạng thái lỗi
  const [visible, setVisible] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/category/unactive`);
      if (!response.ok) {
        throw new Error("Không thể lấy dữ liệu danh mục. api đang lỗi chưa hoàn thiện");
      }
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      setError(error.message);
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

  const handleConfirmDelete = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("Không có token, vui lòng đăng nhập.");
      navigate("/login");
      return;
    }
    if (selectedCategoryId) {
      try {
        const response = await axios.delete(
          `${API_BASE_URL}/api/v1/category/${selectedCategoryId}`, //////////thay doi
          {
            headers: {
              Authorization: `Bearer ${token}`, // Thêm token vào header
            },
          }
        );
        console.log(response); 
        if (response.data.success === false) {
          console.log(response.data.message); // Hiển thị thông báo lỗi
        } else {
          await fetchCategories(); // Nếu xóa thành công, tải lại danh mục
        }
      } catch (error) {
        console.error("Có lỗi xảy ra khi xóa danh mục.");
      } finally {
        setVisible(false);
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
          <CCol xs={12} sm={6} md={4} lg={3} key={category.id} className="mb-4">
            <CCard>
              <Link to="" style={{ textDecoration: "none", color: "inherit" }}>
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
                    className="mx-2"
                    onClick={() => handleDeleteClick(category._id)}
                  >
                    <i className="bi bi-trash"></i>
                  </CButton>
                  <CButton
                    color="primary"
                    className="mx-2"
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

      <DeleteModal
        visible={visible}
        onClose={() => setVisible(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default CategoryUnactive;
