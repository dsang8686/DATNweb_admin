import React from 'react';
import { CRow, CCol, CButton } from '@coreui/react';
import { Link } from 'react-router-dom';

const OrderManagement = ({ orders, onDeleteOrder }) => {
  return (
    <div className="container">
      <h3>Quản lý đơn hàng</h3>
      <CButton color="primary" className="mb-4">
        <Link to="/add-order" style={{ color: 'white', textDecoration: 'none' }}>
          Thêm đơn hàng mới
        </Link>
      </CButton>

      <CRow>
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <CCol key={index} md={4}>
              <div className="order-item p-3 mb-3 border rounded">
                <h5>Mã đơn hàng: {order.orderId}</h5>
                <p>Tên khách hàng: {order.customerName}</p>
                <p>Tổng tiền: {order.total} VND</p>
                <CButton color="danger" onClick={() => onDeleteOrder(order.orderId)}>
                  Xóa
                </CButton>
                <Link to={`/order/${order.orderId}`}>
                  <CButton color="secondary" className="ms-2">
                    Chi tiết
                  </CButton>
                </Link>
              </div>
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
