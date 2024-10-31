// Restaurant.jsx
import React, { useEffect, useState } from 'react';
import {
  CRow,
  CCol,
  CButton,
  CSpinner,
  CCard,
  CCardBody,
  CCardImage,
  CCardTitle,
  CCardText
} from '@coreui/react';
import axios from 'axios';
import { toast } from 'react-toastify';
import API_BASE_URL from '../../../API/config';
import { Link, useNavigate } from 'react-router-dom';
import DeleteModal from '../../../Component/DeleteModal';

const Restaurant = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [visible, setVisible] = useState(false);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(null);
  const navigate = useNavigate();

  const fetchRestaurants = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/api/v1/restaurants`);
      setRestaurants(response.data);
    } catch (error) {
      setError('Không thể lấy dữ liệu nhà hàng');
      console.error('Error fetching restaurants:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const handleDeleteClick = (id) => {
    setSelectedRestaurantId(id);
    setVisible(true);
  };

  const handleEditClick = (id) => {
    navigate(`/edit-restaurant/${id}`); // Chuyển đến trang chỉnh sửa
  };

  const handleDeleteConfirm = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        toast.error('Bạn cần đăng nhập để thực hiện thao tác này!');
        return;
      }

      await axios.delete(`${API_BASE_URL}/api/v1/restaurants/${selectedRestaurantId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success('Nhà hàng đã được xóa thành công!');
      setRestaurants(prevRestaurants => 
        prevRestaurants.filter(restaurant => restaurant._id !== selectedRestaurantId)
      );
      setVisible(false);
    } catch (error) {
      toast.error('Có lỗi xảy ra. Vui lòng thử lại.');
      console.error('Error deleting restaurant:', error);
      setVisible(false);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
        <CSpinner />
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container">
      <CCol className="d-flex justify-content-between my-3">
        <h4 className="mb-4">DANH SÁCH CỬA HÀNG</h4>
        <CButton color="primary" className="mb-3">
          <Link to="/add-restaurant" style={{ color: 'white', textDecoration: 'none' }}>
            Thêm cửa hàng
          </Link>
        </CButton>
      </CCol>

      <CRow>
        {restaurants.map((restaurant) => (
          <CCol key={restaurant._id} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <CCard className="mb-4">
              <CCardImage
                orientation="top"
                src={restaurant.image}
                alt={restaurant.name}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <CCardBody>
                <CCardTitle>{restaurant.name}</CCardTitle>
                <CCardText>{restaurant.address}</CCardText>
                <CCardText>Đánh giá: {restaurant.review}</CCardText>
                <div className="d-flex justify-content-end">
                  <CButton
                    color="danger"
                    className="mx-2"
                    onClick={() => handleDeleteClick(restaurant._id)}
                  >
                    <i style={{ color: 'white' }} className="bi bi-trash"></i>
                  </CButton>
                  <CButton
                    color="primary"
                    className="mx-2"
                    onClick={() => handleEditClick(restaurant._id)} // Thêm hàm này
                  >
                    <i style={{ color: 'white' }} className="bi bi-pencil-square"></i>
                  </CButton>
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        ))}
      </CRow>

      {/* Modal để xác nhận xóa nhà hàng */}
      <DeleteModal
        visible={visible}
        onClose={() => setVisible(false)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default Restaurant;
