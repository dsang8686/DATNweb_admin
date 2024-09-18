import Swal from "sweetalert2";

import React, { useState } from "react";
import Menu from "../Menu/Menu";


// import "./Insert.css";

const Update = () => {
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

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const handleSubmit = async () => {
    try {
      // Kiểm tra các trường thông tin không được để trống
      if (!tensanpham || !donGia || !soluong || !thongtin) {
        // Hiển thị cảnh báo nếu có trường thông tin nào đó không hợp lệ
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Vui lòng điền đầy đủ thông tin!",
        });
        return; // Dừng hàm handleSubmit nếu có trường thông tin không hợp lệ
      } else {
        Swal.fire({
          icon: "success",
          title: "Thành công",
          text: "Thêm sản phẩm thành công!",
        });
        // reset form
        setTensanpham("");
        setDonGia("");
        setSoluong("");
        setThongtin("");

        // quay về trang danh sách
        window.location.href = "/product";
      }
    } catch (error) {
      console.log("....Loi:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Thêm sản phẩm không thành công!",
      });
    }
  };

  return (
    <div className="home-container">
      <Menu />
      <div className="content">
        <h3>thêm sản phẩm</h3>

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
            <input type="file" multiple onChange={handleImageChange} />
            <div className="image-preview">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(image)}
                  alt={`Hình ảnh ${index + 1}`}
                  style={{ width: "200px", height: "auto", margin: "10px" }}
                />
              ))}
            </div>
          </div>

          <button type="button" className="them" onClick={handleSubmit}>
            Thêm
          </button>

          <input type="reset" value="Reset" className="them" />
        </form>
      </div>
    </div>
  );
};

export default Update;
