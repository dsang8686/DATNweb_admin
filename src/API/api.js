// src/api.js
import axios from "axios";
import API_BASE_URL from "./config";

// Lấy token từ localStorage hoặc bất cứ đâu bạn lưu trữ
const token = localStorage.getItem("authToken");

// Thiết lập axios với base URL và token
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});


// API lấy danh sách sản phẩm
export const getProducts = async (categoryId) => {
  try {
    const response = await api.get(`/categories/${categoryId}/products`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products", error);
    throw error;
  }
};

// API thêm sản phẩm mới
export const addProduct = async (categoryId, productData) => {
  try {
    const response = await api.post(`/categories/${categoryId}/products`, productData);
    return response.data;
  } catch (error) {
    console.error("Error adding product", error);
    throw error;
  }
};

// API cập nhật sản phẩm
export const updateProduct = async (categoryId, productId, productData) => {
  try {
    const response = await api.put(`/categories/${categoryId}/products/${productId}`, productData);
    return response.data;
  } catch (error) {
    console.error("Error updating product", error);
    throw error;
  }
};

// API xóa sản phẩm
export const deleteProduct = async (categoryId, productId) => {
  try {
    const response = await api.delete(`/categories/${categoryId}/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting product", error);
    throw error;
  }
};
