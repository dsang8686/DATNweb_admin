// view/NotFound.js
import React from 'react';

const NotFound = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1 style={{ fontSize: '3rem' }}>404</h1>
      <p>Trang bạn tìm kiếm không tồn tại.</p>
      <a href="/home">Quay về trang chủ</a>
    </div>
  );
};

export default NotFound;
