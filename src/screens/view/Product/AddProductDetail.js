import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CButton, CCard, CCardBody, CCardTitle, CCardText, CFormCheck, CFormInput } from "@coreui/react";
import BackButton from "../../../Component/BackButton";

const sizesAvailable = ["S", "M", "L"]; // Các kích thước có sẵn

const AddProductDetail = () => {
  const { id } = useParams(); // Lấy productId từ URL
  const [sizes, setSizes] = useState([]);
  const [prices, setPrices] = useState({});

  const handleSizeChange = (size) => {
    setSizes((prevSizes) =>
      prevSizes.includes(size)
        ? prevSizes.filter((s) => s !== size)
        : [...prevSizes, size]
    );
  };

  const handlePriceChange = (size, value) => {
    setPrices((prevPrices) => ({
      ...prevPrices,
      [size]: value,
    }));
  };

  const handleSubmit = () => {
    // Logic để thêm kích thước và giá vào sản phẩm
    console.log("Sizes:", sizes);
    console.log("Prices:", prices);
    // Gửi dữ liệu đến server hoặc lưu trữ ở đâu đó
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between my-3">
        <h4>Thêm kích thước sản phẩm</h4>
        <BackButton />
      </div>

      <CCard>
        <CCardBody>
          <CCardTitle>Chọn kích thước:</CCardTitle>
          {sizesAvailable.map((size) => (
            <div key={size} style={{ display: "flex", alignItems: "center" }} className="my-4">
              <div style={{ width: "6%" }} className="ps-3">
                <CFormCheck
                  type="checkbox"
                  label={size}
                  value={size}
                  checked={sizes.includes(size)}
                  onChange={() => handleSizeChange(size)}
                  style={{ fontSize: 18 }}
                />
              </div>
              {sizes.includes(size) && (
                <CFormInput
                  type="number"
                  placeholder={`Giá cho kích thước ${size}`}
                  value={prices[size] || ""}
                  onChange={(e) => handlePriceChange(size, e.target.value)}
                  className="ms-2"
                />
              )}
            </div>
          ))}
          <div className="d-flex justify-content-end">
            <CButton color="primary" onClick={handleSubmit}>
              Lưu
            </CButton>
          </div>
        </CCardBody>
      </CCard>
    </div>
  );
};

export default AddProductDetail;
