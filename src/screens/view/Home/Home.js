import React, { useEffect, useState } from "react";
import { CChart } from "@coreui/react-chartjs";
import axios from "axios";
import API_BASE_URL from "../../../API/config";
import { CButton, CCol, CRow, CPagination, CPaginationItem } from "@coreui/react";

const ITEMS_PER_PAGE = 7; // Số ngày hiển thị trên mỗi trang

const Home = () => {
  const [chartData, setChartData] = useState();
  const [filterType, setFilterType] = useState("day");
  const [allData, setAllData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

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

      setAllData(response.data); // Lưu toàn bộ dữ liệu
      updateChartData(response.data, 1); // Hiển thị trang đầu tiên
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
          >
            Ngày
          </CButton>
          <CButton
            color="primary"
            onClick={() => handleFilter("week")}
            className="me-2 mb-2"
          >
            Tuần
          </CButton>
          <CButton
            color="success"
            onClick={() => handleFilter("month")}
            className="me-2 mb-2"
          >
            Tháng
          </CButton>
        </CCol>
      </CRow>

      <CChart
        // type="line"
        data={chartData}
        style={{ width: "95%", margin: "auto" }}
      />

      {/* Pagination */}
      <CPagination align="center" className="mt-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <CPaginationItem
            key={i}
            active={i + 1 === currentPage}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </CPaginationItem>
        ))}
      </CPagination>
    </div>
  );
};

export default Home;
