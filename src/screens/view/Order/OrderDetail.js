import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import {
  CButton,
  CCard,
  CCol,
  CContainer,
  CRow,
  CSpinner,
} from "@coreui/react";
import API_BASE_URL from "../../../API/config";

const OrderDetail = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [restaurants, setRestaurants] = useState([]);

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/v1/orders/${orderId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrder(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Lỗi khi lấy chi tiết đơn hàng:", err);
        setError("Không thể tải thông tin đơn hàng");
        setLoading(false);
      }
    };

    fetchOrderDetail();
  }, [orderId]);

  useEffect(() => {
    if (order && order.restaurant) {
      const fetchRestaurantDetails = async () => {
        try {
          const response = await axios.get(
            `${API_BASE_URL}/api/v1/restaurants/${order.restaurant}`
          );
          setRestaurants(response.data);
        } catch (err) {
          console.error("Lỗi khi lấy thông tin nhà hàng:", err);
        }
      };

      fetchRestaurantDetails();
    }
  }, [order]);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "200px" }}
      >
        <CSpinner />
      </div>
    );
  }
  if (error) return <h4>{error}</h4>;
  if (!order) return <h4>Không tìm thấy đơn hàng!</h4>;

  return (
    <CContainer className="mt-4">
      <CCol className="d-flex justify-content-between my-3">
        <h4 className="mb-4">THÔNG TIN CHI TIẾT</h4>
        <CButton color="primary" className="mb-3">
          <Link to="/orders" style={{ color: "white", textDecoration: "none" }}>
            Danh sách
          </Link>
        </CButton>
      </CCol>
      <div style={{ fontSize: 16 }}>
        <p>
          Địa chỉ giao hàng: <strong>{order.shippingAddress}</strong>
        </p>
        <p>
          User đặt hàng:{" "}
          <strong>
            <span>{order.user?.name} </span>
            <span className="mx-3">{order.user?.phone} </span>
            <span>{order.user?.email} </span>
          </strong>
        </p>
        <p>
          <span>Trạng thái:</span>{" "}
          <span className={`status-${order.status.toLowerCase()}`}>
            {order.status}
          </span>
        </p>
        <p>
          <p>
            Tổng tiền:{" "}
            <strong>
              {order.totalPrice !== undefined
                ? order.totalPrice.toLocaleString("vi-VN")
                : "N/A"}{" "}
              VND
            </strong>
          </p>
        </p>
        {restaurants ? (
          <p>
            Tên cửa hàng: <strong className="me-4">{restaurants.name}</strong>
            Địa chỉ: <strong>{restaurants.address}</strong>
          </p>
        ) : (
          <strong>
            <p style={{ color: "red" }}>Chưa chọn cửa hàng</p>
          </strong>
        )}
        <p>
          Ngày đặt hàng:{" "}
          <strong>{new Date(order.dateOrdered).toLocaleString()}</strong>
        </p>
      </div>
      <h5>Chi tiết sản phẩm:</h5>

      <CRow className="mb-4">
        {order.orderItems.map((item, index) => (
          <CCol key={item._id} xs={12} sm={6} md={6} lg={4}>
            <CCard
              className={`mb-3 p-3 border rounded`}
              style={{ fontSize: 16 }}
            >
              <p>
                <strong>Đơn hàng #{index + 1}</strong>
              </p>
              <p>- Số lượng: {item.quantity}</p>
              {/* <p>- Nước: {item.drink}</p> */}
              <p>- Sản phẩm: {item.product.name}</p>
              <p>- giá: {item.product.price}</p>
              
              <p>- Gọi thêm:</p>
              <ul>
                {item.attribute.map((attr, index) => (
                  <li key={index}>
                    <strong>Thêm: </strong> {attr.size}
                    <br />
                    <strong>Giá:</strong> {attr.price.toLocaleString("vi-VN")}{" "}
                    VND
                  </li>
                ))}
              </ul>
            </CCard>
          </CCol>
        ))}
      </CRow>
    </CContainer>
  );
};

export default OrderDetail;
