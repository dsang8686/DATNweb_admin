import React from "react";
import { CButton } from "@coreui/react";
import { useNavigate } from "react-router-dom";

const BackButton = ({ label = "Quay lại", className = "" }) => {
  const navigate = useNavigate(); // Sử dụng hook useNavigate

  const handleBack = () => {
    navigate(-1); // Quay lại trang trước đó
  };

  return (
    <CButton color="primary" className={`mb-3 me-3 ${className}`} onClick={handleBack}>
      {label}
    </CButton>
  );
};

export default BackButton;
