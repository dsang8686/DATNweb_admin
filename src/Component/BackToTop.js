import React, { useEffect, useState } from "react";
import { CButton } from "@coreui/react";


const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Hàm kiểm tra vị trí cuộn trang
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Hàm cuộn lên đầu trang
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  useEffect(() => {
    // Thêm sự kiện lắng nghe khi cuộn trang
    window.addEventListener("scroll", toggleVisibility);
    // Xóa sự kiện khi component bị gỡ bỏ
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    isVisible && (
      <CButton
        onClick={scrollToTop}
        color="width"
        style={{
          position: "fixed",
          bottom: "30px",
          right: "30px",
          borderRadius: "10px",
          padding: "10px 15px",
          zIndex: 1000,
          backgroundColor: "black"
        }}
      >
      <i class="bi bi-airplane-engines" style={{color: "white"}}></i>
      </CButton>
    )
  );
};

export default BackToTop;
