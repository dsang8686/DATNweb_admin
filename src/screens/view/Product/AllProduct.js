import React from "react";
import {
  CCol,
  CButton,
  CCard,
  CCardBody,
  CCardImage,
  CCardTitle,
  CCardText,
} from "@coreui/react";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css"; // Import CSS mặc định của Carousel

const responsive = {
  superLargeDesktop: {
    // Phân giải màn hình rất lớn
    breakpoint: { max: 4000, min: 1024 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 1024, min: 768 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 768, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const AllProduct = ({ categories }) => {
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
      
      {categories.map((category) => (
        <div key={category.id} className="mb-4">
          <CCol className="d-flex justify-content-between my-3">
            <h5 style={{ textTransform: "uppercase" }}>{category.name}</h5>
            <CButton color="secondary">
              <Link
                to={`/category/${category.id}/products`}
                style={{ color: "white", textDecoration: "none" }}
              >
                Xem thêm
              </Link>
            </CButton>
          </CCol>

          <Carousel responsive={responsive}>
            {category.products.slice(0, 100).map((product) => (
              <div key={product.id} className="mb-4 me-1">
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
                    <CCardTitle>{product.name}</CCardTitle>
                    <CCardText className="truncate">{product.description}</CCardText>

                    <div className="d-flex justify-content-end">
                      <CButton color="danger" className="mx-2">
                        Delete
                      </CButton>
                      <CButton color="primary" className="mx-2">
                        Edit
                      </CButton>
                    </div>
                  </CCardBody>
                </CCard>
              </div>
            ))}
          </Carousel>
        </div>
      ))}
    </div>
  );
};

export default AllProduct;
