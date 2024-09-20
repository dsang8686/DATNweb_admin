import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { CContainer, CSpinner } from "@coreui/react";

import Product from "../view/Products/Product.js";
import Products from "../view/Products/Products.js";
import Home from "../view/Home/Home.js";
import Info from "../view/info/Info.js";
import AddInfo from "../view/info/AddInfo.js";


const AppContent = () => {
  return (
    <CContainer className="px-4" lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          <Route path="/" element={<Navigate to="home" replace />} />
          <Route path="/home" element={<Home />} />

          <Route path="/product" element={<Product />} />
          <Route path="/products/add" element={<Products />} />

          <Route path="/info" element={<Info />} />
          <Route path="/addInfo" element={<AddInfo />} />
        </Routes>
      </Suspense>
    </CContainer>
  );
};

export default React.memo(AppContent);
