import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CButton, CContainer } from '@coreui/react';

const OrderDetail = ({ orders }) => {
  const { orderId } = useParams();
  const order = orders.find((order) => order.orderId === parseInt(orderId));

  if (!order) {
    return <h4>Không tìm thấy đơn hàng!</h4>;
  }

  return (
    <CContainer className="mt-4">
      <h3>Chi tiết đơn hàng</h3>
      <p><strong>Mã đơn hàng:</strong> {order.orderId}</p>
      <p><strong>Tên khách hàng:</strong> {order.customerName}</p>
      <p><strong>Tổng tiền:</strong> {order.total} VND</p>
      <Link to="/orders">
        <CButton color="primary">Quay lại danh sách đơn hàng</CButton>
      </Link>
    </CContainer>
  );
};

export default OrderDetail;
