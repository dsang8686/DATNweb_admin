import React, { useEffect, useState } from "react";
import { CChart } from "@coreui/react-chartjs";
import axios from "axios";
import API_BASE_URL from "../../../API/config";
import { CButton, CCol, CRow } from "@coreui/react";

const Home = () => {
  const [chartData, setChartData] = useState();
  const [filterType, setFilterType] = useState("day");

  const formatLabel = (id) => {
    if (typeof id === "string") {
      return `Ngày ${id}`;
    } else if (id.week) {
      return `Tuần ${id.week}, ${id.year}`;
    } else if (id.month) {
      return `Tháng ${id.month}, ${id.year}`;
    }
    return "";
  };

  const fetchData = async (type) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("Token not found!");
      return;
    }

    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/v1/orders/get/totalsales/?type=${type}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const labels = response.data.map((item) => formatLabel(item._id));
      const totalSalesData = response.data.map((item) => item.totalSales);
      const totalCostsData = response.data.map((item) => item.totalCost);
      const profitData = response.data.map((item) => item.profit);

      setChartData({
        labels,
        datasets: [
          {
            label: "Tổng doanh số",
            pointBorderColor: "blue",
            data: totalSalesData,
          },
          {
            label: "Tổng chi phí",
            pointBorderColor: "red",
            data: totalCostsData,
          },
          {
            label: "Lợi nhuận",
            pointBorderColor: "black",
            data: profitData,
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching sales data:", error);
    }
  };

  const handleFilter = (type) => {
    setFilterType(type);
    fetchData(type);
  };

  useEffect(() => {
    fetchData(filterType);
  }, [filterType]);

  return (
    <div className="container mb-4">
      <CRow className="mt-3">
        <CCol xs={12} md={5}>
          <h4 className="mb-4">QUẢN LÝ DOANH THU</h4>
        </CCol>
        <CCol
          xs={12}
          md={7}
          className="mb-4 d-flex flex-wrap justify-content-end"
        >
          <CButton
            color="danger"
            onClick={() => handleFilter("day")}
            className="me-2 mb-2"
            xs={12}
            md="auto"
          >
            Ngày
          </CButton>
          <CButton
            color="primary"
            onClick={() => handleFilter("week")}
            className="me-2 mb-2"
            xs={12}
            md="auto"
          >
            Tuần
          </CButton>
          <CButton
            color="success"
            onClick={() => handleFilter("month")}
            className="me-2 mb-2"
            xs={12}
            md="auto"
          >
            Tháng
          </CButton>
        </CCol>
      </CRow>

      <CChart
        // type="line"
        data={chartData}
        style={{ width: "80%"}} //, margin: "auto" 
      />
    </div>
  );
};

export default Home;
