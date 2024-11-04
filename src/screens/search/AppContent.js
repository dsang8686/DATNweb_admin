import React, { Suspense, useState, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { CContainer, CSpinner } from "@coreui/react";

// admin
import Home from "../view/Home/Home.js";
import Info from "../view/info/Info.js";
import AddInfo from "../view/info/AddInfo.js";
import MemberPage from "../view/info/MemberPage.js";

// Nhóm danh mục
import Category from "../view/Category/Category.js";
import EditCategory from "../view/Category/EditCategory.js";
import AddCategory from "../view/Category/AddCategory.js";

// Nhóm sản phẩm
import AllProduct from "../view/Product/AllProduct.js";
import AddProductNew from "../view/Product/AddProductNew.js";
import ProductDetail from "../view/Product/ProductDetail.js";
import EditProduct from "../view/Product/EditProduct.js";

// Nhóm nhà hàng
import Restaurant from "../view/Restaurant/Restaurant.js";
import AddRestaurant from "../view/Restaurant/AddRestaurant.js";
import EditRestaurant from "../view/Restaurant/EditRestaurant.js";

// Nhóm đơn hàng
import OrderManagement from "../view/Order/OrderManagement.js";
import AddOrder from "../view/Order/AddOrder.js";
import OrderDetail from "../view/Order/OrderDetail.js";
import OrderMissinginfo from "../view/Order/OrderMissinginfo.js";

// Đăng xuất
import Logout from "../Login/Logout.js";

// trang không tồn tại
import NotFound from "../NotFound.js";
import MemberUserPage from "../view/info/MemberUserPage.js";


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
          <Route path="/category/edit/:id" element={<EditCategory />} />

          {/* product */}
          <Route path="/allproducts" element={<AllProduct/>} />
          <Route path="/product-detail/:productId" element={<ProductDetail  />} />
          <Route path="/addproduct-new" element={<AddProductNew />} />
          <Route path="/edit-product/:id" element={<EditProduct />} />

          {/* restaurant */}
          <Route path="/restaurant" element={<Restaurant/>} />
          <Route path="/add-restaurant" element={<AddRestaurant />} />
          <Route path="/edit-restaurant/:id" element={<EditRestaurant />} />

          {/* orders */}
          <Route path="/orders" element={<OrderManagement  />} />
          <Route path="/orders/missing-info" element={<OrderMissinginfo  />} />
          <Route path="/add-order" element={<AddOrder />} />
          <Route path="/order/:orderId" element={<OrderDetail />} />

          {/* thông tin admin */}
          <Route path="/info" element={<Info />} />
          <Route path="/addInfo" element={<AddInfo />} />
          <Route path="/member" element={<MemberPage />} />
          <Route path="/member-user" element={<MemberUserPage />} />

           {/* Route cho trang 404 */}
           <Route path="*" element={<NotFound />} />

        </Routes>
      </Suspense>
    </CContainer>
  );
};

export default React.memo(AppContent);
