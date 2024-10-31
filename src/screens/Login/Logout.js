import { CSpinner } from '@coreui/react';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Xoá token khỏi localStorage
    localStorage.removeItem('authToken');

    // Chuyển hướng về trang đăng nhập
    navigate('/login');

    // Tải lại trang
    window.location.reload();
  }, [navigate]);

  return (
    <div>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "200px" }}
      >
        <CSpinner />
      </div>
    </div>
  );
};

export default Logout;
