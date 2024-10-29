// EditRestaurant.jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { CForm, CFormInput, CFormLabel, CButton, CContainer, CCol, CSpinner } from '@coreui/react';
import axios from 'axios';
import { toast } from 'react-toastify';
import SuccessModal from '../../../Component/SuccessModal';
import API_BASE_URL from '../../../API/config';

const EditRestaurant = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [image, setImage] = useState(''); // Trạng thái cho URL hình ảnh
  const [imagePreview, setImagePreview] = useState(''); // Trạng thái cho hình ảnh xem trước
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/v1/restaurants/${id}`);
        const { name, address, image, review } = response.data;
        setName(name);
        setAddress(address);
        setImage(image); // Lưu URL hình ảnh vào state
        setImagePreview(image); // Hiển thị hình ảnh đã có
        setReview(review);
      } catch (error) {
        console.error('Error fetching restaurant:', error);
        toast.error('Không thể lấy thông tin nhà hàng!');
      }
    };

    fetchRestaurant();
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file); // Cập nhật trạng thái hình ảnh
      setImagePreview(URL.createObjectURL(file)); // Tạo URL tạm thời để hiển thị
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Ngăn chặn reload trang
    setLoading(true);
    try {
      const token = localStorage.getItem('authToken');
      const formData = new FormData();
      formData.append('name', name);
      formData.append('address', address);
      formData.append('image', image); // Hình ảnh có thể là file hoặc URL
      formData.append('review', review);

      await axios.put(`${API_BASE_URL}/api/v1/restaurants/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`, // kiểm trả token
        },
      });

      toast.success('Cập nhật nhà hàng thành công!');
      setModalVisible(true);
    } catch (error) {
      console.error('Error updating restaurant:', error);
      toast.error('Có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    navigate('/restaurant'); // Chuyển hướng về trang danh sách sau khi đóng modal
  };

  return (
    <CContainer>
      <CCol className="d-flex justify-content-between my-3">
        <h4 className="mb-4">CHỈNH SỬA NHÀ HÀNG</h4>
        <CButton color="primary" className="mb-3">
          <Link to="/restaurant" style={{ color: "white", textDecoration: "none" }}>
            Danh sách
          </Link>
        </CButton>
      </CCol>

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
          {/* Hiển thị hình ảnh xem trước nếu có */}
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Hình ảnh xem trước"
              style={{ width: '200px', marginTop: '10px', objectFit: 'cover' }}
            />
          )}
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
        <CButton type="submit" color="primary" disabled={loading}>
          {loading ? <CSpinner size="sm" /> : 'Cập nhật nhà hàng'}
        </CButton>
      </CForm>

      {/* Hiển thị modal thành công */}
      <SuccessModal visible={modalVisible} onClose={handleCloseModal} />
    </CContainer>
  );
};

export default EditRestaurant;
