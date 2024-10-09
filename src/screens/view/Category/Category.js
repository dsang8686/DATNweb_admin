import React from "react";
import {
  CCard,
  CCardBody,
  CCardImage,
  CCardTitle,
  CCardText,
  CRow,
  CCol,
  CButton,
} from "@coreui/react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@coreui/coreui/dist/css/coreui.min.css";

const Category = ({ categories, onAddCategory, onDeleteCategory }) => {
  const handleDelete = (id) => {
    // Gọi hàm onDeleteCategory được truyền từ component cha
    if (window.confirm("Are you sure you want to delete this category?")) {
      onDeleteCategory(id);
    }
  };

  return (
    <div className="container mt-3">
      <h2 className="mb-4">Categories</h2>
      <CButton color="primary" className="mb-3">
        <Link
          to="/category/add"
          style={{ color: "white", textDecoration: "none" }}
        >
          Add Category
        </Link>
      </CButton>
      <CRow>
        {categories.map((category) => (
          <CCol md={4} key={category.id} className="mb-4">
            <CCard>
              <Link
                to={`/category/${category.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <CCardImage
                  orientation="top"
                  src={category.image}
                  alt={category.name}
                />
              </Link>
              <CCardBody>
                <CCardTitle>{category.name}</CCardTitle>
                <CCardText>{category.description}</CCardText>
                <div className="d-flex justify-content-end">
                  <CButton
                    color="danger"
                    onClick={() => handleDelete(category.id)}
                    className="mx-2"
                  >
                    Delete
                  </CButton>
                  <CButton
                    color="primary"
                    onClick={() => handleDelete(category.id)}
                    className="mx-2"
                  >
                    Edit
                  </CButton>
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        ))}
      </CRow>
    </div>
  );
};

export default Category;
