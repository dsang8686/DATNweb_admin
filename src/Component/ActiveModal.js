import React from "react";
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
} from "@coreui/react";

const ActiveModal = ({ visible, onClose, onConfirm }) => {
  return (
    <CModal alignment="center" visible={visible} onClose={onClose}>
      <CModalHeader>
        <CModalTitle>Xác nhận ẩn</CModalTitle>
      </CModalHeader>
      <CModalBody>Bạn có chắc chắn muốn ẩn không?</CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>
          Hủy
        </CButton>
        <CButton color="danger" onClick={onConfirm}>
          Ẩn
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default ActiveModal;
