import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CForm, CFormInput, CFormLabel, CButton, CContainer } from '@coreui/react';
import axios from 'axios';
import { toast } from 'react-toastify';
import API_BASE_URL from '../../../API/config';

const AddRestaurant = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState(null); // Đổi type từ string sang file
  const [review, setReview] = useState(''); // Thêm state cho review
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Kiểm tra xem token có tồn tại không
    const token = localStorage.getItem('authToken');
    if (!token) {
      toast.error('Bạn cần đăng nhập để thêm nhà hàng!');
      navigate('/login');
      return;
    }

    if (name && location && image && review) { // Kiểm tra nếu có review
      const formData = new FormData(); // Sử dụng FormData để gửi file
      formData.append('name', name);
      formData.append('location', location);
      formData.append('review', review); // Thêm review vào formData
      formData.append('image', image);

      console.log('>>>>>>>>>>>>>>', formData);

      try {
        const response = await axios.post(
          `${API_BASE_URL}/api/v1/restaurants`, 
          formData, 
          {
            headers: { 
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'multipart/form-data', // Đặt loại nội dung là multipart
            }
          }
        );
        if (response.status === 201) {
          toast.success('Nhà hàng đã được thêm thành công!');
          navigate('/restaurants');
        }
      } catch (error) {
        toast.error('Có lỗi xảy ra. Vui lòng thử lại.');
        console.error('Error adding restaurant:', error);
      }
    } else {
      toast.warning('Vui lòng điền đầy đủ thông tin!'); // Thông báo nếu thiếu thông tin
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Lấy file từ input
  };

  return (
    <CContainer className="mt-4">
      <h3>Thêm nhà hàng mới</h3>
      <CForm onSubmit={handleSubmit}>
        <div className="mb-3">
          <CFormLabel htmlFor="restaurantName">Tên nhà hàng</CFormLabel>
          <CFormInput
            type="text"
            id="restaurantName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <CFormLabel htmlFor="restaurantLocation">Địa chỉ</CFormLabel>
          <CFormInput
            type="text"
            id="restaurantLocation"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <CFormLabel htmlFor="restaurantImage">Chọn hình ảnh</CFormLabel>
          <CFormInput
            type="file"
            id="restaurantImage"
            onChange={handleImageChange} // Gọi hàm handleImageChange khi file được chọn
            required
          />
        </div>
        <div className="mb-3">
          <CFormLabel htmlFor="restaurantReview">Đánh giá</CFormLabel>
          <CFormInput
            type="text"
            id="restaurantReview"
            value={review}
            onChange={(e) => setReview(e.target.value)} // Cập nhật state review
            required
          />
        </div>
        <CButton type="submit" color="primary">
          Thêm nhà hàng
        </CButton>
      </CForm>
    </CContainer>
  );
};

export default AddRestaurant;
