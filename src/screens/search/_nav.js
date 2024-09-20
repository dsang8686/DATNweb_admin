import React from 'react'
import CIcon from '@coreui/icons-react'
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
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'


const _nav = [
  {
    component: CNavItem,
    name: 'BẢNG ĐIỀU KHIỂN',
    to: '/home',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'THÔNG TIN',
    to: '/info',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Thông tin',
        to: '/info',
      },

      {
        component: CNavItem,
        name: 'Thêm admin',
        to: '/addinfo',
      },
    ],

  },

  {
    component: CNavGroup,
    name: 'QUẢN LÝ SẢN PHẨM',
    to: '/product',
    icon: <CIcon icon={cilDevices} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Cấu hình sản phẩm',
        to: '/product',
      },
      {
        component: CNavItem,
        name: 'Thương hiệu sản phẩm',
        to: '/products/add',
      },
      {
        component: CNavItem,
        name: 'Danh mục sản phẩm',
        to: '/product/category',
      },
      {
        component: CNavItem,
        name: 'Thuộc tính sản phẩm',
        to: '/product/properties',
      },
      {
        component: CNavItem,
        name: 'Trạng thái sản phẩm',
        to: '/product/status',
      },
      {
        component: CNavItem,
        name: 'Sản phẩm flash sale',
        to: '/product/product-flash-sale',
      },
      {
        component: CNavItem,
        name: 'Sản phẩm hot',
        to: '/product/product-hot',
      },
      {
        component: CNavItem,
        name: 'Banner sản phẩm',
        to: '/product/banner',
      },
      {
        component: CNavItem,
        name: 'Thêm mới sản phẩm',
        to: '/product/add',
      },
      {
        component: CNavItem,
        name: 'Quản lý sản phẩm',
        to: '/product',
      },
    ],
  },

  {
    component: CNavGroup,
    name: 'QUẢN LÝ',
    to: '/coupon',
    icon: <CIcon icon={cilTags} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Quản lý ',
        to: '/coupon',
      },
      {
        component: CNavItem,
        name: 'Thêm mới ',
        to: '/coupon/add',
      },
    ],
  },

  {
    component: CNavGroup,
    name: 'QUẢN LÝ ĐƠN HÀNG',
    to: '/order',
    icon: <CIcon icon={cilMoney} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Trạng thái đơn hàng',
        to: '/order/status',
      },
      {
        component: CNavItem,
        name: 'Phương thức vận chuyển',
        to: '/order/shipping-method',
      },
      {
        component: CNavItem,
        name: 'Phương thức thanh toán',
        to: '/order/payment-method',
      },
      {
        component: CNavItem,
        name: 'Quản lý đơn hàng',
        to: '/order',
      },
    ],
  },

  {
    component: CNavGroup,
    name: 'QUẢN LÝ THÀNH VIÊN',
    to: '/member',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Quản lý thành viên',
        to: '/member',
      },
    ],
  },

]

export default _nav