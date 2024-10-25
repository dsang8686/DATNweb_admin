import React, { Suspense, useState, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { CContainer, CSpinner } from "@coreui/react";

// Các import từ view
import Home from "../view/Home/Home.js";
import Info from "../view/info/Info.js";
import AddInfo from "../view/info/AddInfo.js";

// Nhóm danh mục
import Category from "../view/Category/Category.js";
import AddCategory from "../view/Category/AddCategory.js";

// Nhóm sản phẩm
import AllProduct from "../view/Product/AllProduct.js";
import AddProductNew from "../view/Product/AddProductNew.js";
import ProductDetail from "../view/Product/ProductDetail.js";
import EditProduct from "../view/Product/EditProduct.js";
import AddProductDetail from "../view/Product/AddProductDetail.js";

// Nhóm nhà hàng
import RestaurantList from "../view/Restaurant/RestaurantList.js";
import AddRestaurant from "../view/Restaurant/AddRestaurant.js";

// Nhóm đơn hàng
import OrderManagement from "../view/Order/OrderManagement.js";
import AddOrder from "../view/Order/AddOrder.js";
import OrderDetail from "../view/Order/OrderDetail.js";

// Đăng xuất
import Logout from "../Login/Logout.js";

// Import NotFound component
import NotFound from "../NotFound.js";


const AppContent = () => {
  return (
    <CContainer>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          <Route path="/" element={<Navigate to="home" replace />} />
          <Route path="/home" element={<Home />} />


          {/* category */}
          <Route path="/category" element={<Category />} />
          <Route path="/category/add" element={<AddCategory />} />

          {/* product */}
          <Route path="/allproducts" element={<AllProduct/>} />
          <Route path="/product-detail/:productId" element={<ProductDetail  />} />
          <Route path="/addproduct-new" element={<AddProductNew />} />
          <Route path="/edit-product/:id" element={<EditProduct />} />
          <Route path="/addattributes-new/:productId" element={<AddProductDetail  />} />

          {/* restaurant */}
          <Route path="/restaurant" element={<RestaurantList />} />
          <Route path="/add-restaurant" element={<AddRestaurant />} />

          {/* orders */}
          <Route path="/orders" element={<OrderManagement  />} />
          <Route path="/add-order" element={<AddOrder />} />
          <Route path="/order/:orderId" element={<OrderDetail />} />

          {/* login */}
          <Route path="/info" element={<Info />} />
          <Route path="/addInfo" element={<AddInfo />} />

           {/* Route cho trang 404 */}
           <Route path="*" element={<NotFound />} />

        </Routes>
      </Suspense>
    </CContainer>
  );
};

export default React.memo(AppContent);