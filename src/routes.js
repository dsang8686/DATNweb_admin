import React from "react";

const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const Colors = React.lazy(() => import("./views/theme/colors/Colors"));

const AdminInfo = React.lazy(() => import("./views/admin/AdminInfo"));
const AdminGroup = React.lazy(() => import("./views/admin/AdminGroup"));
const AdminList = React.lazy(() => import("./views/admin/AdminList"));
const AdminLog = React.lazy(() => import("./views/admin/AdminLog"));

const routes = [
  { path: "/", exact: true, name: "Home" },

  { path: "/dashboard", name: "Dashboard", element: Dashboard },
  { path: "/theme", name: "Theme", element: Colors, exact: true },
  { path: "/theme/colors", name: "Colors", element: Colors },
  { path: "/theme/typography", name: "Typography", element: Typography },

  { path: "/admin", name: "Admin", element: AdminInfo, exact: true },
  { path: "/admin/information", name: "AdminInfo", element: AdminInfo },
  { path: "/admin/groups", name: "AdminGroup", element: AdminGroup },
  { path: "/admin/list", name: "AdminList", element: AdminList },
  { path: "/admin/log", name: "AdminLog", element: AdminLog },
  { path: "/admin", name: "Admin", element: AdminInfo, exact: true },


];

export default routes;
