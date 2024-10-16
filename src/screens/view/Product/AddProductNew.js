import React, { useState } from "react";
import {
  CButton,
  CForm,
  CFormInput,
  CFormTextarea,
  CFormCheck,
  CFormSelect,
  CCol,
} from "@coreui/react";
import { useNavigate } from "react-router-dom";
import BackButton from "../../../Component/BackButton";

const sizesAvailable = ["S", "M", "L"];

const AddProductNew = ({ categories, onAddProduct }) => {
  const [selectedCategory, setSelectedCategory] = useState(""); // Lưu trữ danh mục được chọn
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

    // Kiểm tra nếu chưa chọn ảnh hoặc danh mục
    if (!image) {
      alert("Vui lòng chọn một ảnh.");
      return;
    }

    if (!selectedCategory) {
      alert("Vui lòng chọn một danh mục.");
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

    onAddProduct(parseInt(selectedCategory), newProduct); // Gọi hàm thêm sản phẩm với ID danh mục được chọn
    navigate(`/category/${selectedCategory}/products`); // Quay lại trang danh sách sản phẩm
  };

  return (
    <div className="container">
      <CCol className="d-flex justify-content-between my-3">
        <h4 style={{ textTransform: "uppercase" }}>Thêm Sản Phẩm Mới</h4>
        <BackButton label="Quay lại" />
      </CCol>

      <CForm onSubmit={handleSubmit}>
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
