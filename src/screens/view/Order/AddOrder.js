import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CForm, CFormInput, CFormLabel, CButton, CContainer } from '@coreui/react';

const AddOrder = ({ onAddOrder }) => {
  const [customerName, setCustomerName] = useState('');
  const [total, setTotal] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newOrder = {
      orderId: Date.now(), // Dùng timestamp làm mã đơn hàng tạm thời
      customerName,
      total,
    };
    onAddOrder(newOrder); // Gọi hàm thêm đơn hàng
    navigate('/orders'); // Chuyển hướng về trang quản lý đơn hàng
  };

  return (
    <CContainer className="mt-4">
      <h3>Thêm đơn hàng mới</h3>
      <CForm onSubmit={handleSubmit}>
        <div className="mb-3">
          <CFormLabel htmlFor="customerName">Tên khách hàng</CFormLabel>
          <CFormInput
            type="text"
            id="customerName"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <CFormLabel htmlFor="total">Tổng tiền</CFormLabel>
          <CFormInput
            type="number"
            id="total"
            value={total}
            onChange={(e) => setTotal(e.target.value)}
            required
          />
        </div>
        <CButton type="submit" color="primary">
          Thêm đơn hàng
        </CButton>
      </CForm>
    </CContainer>
  );
};

export default AddOrder;
