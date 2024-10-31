import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CForm, CFormInput, CFormLabel, CButton, CContainer, CCol, CSpinner } from '@coreui/react';
import axios from 'axios';
import { toast } from 'react-toastify';
import SuccessModal from '../../../Component/SuccessModal';
import API_BASE_URL from '../../../API/config';

const AddRestaurant = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [image, setImage] = useState(null);
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false); // Quản lý trạng thái của modal
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem('authToken');
    if (!token) {
      toast.error('Bạn cần đăng nhập để thêm nhà hàng!');
      navigate('/login');
      return;
    }

    if (name && address && image && review) {
      setLoading(true);
      const formData = new FormData();
      formData.append('name', name);
      formData.append('address', address);
      formData.append('review', review);
      formData.append('image', image);

      try {
        const response = await axios.post(
          `${API_BASE_URL}/api/v1/restaurants`, 
          formData, 
          {
            headers: { 
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            }
          }
        );
       
          setModalVisible(true); // Hiển thị modal khi thêm thành công
   
      } catch (error) {
        toast.error('Có lỗi xảy ra. Vui lòng thử lại.');
        console.error('Error adding restaurant:', error);
      } finally {
        setLoading(false);
      }
    } else {
      toast.warning('Vui lòng điền đầy đủ thông tin!');
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Hàm để đóng modal và chuyển hướng về trang restaurant
  const handleCloseModal = () => {
    setModalVisible(false);
    navigate('/restaurant'); // Chuyển hướng sau khi đóng modal
  };

  return (
    <CContainer>
      <CCol className="d-flex justify-content-between my-3">
        <h4 className="mb-4">THÊM CỬA HÀNG MỚI</h4>
        <CButton color="primary" className="mb-3">
          <Link to="/restaurant" style={{ color: "white", textDecoration: "none" }}>
            Danh sách
          </Link>
        </CButton>
      </CCol>

      <CForm>
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
          <CFormLabel htmlFor="restaurantAddress">Địa chỉ</CFormLabel>
          <CFormInput
            type="text"
            id="restaurantAddress"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <CFormLabel htmlFor="restaurantImage">Chọn hình ảnh</CFormLabel>
          <CFormInput
            type="file"
            id="restaurantImage"
            onChange={handleImageChange}
            required
          />
        </div>
        <div className="mb-3">
          <CFormLabel htmlFor="restaurantReview">Đánh giá</CFormLabel>
          <CFormInput
            type="number"
            id="restaurantReview"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
          />
        </div>
        <CButton type="submit" color="primary" onClick={handleSubmit} disabled={loading}>
          {loading ? <CSpinner size="sm" /> : 'Thêm nhà hàng'}
        </CButton>
      </CForm>

      {/* Hiển thị modal thành công */}
      <SuccessModal visible={modalVisible} onClose={handleCloseModal} />
    </CContainer>
  );
};

export default AddRestaurant;
