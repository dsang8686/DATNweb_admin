import React, { useState } from "react";
import {
  CButton,
  CForm,
  CFormInput,
  CFormTextarea,
  CFormSelect,
  CCol,
} from "@coreui/react";
import BackButton from "../../../Component/BackButton";
import categories from "../../../Data";

const AddProductNew = () => {
  const [selectedCategory, setSelectedCategory] = useState(""); // Lưu trữ danh mục được chọn
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imagePreview, setImagePreview] = useState(""); // Lưu trữ URL tạm thời để xem trước ảnh

  // Xử lý việc chọn ảnh (chỉ cho phép xem trước ảnh)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && /\.(jpg|jpeg|png|gif)$/i.test(file.name)) {
      setImagePreview(URL.createObjectURL(file)); // Tạo URL tạm thời để xem trước ảnh
    } else {
      alert("Vui lòng chọn một tệp hình ảnh hợp lệ (jpg, jpeg, png, gif).");
      e.target.value = null; // Reset input nếu tệp không hợp lệ
    }
  };

  return (
    <div className="container">
      <CCol className="d-flex justify-content-between my-3">
        <h4 style={{ textTransform: "uppercase" }}>Thêm Sản Phẩm Mới</h4>
        <BackButton label="Quay lại" />
      </CCol>

      <CForm>
        <CCol className="mb-3">
          <CFormSelect
            aria-label="Chọn danh mục"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            required
          >
            <option value="">Chọn danh mục</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </CFormSelect>
        </CCol>

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
        
        <CButton type="submit" color="primary" className="mt-3">
          Thêm Sản Phẩm
        </CButton>
      </CForm>
    </div>
  );
};

export default AddProductNew;
