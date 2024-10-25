import React from "react";
import { CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CButton } from "@coreui/react";

const SuccessModal = ({ visible, onClose }) => {
  return (
    <CModal alignment="center" visible={visible} onClose={onClose}>
      <CModalHeader>
        <CModalTitle>Thành công</CModalTitle>
      </CModalHeader>
      <CModalBody>Thêm mới thành công!</CModalBody>
      <CModalFooter>
        <CButton color="primary" onClick={onClose}>
          OK
        </CButton>
      </CModalFooter>
    </CModal>
  );
};
export default SuccessModal;