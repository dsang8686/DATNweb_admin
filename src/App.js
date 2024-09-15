import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./screens/Login/Login";
import Home from "./screens/Home/Home";
import Product from "./screens/Products/Product";
import Update from "./screens/Products/Update";
import Insert from "./screens/Insert/Insert";
import Detail from "./screens/Products/Detail";
import Category from "./screens/Categotys/Category";
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
          {/* authen */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />

          <Route path="/home" element={<Home />} />

          {/* san pham */}
          <Route path="/product" element={<Product />} />
          <Route path="/detail" element={<Detail />} />
          <Route path="/update-product" element={<Update />} />


          {/* them san pham */}
          <Route path="/insert-product" element={<Insert />} />

          {/* danh muc */}
          <Route path="/category" element={<Category />} />


          {/* <Route path='/menu' element={<Menu />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
