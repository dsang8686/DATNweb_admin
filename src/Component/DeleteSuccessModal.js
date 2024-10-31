import React from 'react';
import { CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CButton } from '@coreui/react';

const DeleteSuccessModal = ({ visible, onClose }) => {
  return (
    <CModal alignment="center" visible={visible} onClose={onClose}>
      <CModalHeader>
        <CModalTitle>Thành công</CModalTitle>
      </CModalHeader>
      <CModalBody>
        Đã xóa thành công!
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>Đóng</CButton>
      </CModalFooter>
    </CModal>
  );
};

export default DeleteSuccessModal;
