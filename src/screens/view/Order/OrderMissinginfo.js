import React, { useEffect, useState } from "react";
import { CRow, CCol, CButton, CSpinner, CCard } from "@coreui/react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../../../API/config";

const OrderMissinginfo = ({ onDeleteOrder }) => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Lấy danh sách đơn hàng từ API
  const fetchOrders = async (status = "") => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/v1/orders${status ? `?status=${status}` : ""}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const ordersData = response.data
        .map((order) => ({
          orderId: order._id,
          shippingAddress: order?.shippingAddress,
          status: order.status,
          totalPrice: order.totalPrice,
          restaurant: order.restaurant?.name,
          restaurantaddress: order.restaurant?.address,
          user: order.user?.name,
        }))
        .filter(
          (order) =>
            !(
              order.orderId &&
              order.shippingAddress &&
              order.status &&
              order.totalPrice &&
              order.restaurant &&
              order.user
            )
        ); // Lọc để giữ lại các đơn hàng thiếu một hoặc nhiều thông tin
      setOrders(ordersData);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Lỗi khi lấy danh sách đơn hàng:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const token = localStorage.getItem("authToken");
  if (!token) {
    console.error("Bạn cần đăng nhập để thêm danh mục!");
    navigate("/login");
    return;
  }

  const handleFilter = (status) => {
    fetchOrders(status);
    setLoading(true);
  };

  const handleOrderDetail = (productId) => {
    navigate(`/order/${productId}`);
  };

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

  return (
    <div className="container">
      <CCol className="d-flex justify-content-between my-3">
        <h4 className="mb-4">ĐƠN HÀNG THIẾU THÔNG TIN</h4>
      </CCol>
      <CRow>
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <CCol key={index} xs={12} sm={6} md={4} lg={3}>
              <CCard className="order-item p-3 mb-3 border rounded">
                <h5>Đơn hàng</h5>
                <p>Địa chỉ giao hàng: {order.shippingAddress}</p>
                <p>
                  Trạng thái:{" "}
                  <span className={`status-${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </p>
                <p>Tổng tiền: {order.totalPrice} VND</p>
                <p>Cửa hàng:</p>
                <ul>
                  <li>{order.restaurant}</li>
                  <li>{order.restaurantaddress}</li>
                </ul>
                <p>User đặt hàng: {order.user}</p>{" "}
                {/* Hiển thị tên người dùng */}
                {/* button tác vụ */}
                <div className="d-flex justify-content-end">
                  <CButton
                    color="danger"
                    className="mx-2"
                    // onClick={() => onDeleteOrder(order.orderId)}
                  >
                    <i style={{ color: "white" }} className="bi bi-trash"></i>
                  </CButton>

                  <CButton
                    color="success"
                    className="mx-2"
                    onClick={() => handleOrderDetail(order.orderId)}
                  >
                    <i style={{ color: "white" }} className="bi bi-eye"></i>
                  </CButton>
                </div>
              </CCard>
            </CCol>
          ))
        ) : (
          <p>Chưa có đơn hàng nào</p>
        )}
      </CRow>
    </div>
  );
};

export default OrderMissinginfo;
