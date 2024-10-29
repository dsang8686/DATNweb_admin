import React from "react";
import { CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CButton } from "@coreui/react";

const ErrorModal = ({ visible, onClose, message }) => {
  return (
    <CModal alignment="center" visible={visible} onClose={onClose}>
      <CModalHeader>
        <CModalTitle>Lỗi</CModalTitle>
      </CModalHeader>
      <CModalBody>{message}</CModalBody>
      <CModalFooter>
        <CButton color="primary" onClick={onClose}>
          Đóng
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default ErrorModal;
