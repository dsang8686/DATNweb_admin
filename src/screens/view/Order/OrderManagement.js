import React, { useEffect, useState } from "react";
import {
  CRow,
  CCol,
  CButton,
  CSpinner,
  CCard,
  CPagination,
  CPaginationItem,
} from "@coreui/react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../../../API/config";

const OrderManagement = ({ onDeleteOrder }) => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 12; // Hiển thị 12 đơn hàng mỗi trang

  const [editingOrderId, setEditingOrderId] = useState(null);
  const [newStatus, setNewStatus] = useState("");

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
          dateOrdered: order.dateOrdered,
        }))
        .filter(
          (order) =>
            order.orderId &&
            order.shippingAddress &&
            order.status &&
            order.totalPrice &&
            order.restaurant &&
            order.user
        )
        .sort((a, b) => (a.dateOrdered > b.dateOrdered ? -1 : 1));

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
    if (currentStatus === "Pending" || currentStatus === "Coming") {
      setEditingOrderId(orderId);
      setNewStatus(currentStatus);
    }
  };

  const handleStatusChange = (e) => {
    setNewStatus(e.target.value);
  };

  const token = localStorage.getItem("authToken");
  if (!token) {
    console.error("Bạn cần đăng nhập để thêm danh mục!");
    navigate("/login");
    return;
  }

  const handleSaveStatus = async (orderId) => {
    try {
      await axios.put(
        `${API_BASE_URL}/api/v1/orders/${orderId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchOrders();
      setEditingOrderId(null);
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái đơn hàng:", error);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

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
      <CRow className="my-3">
        <CCol xs={12} md={5}>
          <h4 className="mb-4">TẤT CẢ ĐƠN HÀNG</h4>
        </CCol>
        <CCol
          xs={12}
          md={7}
          className="mb-4 d-flex flex-wrap justify-content-end"
        >
          <CButton
            color="dark"
            onClick={() => handleFilter("")}
            className="me-2 mb-2"
            xs={12}
            md="auto"
          >
            Tất cả
          </CButton>
          <CButton
            color="primary"
            onClick={() => handleFilter("Pending")}
            className="me-2 mb-2"
            xs={12}
            md="auto"
          >
            Pending
          </CButton>
          <CButton
            color="success"
            onClick={() => handleFilter("Success")}
            className="me-2 mb-2"
            xs={12}
            md="auto"
          >
            Success
          </CButton>
          <CButton
            color="danger"
            onClick={() => handleFilter("Failed")}
            className="mb-2"
            xs={12}
            md="auto"
          >
            Failed
          </CButton>
        </CCol>
      </CRow>

      <CRow>
        {currentOrders.length > 0 ? (
          currentOrders.map((order, index) => (
            <CCol key={index} xs={12} sm={6} md={4} lg={3}>
              <CCard className="order-item p-3 mb-3 border rounded">
                <h5>Đơn hàng</h5>
                <p>Địa chỉ giao hàng: {order.shippingAddress}</p>
                <p>
                  Trạng thái:{" "}
                  {editingOrderId === order.orderId ? (
                    <select
                      value={newStatus}
                      onChange={handleStatusChange}
                      className={`status-${order.status.toLowerCase()}`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Coming">Coming</option>
                      <option value="Success">Success</option>
                      <option value="Failed">Failed</option>
                    </select>
                  ) : (
                    <span className={`status-${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  )}
                </p>
                <p>
                  Thời gian đặt hàng:{" "}
                  {new Date(order.dateOrdered).toLocaleString("vi-VN")}
                </p>
                <p>Cửa hàng:</p>
                <ul>
                  <li>{order.restaurant}</li>
                  <li>{order.restaurantaddress}</li>
                </ul>
                <div className="d-flex justify-content-end">
                  {editingOrderId === order.orderId ? (
                    <CButton
                      color="danger"
                      className="mx-2"
                      onClick={() => setEditingOrderId(false)}
                    >
                      <i className="bi bi-x-square" />
                    </CButton>
                  ) : (
                    (order.status === "Pending" || order.status === "Coming") && (
                      <CButton
                        color="primary"
                        className="mx-2"
                        onClick={() =>
                          handleEditClick(order.orderId, order.status)
                        }
                      >
                        <i
                          style={{ color: "white" }}
                          className="bi bi-pencil-square"
                        ></i>
                      </CButton>
                    )
                  )}
                  {editingOrderId === order.orderId ? (
                    <CButton
                      color="success"
                      className="mx-2"
                      onClick={() => handleSaveStatus(order.orderId)}
                    >
                      <i className="bi bi-check2-square"></i>
                    </CButton>
                  ) : (
                    <CButton
                      color="success"
                      className="mx-2"
                      onClick={() => handleOrderDetail(order.orderId)}
                    >
                      <i style={{ color: "white" }} className="bi bi-eye"></i>
                    </CButton>
                  )}
                </div>
              </CCard>
            </CCol>
          ))
        ) : (
          <p>Chưa có đơn hàng nào</p>
        )}
      </CRow>

      <CPagination align="center" className="mt-3 custom-pagination">
        {Array.from(
          { length: Math.ceil(orders.length / ordersPerPage) },
          (_, i) => (
            <CPaginationItem
              key={i}
              active={i + 1 === currentPage}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </CPaginationItem>
          )
        )}
      </CPagination>
    </div>
  );
};

export default OrderManagement;
