import React, { useState, useEffect } from "react";
import {
  CButton,
  CForm,
  CFormInput,
  CFormTextarea,
  CFormSelect,
  CCol,
  CSpinner,
} from "@coreui/react";
import BackButton from "../../../Component/BackButton";
import axios from "axios";
import API_BASE_URL from "../../../API/config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const EditProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Quản lý trạng thái đang tải
  const { id } = useParams();
  const [product, setProduct] = useState(null);

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
        const response = await axios.get(`${API_BASE_URL}/api/v1/products/${id}`);
        if (response.data) {
          setProduct(response.data);
          setName(response.data.name);
          setDescription(response.data.description);
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
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", selectedCategory);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    const token = localStorage.getItem('authToken');
    if (!token) {
      toast.error('Bạn cần đăng nhập xem!');
      navigate('/login');
      return;
    }
  
    try {
      await axios.put(`${API_BASE_URL}/api/v1/products/${id}`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      toast.success("Cập nhật sản phẩm thành công!");
      navigate('/allproducts');
    } catch (error) {
      setError("Lỗi khi cập nhật sản phẩm.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  if (isLoading) {
    return (
      <div className="container d-flex justify-content-center align-items-center"  style={{ height: "200px" }}>
        <CSpinner />
      </div>
    ); // Hiển thị spinner khi đang tải
  }

  return (
    <div className="container">
      <CCol className="d-flex justify-content-between my-3">
        <h4 style={{ textTransform: "uppercase" }}>Chỉnh Sửa Sản Phẩm: {product.name}</h4>
        <BackButton label="Quay lại" />
      </CCol>

      <CForm onSubmit={handleSubmit}>
        {error && <p style={{ color: "red" }}>{error}</p>}
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
          type="file"
          accept="image/*"
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

        <CButton
          type="submit"
          color="primary"
          className="mt-3"
          disabled={isSubmitting}
        >
          {isSubmitting ? <CSpinner /> : "Cập Nhật Sản Phẩm"}
        </CButton>
      </CForm>
    </div>
  );
};

export default EditProduct;
