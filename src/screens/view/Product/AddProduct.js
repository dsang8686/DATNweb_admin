import React, { useState, useEffect } from "react";
import {
  CButton,
  CForm,
  CFormInput,
  CFormTextarea,
  CFormCheck,
  CCol,
} from "@coreui/react";
import { Link, useNavigate, useParams } from "react-router-dom";
import BackButton from "../../../Component/BackButton";

const sizesAvailable = ["S", "M", "L"];

const AddProduct = ({ categories, onAddProduct }) => {
  const { id } = useParams(); // Lấy ID từ URL
  const category = categories.find((cat) => cat.id === parseInt(id)); // Tìm danh mục theo ID

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null); // Lưu trữ file ảnh
  const [imagePreview, setImagePreview] = useState(""); // Lưu trữ URL tạm thời để xem trước ảnh
  const [sizes, setSizes] = useState([]);
  const [prices, setPrices] = useState({ S: "", M: "", L: "" });

  const navigate = useNavigate();

  // Xử lý việc chọn kích thước
  const handleSizeChange = (e) => {
    const value = e.target.value;

    if (sizes.includes(value)) {
      setSizes(sizes.filter((size) => size !== value));
      const newPrices = { ...prices };
      delete newPrices[value]; // Xóa giá cho kích thước đã bỏ chọn
      setPrices(newPrices);
    } else {
      setSizes([...sizes, value]);
    }
  };

  // Xử lý thay đổi giá
  const handlePriceChange = (size, value) => {
    setPrices({ ...prices, [size]: value });
  };

  // Xử lý việc chọn ảnh
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && /\.(jpg|jpeg|png|gif)$/i.test(file.name)) {
      setImage(file); // Lưu trữ file ảnh vào state
      setImagePreview(URL.createObjectURL(file)); // Tạo URL tạm thời để xem trước ảnh
    } else {
      alert("Vui lòng chọn một tệp hình ảnh hợp lệ (jpg, jpeg, png, gif).");
      e.target.value = null; // Reset input nếu tệp không hợp lệ
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Kiểm tra nếu chưa chọn ảnh
    if (!image) {
      alert("Vui lòng chọn một ảnh.");
      return;
    }

    const newProduct = {
      id: Date.now(), // Sử dụng timestamp làm ID sản phẩm
      name,
      description,
      image: imagePreview, // Lưu URL tạm thời để hiển thị
      size: sizes,
      price: prices,
    };

    onAddProduct(parseInt(id), newProduct); // Gọi hàm thêm sản phẩm với ID danh mục
    navigate(`/category/${id}/products`); // Quay lại trang danh sách sản phẩm
  };

  // Kiểm tra nếu danh mục không tồn tại
  if (!category) {
    return <h4>Danh Mục Không Tồn Tại</h4>;
  }

  return (
    <div className="container">
      <CCol className="d-flex justify-content-between my-3">
        <h4 style={{ textTransform: "uppercase" }}>
          Thêm Sản Phẩm Mới - cho [{category.name}]
        </h4>

  
          <BackButton label="Quay lại" />

      </CCol>

      <CForm onSubmit={handleSubmit}>
        <CFormInput
          type="text"
          placeholder="Tên sản phẩm"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="my-4"
        />
        <CFormTextarea
          placeholder="Mô tả"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="my-4"
          required
        />
        <CFormInput
          type="file" // Sử dụng file input
          accept="image/*" // Chỉ cho phép hình ảnh
          onChange={handleImageChange}
          className="my-4"
          required
        />
        {imagePreview && (
          <div>
            <h6>Xem trước hình ảnh:</h6>
            <img
              src={imagePreview}
              alt="Hình ảnh xem trước"
              style={{ width: "200px", height: "auto" }}
            />
          </div>
        )}
        <h6>Chọn kích thước:</h6>
        {sizesAvailable.map((size) => (
          <div key={size} style={{ display: "flex", alignItems: "center" }} className="my-4">
            <div style={{width: "6%"}} className="ps-3">
              <CFormCheck
                type="checkbox"
                label={size}
                value={size}
                checked={sizes.includes(size)}
                onChange={handleSizeChange}
                style={{fontSize: 18}}
              />
            </div>
            {sizes.includes(size) && (
              <CFormInput
                type="number"
                placeholder={`Giá cho kích thước ${size}`}
                value={prices[size] || ""}
                onChange={(e) => handlePriceChange(size, e.target.value)}
                
              />
            )}
          </div>
        ))}
        <CButton type="submit" color="primary" className="mt-3">
          Thêm Sản Phẩm
        </CButton>
      </CForm>
    </div>
  );
};

export default AddProduct;
