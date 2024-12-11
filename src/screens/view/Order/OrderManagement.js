import React, { useEffect, useState } from "react";
import {
  CRow,
  CCol,
  CButton,
  CSpinner,
  CCard,
  CPagination,
  CPaginationItem,
  CFormSelect,
} from "@coreui/react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../../../API/config";
import { toast } from "react-toastify";
const OrderManagement = ({ onDeleteOrder }) => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 12; // Hiển thị 12 đơn hàng mỗi trang
  const [filterType, setFilterType] = useState("");

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
          paymentMethob: order?.paymentMethob,
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
    fetchOrders(); // Gọi API lần đầu khi component mount
  
    // Thiết lập khoảng thời gian để gọi lại API
    const interval = setInterval(() => {
      fetchOrders(filterType); // Gọi lại API với bộ lọc hiện tại
    }, 10000);
  
    // Dọn dẹp interval khi component bị unmount
    return () => clearInterval(interval);
  }, [filterType]); // Theo dõi sự thay đổi của `filterType`
  

  const handleFilter = (status) => {
    setFilterType(status); // Lưu trạng thái bộ lọc
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
    toast.error("Bạn cần đăng nhập để thêm danh mục!");
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
      toast.success("Cập nhật trạng thái đơn hàng thành công!");
      setEditingOrderId(null);
    } catch (error) {
      toast.error("Lỗi khi cập nhật trạng thái đơn hàng!");
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
      <CRow className="my-3 align-items-center">
        <CCol xs={12} md={7}>
          <h4 className="mb-4">TẤT CẢ ĐƠN HÀNG</h4>
        </CCol>

        <CCol
          xs={12}
          md={5}
          className="mb-4 d-flex flex-wrap justify-content-end align-items-center"
        >
          <strong>Trạng thái:</strong>
          <span className="ms-2" style={{width:'50%'}}>
            <CFormSelect
              value={filterType} // Giá trị hiện tại của filter
              onChange={(e) => handleFilter(e.target.value)} // Gọi hàm filter với giá trị đã chọn
              
            >
              <option value="">Tất cả</option>
              <option value="Pending">Pending</option>
              <option value="Coming">Coming</option>
              <option value="Success">Success</option>
              <option value="Failed">Failed</option>
            </CFormSelect>
          </span>
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
                  Thanh toán bằng:{" "}
                  <strong>
                    {" "}
                    {order.paymentMethob === "Cash"
                      ? "Tiền mặt"
                      : "Chuyển khoản"}
                  </strong>
                </p>
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
                    (order.status === "Pending" ||
                      order.status === "Coming") && (
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
        {/* Nút Previous */}
        <CPaginationItem
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Trước
        </CPaginationItem>

        {/* Hiển thị số trang xung quanh trang hiện tại */}
        {Array.from({ length: Math.ceil(orders.length / ordersPerPage) })
          .map((_, i) => i + 1)
          .filter(
            (page) =>
              page === currentPage || // Trang hiện tại
              page === currentPage - 1 || // Trang trước
              page === currentPage + 1 || // Trang sau
              page === 1 || // Trang đầu tiên
              page === Math.ceil(orders.length / ordersPerPage) // Trang cuối
          )
          .map((page, index, arr) => (
            <React.Fragment key={page}>
              {index > 0 &&
                arr[index - 1] !== page - 1 && ( // Hiển thị dấu "..." nếu khoảng cách lớn hơn 1
                  <CPaginationItem disabled>...</CPaginationItem>
                )}
              <CPaginationItem
                active={page === currentPage}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </CPaginationItem>
            </React.Fragment>
          ))}

        {/* Nút Next */}
        <CPaginationItem
          disabled={currentPage === Math.ceil(orders.length / ordersPerPage)}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Sau
        </CPaginationItem>
      </CPagination>
    </div>
  );
};

export default OrderManagement;
