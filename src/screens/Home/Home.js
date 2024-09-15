import React from "react";
import "./Home.css";
import Chart from "chart.js/auto";
import Menu from "../Menu/Menu";

const Home = () => {
  const render = () => {
    const ctx = document.getElementById("myChart");

    new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange", "Black", "Violet", "Pick", "White"],
        datasets: [
          {
            label: "# of Votes",
            data: [12, 14, 3, 5, 2, 3, 15, 9, 7, 10],
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
  };

  return (
    <div className="home-container">
      <Menu />
      <div className="content">
        <h3>Biểu đồ top sản phẩm bán chạy nhất</h3>

        <canvas id="myChart"></canvas>
        <button onClick={render}>Render</button>

        <h1>sang dev</h1>
      </div>
    </div>
  );
};

export default Home;
