import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { CContainer, CSpinner } from "@coreui/react";

import Product from "../view/Products/Product.js";
import AddProduct from "../view/Products/AddProduct.js";
import Home from "../view/Home/Home.js";
import Info from "../view/info/Info.js";
import AddInfo from "../view/info/AddInfo.js";


const AppContent = () => {
  return (
    <CContainer style={{ paddingInlineStart: '10rem' }}>     {/* thay doi padding =>  className="px-5" */}
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          <Route path="/" element={<Navigate to="home" replace />} />
          <Route path="/home" element={<Home />} />

          {/* san pham */}
          <Route path="/product" element={<Product />} />
          <Route path="/product/add" element={<AddProduct />} />

          {/* thong tin admin */}
          <Route path="/info" element={<Info />} />
          <Route path="/addInfo" element={<AddInfo />} />
        </Routes>
      </Suspense>
    </CContainer>
  );
};

export default React.memo(AppContent);
