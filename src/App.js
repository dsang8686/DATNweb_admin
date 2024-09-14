import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./screens/Login/Login";
import Home from "./screens/Home/Home";
import Product from "./screens/Products/Product";
import Update from "./screens/Products/Update";
import Insert from "./screens/Products/Insert";
import Menu from "./screens/Menu/Menu";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />

          <Route path="/product" element={<Product />} />
          <Route path="/update-product" element={<Update />} />
          <Route path="/insert-product" element={<Insert />} />

          {/* <Route path='/menu' element={<Menu />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
