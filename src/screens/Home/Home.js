import React from "react";
import "./Home.css";
import Chart from "chart.js/auto";

const Home = () => {
  

  const render = () => {
  const ctx = document.getElementById("myChart");

    new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [
          {
            label: "# of Votes",
            data: [12, 19, 3, 5, 2, 3],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }


  return (
    <div id="">
      <div>
        <section id="sidebar">
          <a href="/home" className="brand">
            <i className="bx bxs-smile"></i>
            <span className="text">GoodGood</span>
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
              <a href="#">
                <i className="bx bxs-group"></i>
                <span className="text">Chi tiết</span>
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

        <section id="content">
          <nav>
            {/* <i class="bx bx-menu"></i> */}

            <form action="#">
              <div class="form-input">
                <input type="search" placeholder="Search..." />
                <button type="submit" class="search-btn">
                  <i class="bx bx-search"></i>
                </button>
              </div>
            </form>

            <a href="#" class="notification">
              <i class="bx bxs-bell"></i>
              {/* <span class="num">0</span> */}
            </a>

            {/* <a href="#" class="profile">
            <img src="img/people.png"/>
          </a> */}
          </nav>

          {/* ----------------------------------------------------------------------- */}

          <canvas id="myChart"></canvas>
          <button onClick={render}>Render</button>
        </section>
      </div>
    </div>
  );
};

export default Home;
