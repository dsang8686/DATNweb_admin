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
  CFormCheck,
} from "@coreui/react";
import BackButton from "../../../Component/BackButton";
import axios from "axios";
import API_BASE_URL from "../../../API/config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

import UpdateSuccessModal from "../../../Component/UpdateSuccessModal";

const EditProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [price, setPrice] = useState("");
  const [defaultPrice, setDefaultPrice] = useState("");
  const [isFeatured, setIsFeatured] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Quản lý trạng thái đang tải
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isUpdateSuccessVisible, setIsUpdateSuccessVisible] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/v1/category`);
        setCategories(response.data);
      } catch (error) {
        console.error("Lỗi khi tải danh mục:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true); // Bắt đầu tải sản phẩm
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/v1/products/${id}`
        );
        if (response.data) {
          setProduct(response.data);
          setName(response.data.name);
          setDescription(response.data.description);
          setPrice(response.data.price);
          setDefaultPrice(response.data.defaultPrice);
          setIsFeatured(response.data.isFeatured);
          setSelectedCategory(response.data.category._id);
          setImagePreview(response.data.image);
        } else {
          console.error("Sản phẩm không được tìm thấy.");
        }
      } catch (error) {
        console.error("Lỗi khi tải thông tin sản phẩm:", error);
      } finally {
        setIsLoading(false); // Kết thúc tải sản phẩm
      }
    };

    fetchProduct();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const token = localStorage.getItem("authToken");
    if (!token) {
      toast.error("Bạn cần đăng nhập xem!");
      navigate("/login");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", selectedCategory);
    formData.append("price", price);
    formData.append("defaultPrice", defaultPrice);
    formData.append("isFeatured", isFeatured);
    if (imageFile) formData.append("image", imageFile);

    try {
      await axios.put(`${API_BASE_URL}/api/v1/products/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setIsUpdateSuccessVisible(true);
    } catch (error) {
      setError("Lỗi khi cập nhật sản phẩm.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  if (isLoading) {
    return (
      <div
        className="container d-flex justify-content-center align-items-center"
        style={{ height: "200px" }}
      >
        <CSpinner />
      </div>
    ); // Hiển thị spinner khi đang tải
  }

  return (
    <div className="container">
      <CCol className="d-flex justify-content-between my-3">
        <h4 style={{ textTransform: "uppercase" }}>
          Chỉnh Sửa Sản Phẩm: {product.name}
        </h4>
        <BackButton label="Quay lại" />
      </CCol>

      <CForm onSubmit={handleSubmit}>
        <CFormLabel htmlFor="restaurantName">Chọn danh mục</CFormLabel>
        <CCol className="mb-3">
          <CFormSelect
            aria-label="Chọn danh mục"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            required
          >
            <option value="">Chọn danh mục</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </CFormSelect>
        </CCol>
        <CFormLabel htmlFor="restaurantName">Tên sản phẩm</CFormLabel>
        <CFormInput
          type="text"
          placeholder="Tên sản phẩm"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mb-3"
        />
        <div className="mb-3">
          <CFormLabel htmlFor="restaurantName">Giá bán</CFormLabel>
          <CFormInput
            type="number"
            placeholder="Giá"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
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
        <CFormCheck
          type="checkbox"
          id="adminCheck"
          label="Nổi bật"
          checked={isFeatured}
          onChange={(e) => setIsFeatured(e.target.checked)}
          // required
        />

        <CFormLabel htmlFor="restaurantName" className="mt-3">Chọn ảnh</CFormLabel>
        <CFormInput
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mb-4"
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
          {isSubmitting ? <CSpinner /> : "Cập Nhật Sản Phẩm"}
        </CButton>
      </CForm>

      <UpdateSuccessModal
        visible={isUpdateSuccessVisible}
        onClose={() => {
          setIsUpdateSuccessVisible(false);
          navigate("/allproducts"); // Chuyển hướng sau khi đóng modal
        }}
      />
    </div>
  );
};

export default EditProduct;
