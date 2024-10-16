import React, { Suspense, useState, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { CContainer, CSpinner } from "@coreui/react";

import Home from "../view/Home/Home.js";
import Info from "../view/info/Info.js";
import AddInfo from "../view/info/AddInfo.js";
import Category from "../view/Category/Category.js";
import Product from "../view/Product/Product.js";
import AddCategory from "../view/Category/AddCategory.js";
import categoriesData from "../../Data.js";
import AllProduct from "../view/Product/AllProduct.js";
import AddProductNew from "../view/Product/AddProductNew.js";
import ProductDetail from  "../view/Product/ProductDetail.js";
import AddProductDetail from "../view/Product/AddProductDetail.js";

const AppContent = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const storedCategories = JSON.parse(localStorage.getItem('categories'));
    if (storedCategories) {
      setCategories(storedCategories);
    } else {
      setCategories(categoriesData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);

  const addCategory = (newCategory) => {
    setCategories((prevCategories) => {
      const updatedCategories = [...prevCategories, newCategory];
      localStorage.setItem('categories', JSON.stringify(updatedCategories));
      return updatedCategories;
    });
  };

  const deleteCategory = (id) => {
    setCategories((prevCategories) => {
      const updatedCategories = prevCategories.filter(category => category.id !== id);
      localStorage.setItem('categories', JSON.stringify(updatedCategories));
      return updatedCategories;
    });
  };

  const handleDeleteProduct = (categoryId, productId) => {
    setCategories((prevCategories) => {
      return prevCategories.map(category => {
        if (category.id === categoryId) {
          return {
            ...category,
            products: category.products.filter(product => product.id !== productId)
          };
        }
        return category;
      });
    });
  };

  const addProduct = (categoryId, newProduct) => {
    setCategories((prevCategories) => {
      return prevCategories.map((category) => {
        if (category.id === parseInt(categoryId)) {
          return {
            ...category,
            products: [...category.products, newProduct],
          };
        }
        return category;
      });
    });
  };
  

  return (
    <CContainer>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          <Route path="/" element={<Navigate to="home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/category" element={<Category categories={categories} onAddCategory={addCategory} onDeleteCategory={deleteCategory} />} />
          <Route path="/category/add" element={<AddCategory onAddCategory={addCategory} />} />
          <Route path="/category/:id/products" element={<Product categories={categories} onDeleteProduct={handleDeleteProduct} />} />
          <Route path="/allproducts" element={<AllProduct categories={categories} />} />

          <Route path="/category/:id/product/:productId" element={<ProductDetail categories={categories} />} />
          <Route path="/addproduct-new/:productId" element={<AddProductDetail categories={categories} />} />


          <Route path="/addproduct-new" element={<AddProductNew categories={categories} onAddProduct={addProduct} />} />
          <Route path="/info" element={<Info />} />
          <Route path="/addInfo" element={<AddInfo />} />
        </Routes>
      </Suspense>
    </CContainer>
  );
};

export default React.memo(AppContent);
