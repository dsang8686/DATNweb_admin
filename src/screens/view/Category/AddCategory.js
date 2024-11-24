import React, { useState } from "react";
import { CButton, CCol, CForm, CFormInput, CFormLabel, CSpinner } from "@coreui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from '../../../API/config';
import { toast } from 'react-toastify';
import SuccessModal from "../../../Component/SuccessModal"; // Import SuccessModal

const AddCategory = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false); // Trạng thái modal thành công
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const token = localStorage.getItem('authToken');
    if (!token) {
      toast.error('Bạn cần đăng nhập để thêm danh mục!');
      navigate('/login');
      setIsSubmitting(false);
      return;
    }

    if (name && image) {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('image', image);

      try {
        const response = await axios.post(
          `${API_BASE_URL}/api/v1/category`,
          formData,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            }
          }
        );

        if (response.status === 201) {
          setIsSuccessModalVisible(true); // Hiển thị modal khi thêm thành công
        }
      } catch (error) {
        toast.error('Có lỗi xảy ra. Vui lòng thử lại.');
      } finally {
        setIsSubmitting(false);
      }
    } else {
      toast.warning('Vui lòng điền đầy đủ thông tin!');
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="container">
      <CCol className="d-flex justify-content-between my-3">
        <h4>THÊM DANH MỤC MỚI</h4>
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
          required
          onChange={handleImageChange}
        />
        <CButton type="submit" color="primary" className="mt-3" disabled={isSubmitting}>
          {isSubmitting ? <CSpinner size="sm" /> : "Thêm"}
        </CButton>
      </CForm>

      {/* Success Modal */}
      {isSuccessModalVisible && (
        <SuccessModal
          visible={isSuccessModalVisible}
          message="Thêm mới thành công!"
          onClose={() => {
            setIsSuccessModalVisible(false);
            navigate("/category"); // Điều hướng sau khi đóng modal
          }}
        />
      )}
    </div>
  );
};

export default AddCategory;
