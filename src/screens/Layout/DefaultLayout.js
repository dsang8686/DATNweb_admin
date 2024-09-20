import React from "react";
import AppSidebar from "../search/AppSidebar";
import AppHeader from "../search/AppHeader";

import Product from "../view/Products/Product";
import "./../Layout/style.css";

import "react-toastify/dist/ReactToastify.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "@coreui/coreui/dist/css/coreui.min.css";


import "./../Layout/style.css";
import AppContent from "../search/AppContent";

const DefaultLayout = () => {
  return (
    <div
      style={{
        fontSize: 14,
      }}
    >
      <AppSidebar />

      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
          <AppContent />
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
