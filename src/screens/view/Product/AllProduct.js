import React from "react";
import { CCol, CButton } from "@coreui/react";
import { Link } from "react-router-dom";
import CustomCard from "../../../Component/CustomCard"; // Component để hiển thị từng sản phẩm
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css"; // Import CSS mặc định của Carousel

const responsive = {
  superLargeDesktop: {
    // Phân giải màn hình rất lớn
    breakpoint: { max: 4000, min: 1024 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 1024, min: 768 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 768, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

const AllProduct = ({ categories }) => {
  return (
    <div className="container">
      {categories.map((category) => (
        <div key={category.id} className="mb-4">
          <CCol className="d-flex justify-content-between my-3">
            <h4 style={{ textTransform: "uppercase" }}>{category.name}</h4>
            <CButton color="primary">
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
              <CustomCard key={product.id} item={product}/>
            ))}
          </Carousel>


        </div>
      ))}
    </div>
  );
};

export default AllProduct;
