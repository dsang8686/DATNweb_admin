import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Xoá token khỏi localStorage
    localStorage.removeItem('authToken');
    
    // Chuyển hướng về trang đăng nhập
    navigate('/login');
  }, [navigate]);

  return (
    <div>
      <h2>Đang đăng xuất...</h2>
    </div>
  );
};

export default Logout;
