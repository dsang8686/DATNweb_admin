import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./screens/Login/Login";
import DefaultLayout from "./screens/Layout/DefaultLayout";

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
          {/* <Route path="/" element={<Login />} /> */}
          <Route path="/login" element={<Login />} />

          <Route path="*" element={<DefaultLayout />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
