import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../../API/config";
import {
  CButton,
  CDropdownItem,
  CHeader,
  CContainer,
  CHeaderToggler,
  CHeaderNav,
  useColorModes,
  CDropdownToggle,
  CDropdown,
  CDropdownMenu,
} from "@coreui/react";
import { useSelector, useDispatch } from "react-redux";
import CIcon from "@coreui/icons-react";
import {
  cilMenu,
  cilSearch,
  cilSun,
  cilMoon,
  cilContrast,
  cilBell,
  cilFrown,
} from "@coreui/icons";
import { useNavigate } from "react-router-dom";

const AppHeader = () => {
  const headerRef = useRef();
  const searchContainerRef = useRef();
  const { colorMode, setColorMode } = useColorModes();

  const dispatch = useDispatch();
  const sidebarShow = useSelector((state) => state.sidebarShow);

  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  const [avatar, setAvatar] = useState(null);
  const [hasNewOrder, setHasNewOrder] = useState(false); // Trạng thái cho đơn hàng mới
  const navigate = useNavigate();

  // hiện thị avatar
  useEffect(() => {
    const fetchAdminInformation = async () => {
      const token = localStorage.getItem("authToken");
      const userId = localStorage.getItem("userId");

      if (token && userId) {
        try {
          const response = await axios.get(
            `${API_BASE_URL}/api/v1/users/${userId}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setAvatar(response.data.image);
        } catch (error) {
          console.error("Error fetching user information:", error);
        }
      }
    };

    fetchAdminInformation();
  }, []);

  // sáng tối
  useEffect(() => {
    setColorMode("light");
    document.addEventListener("scroll", () => {
      headerRef.current &&
        headerRef.current.classList.toggle(
          "shadow-sm",
          document.documentElement.scrollTop > 0
        );
    });

    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setSearchResults([]); // Ẩn thanh gợi ý
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // kiểm tra có đơn hàng mới hay không sau mỗi 30s
  useEffect(() => {
    const checkForNewOrders = async () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        try {
          // Giả sử có một API kiểm tra đơn hàng mới
          const response = await axios.get(
            `${API_BASE_URL}/api/v1/orders/new`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          if (response.data.newOrders > 0) {
            setHasNewOrder(true); // Cập nhật trạng thái có đơn hàng mới
          } else {
            setHasNewOrder(false);
          }
        } catch (error) {
          console.error("Error checking for new orders:", error);
        }
      }
    };

    checkForNewOrders();
    // Kiểm tra đơn hàng mới mỗi 10 giây
    const interval = setInterval(checkForNewOrders, 10000);
    return () => clearInterval(interval); // Dọn dẹp khi component unmount
  }, []);

  // thanh search
  const handleSearch = async () => {
    if (!searchInput.trim()) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/v1/products/search?input=${searchInput}`
      );
      setSearchResults(response.data.products);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  };
  // thanh search
  const handleViewSearch = () => {
    if (!searchInput.trim()) return;
    navigate(`/search-product?query=${encodeURIComponent(searchInput)}`);
  };

  // hiện thị gợi ý sau 1 ngừng nhập
  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);

    // Debounce: Gọi API sau 1 giây ngừng nhập
    if (debounceTimeout) clearTimeout(debounceTimeout);
    setDebounceTimeout(setTimeout(() => handleSearch(), 1000));
  };

  // khi nhấn vào gợi ý chuyển trang
  const handleViewDetail = (productId) => {
    navigate(`/product-detail/${productId}`);
  };

  // chuyển trang thông tin
  const handleAvatarClick = () => {
    navigate("/info");
  };

  return (
    <CHeader position="sticky " className="mb-1 p-0" ref={headerRef}>
      <CContainer
        className="border-bottom px-4 text-align-center justify-content-center"
        fluid
      >
        <CHeaderToggler
          onClick={() => dispatch({ type: "set", sidebarShow: !sidebarShow })}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>

        <div
          className="search-container position-relative mx-auto"
          style={{ width: "600px" }}
          ref={searchContainerRef}
        >
          <input
            type="text"
            className="form-control"
            placeholder="Tìm kiếm sản phẩm..."
            value={searchInput}
            onChange={handleSearchInputChange}
            onBlur={() => {
              if (!searchInput.trim()) setSearchResults([]);
            }}
          />
          <CButton
            color="primary"
            onClick={handleViewSearch}
            style={{ position: "absolute", top: 0, right: 0 }}
          >
            <CIcon icon={cilSearch} />
          </CButton>

          {searchInput.trim() && searchResults.length > 0 && (
            <div
              className="dropdown-menu show position-absolute mt-1"
              style={{
                maxHeight: "200px",
                overflowY: "auto",
                width: "100%",
                zIndex: 1050,
                top: "100%",
                left: "0",
              }}
            >
              {searchResults.map((product) => (
                <CDropdownItem
                  key={product.id}
                  onClick={() => handleViewDetail(product.id)}
                >
                  {product?.name}
                </CDropdownItem>
              ))}
            </div>
          )}
        </div>

        <CHeaderNav className="ms-auto"></CHeaderNav>
        {avatar ? (
          <img
            src={avatar}
            alt="User Avatar"
            className="rounded-circle"
            width="30"
            height="30"
            onClick={handleAvatarClick} // OnClick to navigate to /info
            style={{ cursor: "pointer" }} // Optional: show cursor pointer
          />
        ) : (
          <CIcon
            icon={cilFrown}
            size="lg"
            onClick={handleAvatarClick} // OnClick to navigate to /info
            style={{ cursor: "pointer" }} // Optional: show cursor pointer
          />
        )}

        {/* Biểu tượng chuông với chấm đỏ */}
        <CHeaderNav>
          <li className="nav-item py-1">
            <div className="vr h-100 mx-2 text-body text-opacity-75"></div>
          </li>
          <CDropdown variant="nav-item" placement="bottom-end">
            <CDropdownToggle caret={false}>
              <div style={{ position: "relative" }}>
                <CIcon icon={cilBell} size="lg" />
                {hasNewOrder && (
                  <span
                    style={{
                      position: "absolute",
                      top: "-5px",
                      right: "-5px",
                      backgroundColor: "red",
                      borderRadius: "50%",
                      width: "8px",
                      height: "8px",
                    }}
                  />
                )}
              </div>
            </CDropdownToggle>
            <CDropdownMenu></CDropdownMenu>
          </CDropdown>

          <li className="nav-item py-1">
            <div className="vr h-100 mx-2 text-body text-opacity-75"></div>
          </li>
          <CDropdown variant="nav-item" placement="bottom-end">
            <CDropdownToggle caret={false}>
              {colorMode === "dark" ? (
                <CIcon icon={cilMoon} size="lg" />
              ) : colorMode === "auto" ? (
                <CIcon icon={cilContrast} size="lg" />
              ) : (
                <CIcon icon={cilSun} size="lg" />
              )}
            </CDropdownToggle>
          </CDropdown>

          <CDropdownMenu>
            <CDropdownItem
              active={colorMode === "light"}
              className="d-flex align-items-center"
              as="button"
              type="button"
              onClick={() => setColorMode("light")}
            >
              <CIcon className="me-2" icon={cilSun} size="lg" /> Light
            </CDropdownItem>
            <CDropdownItem
              active={colorMode === "dark"}
              className="d-flex align-items-center"
              as="button"
              type="button"
              onClick={() => setColorMode("dark")}
            >
              <CIcon className="me-2" icon={cilMoon} size="lg" /> Dark
            </CDropdownItem>
            <CDropdownItem
              active={colorMode === "auto"}
              className="d-flex align-items-center"
              as="button"
              type="button"
              onClick={() => setColorMode("auto")}
            >
              <CIcon className="me-2" icon={cilContrast} size="lg" /> Auto
            </CDropdownItem>
          </CDropdownMenu>
        </CHeaderNav>
      </CContainer>
    </CHeader>
  );
};

export default AppHeader;
