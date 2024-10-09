import React, { Suspense, useState, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { CContainer, CSpinner } from "@coreui/react";

import Home from "../view/Home/Home.js";
import Info from "../view/info/Info.js";
import AddInfo from "../view/info/AddInfo.js";
import Category from "../view/Category/Category.js";
import CategoryDetail from "../view/Category/CategoryDetail.js";
import AddCategory from "../view/Category/AddCategory.js";
import categoriesData from "../../Data.js";

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

  return (
    <CContainer style={{ paddingInlineStart: "10rem" }}>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          <Route path="/" element={<Navigate to="home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/category/:id" element={<CategoryDetail categories={categories} />} />
          <Route path="/category" element={<Category categories={categories} onAddCategory={addCategory} onDeleteCategory={deleteCategory} />} />
          <Route path="/category/add" element={<AddCategory onAddCategory={addCategory} />} />
          <Route path="/info" element={<Info />} />
          <Route path="/addInfo" element={<AddInfo />} />
        </Routes>
      </Suspense>
    </CContainer>
  );
};

export default React.memo(AppContent);
