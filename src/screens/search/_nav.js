import React from "react";
import CIcon from "@coreui/icons-react";
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
  cilUser,
  cilDevices,
  cilTags,
  cilMoney,
  cilPeople,
  cilGift,
  cilCommentBubble,
  cilNewspaper,
  cilImage,
  cilSettings,
  cilBook,
  cilInfo,
  cilPhone,
  cilEnvelopeClosed,
  cilCog,
  cilShareAlt,
  cilPaperPlane,
  cilBarChart,
  cilChart,
  cilColorPalette,
} from "@coreui/icons";
import { CNavGroup, CNavItem, CNavTitle } from "@coreui/react";

const _nav = [
  {
    component: CNavItem,
    name: "BẢNG ĐIỀU KHIỂN",
    to: "/home",
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: "THÔNG TIN",
    to: "/info",
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Thông tin",
        to: "/info",
      },

      {
        component: CNavItem,
        name: "Thêm admin",
        to: "/addinfo",
      },
    ],
  },

  {
    component: CNavGroup,
    name: "QUẢN LÝ SẢN PHẨM",
    to: "/product",
    icon: <CIcon icon={cilDevices} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Danh mục sản phẩm",
        to: "/category",
      },
      {
        component: CNavItem,
        name: "Thêm danh mục",
        to: "/category/add",
      },
      {
        component: CNavItem,
        name: "Tất cả sản phẩm",
        to: "/allproducts",
      },
      {
        component: CNavItem,
        name: "Thêm sản phẩm",
        to: "/addproduct-new",
      },
    ],
  },

  {
    component: CNavGroup,
    name: "QUẢN LÝ CỬA HÀNG",
    to: "/coupon",
    icon: <CIcon icon={cilTags} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Quản lý cửa hàng",
        to: "/restaurant",
      },
      {
        component: CNavItem,
        name: "Thêm mới cửa hàng",
        to: "add-restaurant",
      },
    ],
  },

  {
    component: CNavGroup,
    name: "QUẢN LÝ ĐƠN HÀNG",
    to: "/order",
    icon: <CIcon icon={cilMoney} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Đơn hàng",
        to: "/orders",
      },
      {
        component: CNavItem,
        name: "Phương thức vận chuyển",
        to: "/add-order",
      },
      {
        component: CNavItem,
        name: "Phương thức thanh toán",
        to: "/order/:orderId",
      },
    ],
  },

  {
    component: CNavGroup,
    name: "QUẢN LÝ THÀNH VIÊN",
    to: "/member",
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Quản lý thành viên",
        to: "/member",
      },
    ],
  },
];

export default _nav;
