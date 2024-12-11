import React, { useEffect, useState } from "react";
import { CChart } from "@coreui/react-chartjs";
import axios from "axios";
import API_BASE_URL from "../../../API/config";
import {
  CButton,
  CCol,
  CRow,
  CPagination,
  CPaginationItem,
  CCard,
  CCardBody,
  CCardHeader,
  CWidgetStatsA,
} from "@coreui/react";

const ITEMS_PER_PAGE = 7; // Số ngày hiển thị trên mỗi trang

const Home = () => {
  const [chartData, setChartData] = useState();
  const [filterType, setFilterType] = useState("day");
  const [allData, setAllData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [stats, setStats] = useState({
    totalSales: 0,
    totalCosts: 0,
    profit: 0,
    totalOrders: 0,
  });

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

      const data = response.data;

      setAllData(data); // Lưu toàn bộ dữ liệu
      updateChartData(data, 1); // Hiển thị trang đầu tiên

      // Tính toán số liệu tổng quan
      const totalSales = data.reduce((acc, item) => acc + item.totalSales, 0);
      const totalCosts = data.reduce((acc, item) => acc + item.totalCost, 0);
      const profit = data.reduce((acc, item) => acc + item.profit, 0);
      const totalOrders = data.length;

      setStats({ totalSales, totalCosts, profit, totalOrders });
    } catch (error) {
      console.error("Error fetching sales data:", error);
    }
  };

  const updateChartData = (data, page) => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedData = data.slice(startIndex, endIndex);

    const labels = paginatedData.map((item) => formatLabel(item._id));
    const totalSalesData = paginatedData.map((item) => item.totalSales);
    const totalCostsData = paginatedData.map((item) => item.totalCost);
    const profitData = paginatedData.map((item) => item.profit);

    setChartData({
      labels,
      datasets: [
        {
          label: "Tổng doanh số",
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "blue",
          borderWidth: 2,
          pointBorderColor: "blue",
          data: totalSalesData,
        },
        {
          label: "Tổng chi phí",
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "red",
          borderWidth: 2,
          pointBorderColor: "red",
          data: totalCostsData,
        },
        {
          label: "Lợi nhuận",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "green",
          borderWidth: 2,
          pointBorderColor: "green",
          data: profitData,
        },
      ],
    });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    updateChartData(allData, page);
  };

  const handleFilter = (type) => {
    setFilterType(type);
    setCurrentPage(1); // Reset về trang đầu tiên khi đổi bộ lọc
    fetchData(type);
  };

  useEffect(() => {
    fetchData(filterType);
  }, [filterType]);

  const totalPages = Math.ceil(allData.length / ITEMS_PER_PAGE); // Tổng số trang

  return (
    <div className="container mb-4">
      {/* Thống kê tổng quan */}
      <CRow className="mt-3 mb-4">
        <CCol sm={6} lg={4}>
          <CWidgetStatsA
            className="mb-4"
            color="primary"
            value={`${stats.totalSales.toLocaleString()} VND`}
            title="Tổng doanh số"
          />
        </CCol>
        <CCol sm={6} lg={4}>
          <CWidgetStatsA
            className="mb-4"
            color="danger"
            value={`${stats.totalCosts.toLocaleString()} VND`}
            title="Tổng chi phí"
          />
        </CCol>
        <CCol sm={6} lg={4}>
          <CWidgetStatsA
            className="mb-4"
            color="success"
            value={`${stats.profit.toLocaleString()} VND`}
            title="Lợi nhuận"
          />
        </CCol>
        {/* <CCol sm={6} lg={3}>
          <CWidgetStatsA
            className="mb-4"
            color="warning"
            value={`${stats.totalOrders} đơn`}
            title="Tổng số đơn hàng"
          />
        </CCol> */}
      </CRow>

      {/* Bộ lọc */}
      <CRow className="mt-3">
        <CCol xs={12} md={6}>
          <h4 className="mb-4">QUẢN LÝ DOANH THU</h4>
        </CCol>
        <CCol
          xs={12}
          md={6}
          className="mb-4 d-flex flex-wrap justify-content-md-end justify-content-start"
        >
          <CButton
            color={filterType === "day" ? "danger" : "outline-danger"}
            onClick={() => handleFilter("day")}
            className="me-2 mb-2"
          >
            Ngày
          </CButton>
          <CButton
            color={filterType === "week" ? "primary" : "outline-primary"}
            onClick={() => handleFilter("week")}
            className="me-2 mb-2"
          >
            Tuần
          </CButton>
          <CButton
            color={filterType === "month" ? "success" : "outline-success"}
            onClick={() => handleFilter("month")}
            className="me-2 mb-2"
          >
            Tháng
          </CButton>
        </CCol>
      </CRow>

      {/* Biểu đồ doanh thu */}
      <CCard className="mb-4">
        <CCardHeader className="bg-primary text-white text-center">
          <h5>Biểu đồ doanh thu</h5>
        </CCardHeader>
        <CCardBody>
          {chartData ? (
            <CChart
              // type="line"
              data={chartData}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  tooltip: {
                    callbacks: {
                      label: function (context) {
                        return `${context.dataset.label}: ${context.raw.toLocaleString()} VND`;
                      },
                    },
                  },
                },
              }}
              style={{ height: "400px" }}
            />
          ) : (
            <div className="text-center">Đang tải biểu đồ...</div>
          )}
        </CCardBody>
      </CCard>

      {/* Pagination */}
      <CPagination align="center" className="mt-4">
        <CPaginationItem
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Trước
        </CPaginationItem>
        {Array.from({ length: totalPages }, (_, i) => (
          <CPaginationItem
            key={i}
            active={i + 1 === currentPage}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </CPaginationItem>
        ))}
        <CPaginationItem
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Sau
        </CPaginationItem>
      </CPagination>
    </div>
  );
};

export default Home;
