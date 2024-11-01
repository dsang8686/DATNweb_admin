import React from "react";
import AppSidebar from "../search/AppSidebar";
import AppHeader from "../search/AppHeader";

import "./../Layout/style.css";

import "react-toastify/dist/ReactToastify.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "@coreui/coreui/dist/css/coreui.min.css";

import "./../Layout/style.css";
import AppContent from "../search/AppContent";
import BackToTop from "../../Component/BackToTop";

const DefaultLayout = () => {
  return (
    <div
      style={{
        fontSize: 14,
        display: "flex",
        zIndex: "0", // Đặt zIndex hợp lý
      }}
    >
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader className="header" /> {/* Header */}
        <div className="">
          <BackToTop/>
          <AppContent />
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
