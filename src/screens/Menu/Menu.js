import React from "react";
import "./style.css";

const Menu = () => {
  return (
    <div>
      <section id="sidebar">
        <a href="/home" className="brand">
          <i className="bx bxs-smile"></i>
          <span className="text">GoodGoods</span>
        </a>
        <ul className="side-menu top">
          <li>
            <a href="/home">
              <i className="bx bxs-dashboard"></i>
              <span className="text">Trang chủ</span>
            </a>
          </li>
          <li>
            <a href="/product">
              <i className="bx bxs-shopping-bag-alt"></i>
              <span className="text">Sản phẩm</span>
            </a>
          </li>
          <li>
            <a href="/insert-product">
              <i className="bx bxs-doughnut-chart"></i>
              <span className="text">Thêm sản phẩm</span>
            </a>
          </li>
          <li>
            <a href="/update-product">
              <i className="bx bxs-message-dots"></i>
              <span className="text">Sửa sản phẩm</span>
            </a>
          </li>
          <li>
            <a href="/Category">
              <i className="bx bxs-group"></i>
              <span className="text">Danh Muc</span>
            </a>
          </li>
        </ul>
        <ul className="side-menu">
          <li>
            <a href="#">
              <i className="bx bxs-cog"></i>
              <span className="text">Settings</span>
            </a>
          </li>
          <li>
            <a href="/login" className="logout">
              <i className="bx bxs-log-out-circle"></i>
              <span className="text">Logout</span>
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default Menu;
