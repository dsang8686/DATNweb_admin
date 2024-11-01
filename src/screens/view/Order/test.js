import React, { useEffect, useState } from "react";
import { CRow, CCol, CButton, CSpinner, CCard } from "@coreui/react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../../../API/config";

const OrderManagement = ({ onDeleteOrder }) => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editingOrderId, setEditingOrderId] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  const fetchOrders = async (status = "") => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/v1/orders${status ? `?status=${status}` : ""}`
      );
      const ordersData = response.data.map((order) => ({
        orderId: order._id,
        shippingAddress: order?.shippingAddress,
        status: order.status,
        totalPrice: order.totalPrice,
        restaurant: order.restaurant?.name,
        restaurantaddress: order.restaurant?.address,
        user: order.user?.name,
      }));
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

  const handleFilter = (status) => {
    fetchOrders(status);
    setLoading(true);
  };

  const handleOrderDetail = (productId) => {
    navigate(`/order/${productId}`);
  };

  const handleEditClick = (orderId, currentStatus) => {
    setEditingOrderId(orderId);
    setNewStatus(currentStatus);
  };

  const handleStatusChange = (e) => {
    setNewStatus(e.target.value);
  };

  const handleSaveStatus = async (orderId) => {
    try {
      await axios.put(`${API_BASE_URL}/api/v1/orders/${orderId}`, {
        status: newStatus,
      });
      fetchOrders(); // Refresh orders to see the updated status
      setEditingOrderId(null); // Exit edit mode
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái đơn hàng:", error);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "200px" }}>
        <CSpinner />
      </div>
    );
  }

  return (
    <div className="container">
      <h3>Quản lý đơn hàng</h3>

      <div className="mb-4">
        <CButton color="primary" onClick={() => handleFilter("")} className="me-2">Tất cả</CButton>
        <CButton color="primary" onClick={() => handleFilter("Pending")} className="me-2">Pending</CButton>
        <CButton color="success" onClick={() => handleFilter("Success")} className="me-2">Success</CButton>
        <CButton color="danger" onClick={() => handleFilter("Failed")}>Failed</CButton>
      </div>

      <CRow>
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <CCol key={index} xs={12} sm={6} md={4} lg={3}>
              <CCard className="order-item p-3 mb-3 border rounded">
                <h5>Đơn hàng</h5>
                <p>Địa chỉ giao hàng: {order.shippingAddress}</p>
                <p>


                  Trạng thái:{" "}
                  {editingOrderId === order.orderId ? (
                    <select value={newStatus} onChange={handleStatusChange}>
                      <option value="Pending">Pending</option>
                      <option value="Success">Success</option>
                      <option value="Failed">Failed</option>
                    </select>
                  ) : (
                    <span className={`status-${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  )}
                </p>


                
                <p>Tổng tiền: {order.totalPrice} VND</p>
                <p>Cửa hàng:</p>
                <ul>
                  <li>{order.restaurant}</li>
                  <li>{order.restaurantaddress}</li>
                </ul>
                <p>Người đặt hàng: {order.user}</p>



                <div className="d-flex justify-content-end">
                  <CButton color="danger" className="mx-2" onClick={() => onDeleteOrder(order.orderId)}>
                    <i style={{ color: "white" }} className="bi bi-trash"></i>
                  </CButton>

                  {editingOrderId === order.orderId ? (
                    <CButton color="success" className="mx-2" onClick={() => handleSaveStatus(order.orderId)}>
                      Lưu
                    </CButton>
                  ) : (
                    <CButton
                      color="primary"
                      className="mx-2"
                      onClick={() => handleEditClick(order.orderId, order.status)}
                    >
                      <i style={{ color: "white" }} className="bi bi-pencil-square"></i>
                    </CButton>
                  )}

                  <CButton color="success" className="mx-2" onClick={() => handleOrderDetail(order.orderId)}>
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

export default OrderManagement;
