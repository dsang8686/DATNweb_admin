import React from 'react';
import { CContainer, CRow, CCol, CNav, CNavItem, CNavLink, CCard, CCardBody } from '@coreui/react';
import '@coreui/coreui/dist/css/coreui.min.css'; // Import CoreUI CSS

const MenuT = () => {
  return (
    <CContainer fluid>
      <CRow>
        <CCol md="3" className="sidebar">
          <CCard>
            <CCardBody>
              <CNav className="flex-column">
                <CNavItem>
                  <CNavLink href="/">Trang chủ</CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink href="/about">Giới thiệu</CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink href="/services">Dịch vụ</CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink href="/contact">Liên hệ</CNavLink>
                </CNavItem>
              </CNav>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol md="9">
          {/* Nội dung chính của bạn */}
          <h1>Chào mừng đến với MyApp!</h1>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default  MenuT