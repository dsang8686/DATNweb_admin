import React, { useState } from "react";
import { CButton, CCol, CForm, CFormInput, CSpinner } from "@coreui/react"; // Import CSpinner
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Sử dụng axios để gửi yêu cầu
import API_BASE_URL from '../../../API/config'; // Đường dẫn đến API
import { toast } from 'react-toastify'; // Thông báo thành công hoặc lỗi

const AddCategory = () => {
  const [name, setName] = useState(''); // Trạng thái tên danh mục
  const [image, setImage] = useState(null); // Trạng thái hình ảnh
  const [isSubmitting, setIsSubmitting] = useState(false); // Quản lý trạng thái submit
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Bắt đầu quá trình gửi yêu cầu

    // Kiểm tra xem token có tồn tại không
    const token = localStorage.getItem('authToken');
    if (!token) {
      toast.error('Bạn cần đăng nhập để thêm danh mục!');
      navigate('/login');
      setIsSubmitting(false); // Đặt lại trạng thái submit
      return;
    }

    if (name && image) {
      const formData = new FormData(); // Sử dụng FormData để gửi file
      formData.append('name', name);
      formData.append('image', image);

      try {
        const response = await axios.post(
          `${API_BASE_URL}/api/v1/category`, // URL của API
          formData,
          {
            headers: {
              'Authorization': `Bearer ${token}`, // Thêm token vào header
              'Content-Type': 'multipart/form-data', // Đặt loại nội dung là multipart
            }
          }
        );

        if (response.status === 201) {
          toast.success('Danh mục đã được thêm thành công!'); 
          navigate('/category'); // Quay về danh sách danh mục
        }
      } catch (error) {
        toast.error('Có lỗi xảy ra. Vui lòng thử lại.'); // Thông báo lỗi
        console.error('Error adding category:', error);
      } finally {
        setIsSubmitting(false); // Đặt lại trạng thái submit khi hoàn thành
      }
    } else {
      toast.warning('Vui lòng điền đầy đủ thông tin!'); // Thông báo nếu thiếu thông tin
      setIsSubmitting(false); // Đặt lại trạng thái submit khi không đủ thông tin
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Lấy file từ input
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
        <CFormInput
          type="text"
          placeholder="Tên danh mục"
          required
          className="my-4"
          value={name}
          onChange={(e) => setName(e.target.value)} // Cập nhật trạng thái tên
        />
        <CFormInput
          type="file"
          accept="image/*" // Chỉ chấp nhận tệp ảnh
          className="my-4"
          required
          onChange={handleImageChange} // Gọi hàm handleImageChange khi file được chọn
        />
        <CButton type="submit" color="primary" className="mt-3" disabled={isSubmitting}>
          {isSubmitting ? <CSpinner size="sm" /> : "Thêm"} {/* Hiển thị spinner nếu đang gửi */}
        </CButton>
      </CForm>
    </div>
  );
};

export default AddCategory;
