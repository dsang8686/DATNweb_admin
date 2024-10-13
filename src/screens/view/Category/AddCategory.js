// src/screens/AddCategory.js

import React, { useState } from "react";
import { CButton, CCol, CForm, CFormInput, CFormTextarea } from "@coreui/react";
import { useNavigate } from "react-router-dom";

const AddCategory = ({ onAddCategory }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [imageError, setImageError] = useState(""); // Trạng thái để xử lý lỗi ảnh

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCategory = {
      id: Date.now(), // Sử dụng thời gian hiện tại làm ID duy nhất
      name,
      description,
      image,
      products: [],
    };

    onAddCategory(newCategory); // Gọi hàm thêm danh mục
    navigate("/category"); // Quay lại trang chính sau khi thêm
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Lấy tệp đầu tiên từ input

    // Kiểm tra xem tệp có phải là ảnh hay không
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Cập nhật URL ảnh để lưu trữ
        setImageError(""); // Reset lỗi
      };
      reader.readAsDataURL(file); // Đọc tệp ảnh
    } else {
      setImageError("Vui lòng chọn một tệp ảnh hợp lệ."); // Thiết lập lỗi nếu không phải là ảnh
      setImage(""); // Reset image
    }
  };

  return (
    <div className="container">
      <CCol className="d-flex justify-content-between my-3">
        <h4>THÊM DANH MỤC MỚI</h4>
        <CButton
          onClick={() => navigate("/category")}
          color="primary"
        >
          Danh sách
        </CButton>
      </CCol>

      <CForm onSubmit={handleSubmit}>
        <CFormInput
          type="text"
          placeholder="Tên danh mục"
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
          type="file"
          accept="image/*" // Chỉ chấp nhận tệp ảnh
          onChange={handleImageChange}
          className="my-4"
          required
        />
        {imageError && <p className="text-danger">{imageError}</p>} {/* Hiển thị lỗi nếu có */}
        <CButton type="submit" color="primary" className="mt-2">
          Thêm
        </CButton>
      </CForm>
    </div>
  );
};

export default AddCategory;
