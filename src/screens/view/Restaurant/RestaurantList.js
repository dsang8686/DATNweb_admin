import React, { useEffect, useState } from 'react';
import RestaurantItem from './RestaurantItem';
import { CRow, CCol } from '@coreui/react';
import axios from 'axios';
import API_BASE_URL from '../../../API/config';

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Hàm để lấy dữ liệu từ API
  const fetchRestaurants = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/v1/restaurants`);
      setRestaurants(response.data); 
    } catch (error) {
      setError('Không thể lấy dữ liệu nhà hàng');
      console.error('Error fetching restaurants:', error);
    } finally {
      setLoading(false); // Đặt loading thành false khi hoàn thành
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  if (loading) {
    return <div>Đang tải dữ liệu...</div>; // Hiển thị thông báo khi đang tải
  }

  if (error) {
    return <div>{error}</div>; // Hiển thị thông báo lỗi nếu có
  }

  return (
    <div className="container">
      <h3>Danh sách nhà hàng</h3>
      <CRow>
        {restaurants.map((restaurant) => (
          <CCol key={restaurant.id} md={3}>
            <RestaurantItem
              name={restaurant.name}
              location={restaurant.location}
              image={restaurant.image}
            />
          </CCol>
        ))}
      </CRow>
    </div>
  );
};

export default RestaurantList;
