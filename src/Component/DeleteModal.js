import React from "react";
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
} from "@coreui/react";

const DeleteModal = ({ visible, onClose, onConfirm }) => {
  return (
    <CModal alignment="center" visible={visible} onClose={onClose}>
      <CModalHeader>
        <CModalTitle>Xác nhận xóa</CModalTitle>
      </CModalHeader>
      <CModalBody>Bạn có chắc chắn muốn xóa không?</CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>
          Hủy
        </CButton>
        <CButton color="danger" onClick={onConfirm}>
          Xóa
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default DeleteModal;
