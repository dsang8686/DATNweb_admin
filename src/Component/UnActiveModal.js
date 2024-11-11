import React from "react";
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
} from "@coreui/react";

const UnActiveModal = ({ visible, onClose, onConfirm }) => {
  return (
    <CModal alignment="center" visible={visible} onClose={onClose}>
      <CModalHeader>
        <CModalTitle>Xác nhận bỏ ẩn</CModalTitle>
      </CModalHeader>
      <CModalBody>Bạn có chắc chắn muốn bỏ ẩn không?</CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>
          Hủy
        </CButton>
        <CButton color="info" onClick={onConfirm}>
          Xác nhận
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default UnActiveModal;
