import React, { useState, useEffect } from "react";
import {
  CButton,
  CForm,
  CFormInput,
  CFormTextarea,
  CFormSelect,
  CCol,
  CSpinner,
  CFormLabel,
} from "@coreui/react";
import BackButton from "../../../Component/BackButton";
import axios from "axios";
import API_BASE_URL from "../../../API/config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SuccessModal from "../../../Component/SuccessModal";

const AddProductNew = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]); // Lưu danh sách danh mục
  const [selectedCategory, setSelectedCategory] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [defaultPrice, setDefaultPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [imageFile, setImageFile] = useState(null); // Lưu trữ file ảnh
  const [isSubmitting, setIsSubmitting] = useState(false); // Quản lý trạng thái submit
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Quản lý trạng thái đang tải
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  // Lấy danh mục từ API khi component render
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/v1/category`);
        setCategories(response.data); // Lưu danh mục vào state
      } catch (error) {
        console.error("Lỗi khi lấy danh mục:", error);
      } finally {
        setIsLoading(false); // Đặt trạng thái tải về false
      }
    };

    fetchCategories();
  }, []);

  // Xử lý việc chọn ảnh
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && /\.(jpg|jpeg|png|gif)$/i.test(file.name)) {
      setImageFile(file); // Lưu file để gửi đi
      setImagePreview(URL.createObjectURL(file)); // Tạo URL tạm thời để xem trước ảnh
    } else {
      alert("Vui lòng chọn một tệp hình ảnh hợp lệ (jpg, jpeg, png, gif).");
      e.target.value = null;
    }
  };

  // Xử lý khi submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    // Kiểm tra xem người dùng đã chọn danh mục và tải ảnh lên chưa
    if (
      !selectedCategory ||
      !name ||
      !description ||
      !imageFile ||
      !price ||
      !defaultPrice
    ) {
      setError("Vui lòng điền đầy đủ thông tin.");
      setIsSubmitting(false);
      return;
    }

    // Kiểm tra xem token có tồn tại không
    const token = localStorage.getItem("authToken");
    if (!token) {
      toast.error("Bạn cần đăng nhập xem!");
      navigate("/login");
      return;
    }

    // Tạo đối tượng FormData để chứa dữ liệu sản phẩm
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("defaultPrice", defaultPrice);
    formData.append("category", selectedCategory);
    formData.append("image", imageFile); // Thêm file ảnh vào formData

    try {
      // Gửi yêu cầu POST đến API
      const response = await axios.post(
        `${API_BASE_URL}/api/v1/products`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        setSuccessModalVisible(true); // Hiển thị modal thành công
      }
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm:", error);
      setError("Đã xảy ra lỗi khi thêm sản phẩm.");
      setIsSubmitting(false);
    }
  };
  // Hàm xử lý khi đóng modal thành công
  const handleModalClose = () => {
    setSuccessModalVisible(false); // Ẩn modal
    navigate("/allproducts"); // Điều hướng về danh sách sản phẩm
  };

  return (
    <div className="container">
      <CCol className="d-flex justify-content-between my-3">
        <h4 style={{ textTransform: "uppercase" }}>Thêm Sản Phẩm Mới</h4>
        <BackButton label="Quay lại" />
      </CCol>

      <CForm onSubmit={handleSubmit}>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <CCol className="mb-3">
          <CFormLabel htmlFor="restaurantName">Chọn danh mục</CFormLabel>

          <CFormSelect
            aria-label="Chọn danh mục"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            required
          >
            <option value="">Chọn danh mục</option>
            {isLoading ? (
              <option disabled>Đang tải danh mục...</option> // Hiển thị khi đang tải
            ) : (
              categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))
            )}
          </CFormSelect>
        </CCol>

        <CFormLabel htmlFor="restaurantName">Tên sản phẩm</CFormLabel>
        <CFormInput
          type="text"
          placeholder="Tên sản phẩm"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mb-4"
        />

        <CFormLabel htmlFor="restaurantName">Giá bán</CFormLabel>
        <CFormInput
          type="number"
          placeholder="Giá"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          className="mb-4"
        />
        <CFormLabel htmlFor="restaurantName">Giá nhập</CFormLabel>
        <CFormInput
          type="number"
          placeholder="Giá nhập"
          value={defaultPrice}
          onChange={(e) => setDefaultPrice(e.target.value)}
          required
          className="mb-4"
        />
        <CFormLabel htmlFor="restaurantName">Mô tả</CFormLabel>
        <CFormTextarea
          placeholder="Mô tả"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mb-4"
          required
        />
        <CFormLabel htmlFor="restaurantName">Chọn ảnh</CFormLabel>
        <CFormInput
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mb-4"
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

        <CButton
          type="submit"
          color="primary"
          className="mt-3"
          disabled={isSubmitting}
        >
          {isSubmitting ? <CSpinner /> : "Thêm Sản Phẩm"}
        </CButton>
      </CForm>
      <SuccessModal visible={successModalVisible} onClose={handleModalClose} />
    </div>
  );
};

export default AddProductNew;
