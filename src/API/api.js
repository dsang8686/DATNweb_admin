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
