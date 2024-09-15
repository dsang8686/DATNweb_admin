import React from "react";
import Menu from "../Menu/Menu";
import "./Product.css";
import { Link } from "react-router-dom";

const Product = () => {
  const data = [
    {
      id: 1,
      nameSanpham: "Sản phẩm Alpha",
      donGia: 15500,
      soLuong: 18,
      thongTin: "Đây là mô tả của sản phẩm Alpha, với các đặc điểm nổi bật. ska",
      danhMuc: "Danh mục A",
    },
    {
      id: 2,
      nameSanpham: "Sản phẩm Beta",
      donGia: 12500,
      soLuong: 28,
      thongTin: "Mô tả chi tiết của sản phẩm Beta, với tính năng tiên tiến.",
      danhMuc: "Danh mục B",
    },
    {
      id: 3,
      nameSanpham: "Sản phẩm Gamma",
      donGia: 18500,
      soLuong: 22,
      thongTin: "Danh mục về sản phẩm Gamma, bao gồm các thông số kỹ thuật.",
      danhMuc: "Danh mục C",
    },
    {
      id: 4,
      nameSanpham: "Sản phẩm Delta",
      donGia: 24500,
      soLuong: 14,
      thongTin:
        "Sản phẩm Delta nổi bật với chất lượng vượt trội và thiết kế tinh tế.",
      danhMuc: "Danh mục A",
    },
    {
      id: 5,
      nameSanpham: "Sản phẩm Epsilon",
      donGia: 21000,
      soLuong: 16,
      thongTin:
        "Epsilon là sản phẩm mới với công nghệ tiên tiến và hiệu suất cao.",
      danhMuc: "Danh mục B",
    },
    {
      id: 6,
      nameSanpham: "Sản phẩm Zeta",
      donGia: 17500,
      soLuong: 20,
      thongTin:
        "Zeta mang lại trải nghiệm tuyệt vời với chất lượng cao và giá cả hợp lý.",
      danhMuc: "Danh mục C",
    },
    {
      id: 7,
      nameSanpham: "Sản phẩm Eta",
      donGia: 22500,
      soLuong: 11,
      thongTin: "Sản phẩm Eta cung cấp giải pháp tối ưu cho nhu cầu của bạn.",
      danhMuc: "Danh mục A",
    },
    {
      id: 8,
      nameSanpham: "Sản phẩm Theta",
      donGia: 14500,
      soLuong: 26,
      thongTin:
        "Theta là lựa chọn lý tưởng với hiệu suất tốt và tính năng nổi bật.",
      danhMuc: "Danh mục B",
    },
    {
      id: 9,
      nameSanpham: "Sản phẩm Iota",
      donGia: 16500,
      soLuong: 19,
      thongTin:
        "Mô tả Iota cung cấp thông tin chi tiết về sản phẩm và ứng dụng của nó.",
      danhMuc: "Danh mục C",
    },
    {
      id: 10,
      nameSanpham: "Sản phẩm Kappa",
      donGia: 19500,
      soLuong: 13,
      thongTin:
        "Kappa là sản phẩm đáng chú ý với thiết kế hiện đại và công nghệ tiên tiến.",
      danhMuc: "Danh mục A",
    },
  ];

  const handleDelete = (id) => {
    // Thực hiện chức năng xóa
    alert("Xóa sản phẩm:");
  };

  return (
    <div className="home-container">
      <Menu />
      <div className="content">
        <h3>Sản phẩm</h3>

        <div className="table-container">
          <table>
            <thead>
              <tr className="tieude">
                <th>Tên sản phẩm</th>
                <th>Đơn giá</th>
                <th>Số lượng</th>
                {/* <th>Thông tin</th> */}
                <th>Danh mục</th>

                <th>Chi tiết</th>
                <th>Tác vụ</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <React.Fragment key={item.id}>
                  <tr>
                    <td>{item.nameSanpham}</td>
                    <td>{item.donGia}</td>
                    <td>{item.soLuong}</td>
                    {/* <td>{item.thongTin}</td> */}
                    <td>{item.danhMuc}</td>

                    <td>
                      <a href="/detail">
                        <i className="bx bxs-show"></i>
                        <span className="text">Xem chi tiết</span>
                      </a>
                    </td>

                    <td>
                      <button className="bx bx-edit"></button>
                      <button
                        className="bx bx-trash"
                        onClick={() => handleDelete(item.nameSanpham)}
                      ></button>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Product;
