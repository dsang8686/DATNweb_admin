import Swal from "sweetalert2";

import React, { useState } from "react";
import Menu from "../Menu/Menu";


// import "./Insert.css";

const Detail = () => {
  const [tensanpham, setTensanpham] = useState("");
  const [donGia, setDonGia] = useState("");
  const [soluong, setSoluong] = useState("");
  const [thongtin, setThongtin] = useState("");
  const [images, setImages] = useState([]);

  // const handleInputChange = (e) => {
  //   setPrice(e.target.value);
  // };

  // const handleBlur = () => {
  //   if (price && !price.includes("VND")) {
  //     setPrice(`${price}  + VND`);
  //   }
  // };

  return (
    <div className="home-container">
      <Menu />
      <div className="content">
        <h3>Chi tiết sản phẩm</h3>

        <form>
          <div>
            <label>ID sản phẩm:</label>

            <input type="text" value={12} readOnly className="idsanpham" />
          </div>
          <div>
            <label>Tên sản phẩm:</label>
            <input value={tensanpham} type="text" placeholder="Tên sản phẩm" />
          </div>
          <div>
            <label>Đơn giá:</label>
            <input
              value={donGia}
              type="number"
              min="10000"
              max="2000000"
              placeholder="Đơn giá VND"
              // value={price}
              // step="500"
              // onChange={handleInputChange}
              // onBlur={handleBlur}
            />
          </div>

          <div>
            <label>Số lượng:</label>
            <input
              value={soluong}
              type="number"
              min="1"
              max="99"
              placeholder="số lượng sản phẩn"
            />
          </div>

          <div>
            <label>Thông tin sản phẩm:</label>
            <textarea
              value={thongtin}
              type="text"
              placeholder="Chi tiết sản phẩm"
            />
          </div>

          <div>
            <label htmlFor="danhmuc">Danh mục:</label>
            <select id="danhmuc" name="danhmuc">
              <option disabled>Chọn danh mục</option>
              <option value="danhmucA">Danh mục A</option>
              <option value="danhmucB">Danh mục B</option>
              <option value="danhmucC">Danh mục C</option>
            </select>
          </div>

          <div>
            <label>Hình ảnh sản phẩm:</label>
            
          </div>

          <button type="button" className="them">
            Sửa
          </button>

          <button type="button" className="them">
            Trở về
          </button>
        </form>
      </div>
    </div>
  );
};

export default Detail;
