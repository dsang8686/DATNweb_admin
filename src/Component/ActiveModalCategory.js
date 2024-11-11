import React from "react";
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
} from "@coreui/react";

const ActiveModalCategory = ({ visible, onClose, onConfirm }) => {
  return (
    <CModal alignment="center" visible={visible} onClose={onClose}>
      <CModalHeader>
        <CModalTitle>Xác nhận danh mục ẩn</CModalTitle>
      </CModalHeader>
      <CModalBody>Tất cả sản phẩm trong danh mục này sẽ bị ẩn!</CModalBody>
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

export default ActiveModalCategory;
