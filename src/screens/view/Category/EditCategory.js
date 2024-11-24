import React, { useState, useEffect } from "react";
import { CButton, CCol, CForm, CFormInput, CFormLabel, CSpinner } from "@coreui/react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../../../API/config";
import { toast } from "react-toastify";
import SuccessModal from "../../../Component/UpdateSuccessModal"; // Import modal thành công

const EditCategory = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false); // Trạng thái hiển thị modal
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/v1/category/${id}`
        );
        setName(response.data.name);
        setImagePreview(response.data.image);
        // console.log(">>>>>>>>", name)
      } catch (error) {
        toast.error("Không thể lấy dữ liệu danh mục.");
      }
    };
    fetchCategoryData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const token = localStorage.getItem("authToken");
    if (!token) {
      toast.error("Bạn cần đăng nhập để chỉnh sửa danh mục!");
      navigate("/login");
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    if (image) formData.append("image", image);

    try {
      await axios.put(`${API_BASE_URL}/api/v1/category/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setIsSuccessModalVisible(true); // Hiển thị modal khi cập nhật thành công
    } catch (error) {
      toast.error("Có lỗi xảy ra khi cập nhật danh mục.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  return (
    <div className="container">
      <CCol className="d-flex justify-content-between my-3">
        <h4>CHỈNH SỬA DANH MỤC</h4>
        <CButton onClick={() => navigate("/category")} color="primary">
          Danh sách
        </CButton>
      </CCol>

      <CForm onSubmit={handleSubmit}>
      <CFormLabel htmlFor="restaurantName">Tên danh mục</CFormLabel>
        <CFormInput
          type="text"
          placeholder="Tên danh mục"
          required
          className="mb-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <CFormLabel htmlFor="restaurantName">Chọn ảnh</CFormLabel>
        <CFormInput
          type="file"
          accept="image/*"
          className="mb-4"
          onChange={handleImageChange}
        />
        {imagePreview && (
          <img src={imagePreview} alt="Preview" style={{ width: "200px" }} />
        )}
        <br />
        <CButton
          type="submit"
          color="primary"
          className="mt-3"
          disabled={isSubmitting}
        >
          {isSubmitting ? <CSpinner size="sm" /> : "Cập Nhật"}
        </CButton>
      </CForm>

      {/* Modal hiển thị khi cập nhật thành công */}
      <SuccessModal
        visible={isSuccessModalVisible}
        onClose={() => {
          setIsSuccessModalVisible(false);
          navigate("/category");
        }}
        message="Cập nhật danh mục thành công!"
      />
    </div>
  );
};

export default EditCategory;
