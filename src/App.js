import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./screens/Login/Login";
import DefaultLayout from "./screens/Layout/DefaultLayout";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Logout from "./screens/Login/Logout";

function App() {
  const isAuthenticated = localStorage.getItem("authToken") !== null; // Kiểm tra xem người dùng đã đăng nhập hay chưa

  return (
    <div>
      <Router>
        <Routes>
          {/* Nếu chưa đăng nhập, điều hướng đến trang đăng nhập */}
          <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
          {/* Nếu đã đăng nhập, điều hướng đến DefaultLayout */}
          <Route path="/" element={isAuthenticated ? <DefaultLayout /> : <Navigate to="/login" />} />
          <Route path="/logout" element={<Logout />} />
          {/* Điều hướng mọi route khác đến DefaultLayout */}
          <Route path="*" element={isAuthenticated ? <DefaultLayout /> : <Navigate to="/login" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
