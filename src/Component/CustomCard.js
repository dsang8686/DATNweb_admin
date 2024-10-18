import React from "react";
import { CCard, CCardBody, CCardImage, CCardTitle, CCardText, CButton, CCol } from "@coreui/react";
import { Link } from "react-router-dom";

const CustomCard = ({
  item,       // Dữ liệu của category hoặc product
  onDeleteClick, // Hàm xử lý khi nhấn nút xóa
  showButtons = true, // Ẩn/Hiện nút delete và edit
  linkTo,     // Đường dẫn đến trang chi tiết (nếu có)
}) => {
  return (
    <CCol  key={item.id} className="mb-4 me-1">
      <CCard>
        {linkTo ? (
          <Link
            to={linkTo}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="image-container">
              <CCardImage
                className="custom-image"
                orientation="top"
                src={item.image}
                alt={item.name}
              />
            </div>
          </Link>
        ) : (
          <div className="image-container">
            <CCardImage
              className="custom-image"
              orientation="top"
              src={item.image}
              alt={item.name}
            />
          </div>
        )}

        <CCardBody>
          <CCardTitle>{item.name}</CCardTitle>
          <CCardText>{item.description}</CCardText>


          {/* Hiển thị giá nếu có */}
          {item.size && item.size.length > 0 && (
          <div>
            <h6>Size và giá:</h6>
            <ul>
              {Object.entries(item.price).map(([size, price]) => (
                <li key={size}>
                  {size}: {price} VND
                </li>
              ))}
            </ul>
          </div>
        )}

          {showButtons && (
            <div className="d-flex justify-content-end">
              {onDeleteClick && (
                <CButton
                  color="danger"
                  onClick={() => onDeleteClick(item.id)}
                  className="mx-2"
                >
                  Delete
                </CButton>
              )}
              <CButton color="primary" className="mx-2">
                Edit
              </CButton>
            </div>
          )}
        </CCardBody>
      </CCard>
    </CCol>
  );
};

export default CustomCard;
