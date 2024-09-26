import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  CCloseButton,
  CImage,
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
  CSidebarNav,
  CSidebarToggler,
  CBadge,
  CNavTitle,
  CNavItem,
  CNavGroup,
} from "@coreui/react";
import {
  cilSpeedometer,
  cilPuzzle,
  cilCloudDownload,
  cilLayers,
} from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { sygnet } from "@coreui/icons";

import "bootstrap/dist/css/bootstrap.min.css";
import "@coreui/coreui/dist/css/coreui.min.css";

import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

import { Link } from "react-router-dom";
import logo from "./../../Img/goood.png";
import { AppSidebarNav } from "./AppSidebarNav";
import _nav from "./_nav";

const AppSidebar = () => {
  const dispatch = useDispatch();
  const unfoldable = useSelector((state) => state.sidebarUnfoldable);
  const sidebarShow = useSelector((state) => state.sidebarShow);

  return (
    <CSidebar
      className="border-end"
      colorScheme="dark"
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: "set", sidebarShow: visible });
      }}
    >
      <CSidebarHeader
        className="border-bottom"
        style={{ justifyContent: "center", padding: 0 }}
      >
        <CSidebarBrand to="/">
          <Link to={"/"}>
            <CImage rounded src={logo} width={150} />
          </Link>

          <CIcon
            customClassName="sidebar-brand-narrow"
            icon={cilSpeedometer}
            height={32}
          />

          {/* <CIcon customClassName="sidebar-brand-narrow" icon={cilSpeedometer} height={32} /> */}
        </CSidebarBrand>

        <CCloseButton
          className="d-lg-none"
          light
          onClick={() => dispatch({ type: "set", sidebarShow: false })}
        />
      </CSidebarHeader>


      <AppSidebarNav items={_nav} />

      <CSidebarHeader className="border-top">
        <CSidebarToggler
        style={{ height: '40px', width: '40px', marginLeft: 'auto' }}
          onClick={
            // () => dispatch({ type: "set", sidebarUnfoldable: !unfoldable })
            () => dispatch({ type: "set", sidebarShow: !sidebarShow })
          }
        />
      </CSidebarHeader>
    </CSidebar>
  );
};
export default React.memo(AppSidebar);
