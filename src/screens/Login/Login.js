import React from "react";
import "./Login.css";
const handleLogin = async () => {
  window.location.href = "/home";
}


const Login = () => {
  return (
    <div id="loginContainer">
      <div id="loginContent">
        <div id="formLogin">
          <img src={require("./../../Img/goood.png")} alt="" />
          <p>Email</p>
          <input
            type="text"
            placeholder="...@gmail.com"
            // value={email}
            // onChange={(e) => setEmail(e.target.value)}
          />
          <p>Password</p>
          <input
            type="password"
            // value={password}
            // onChange={(e) => setPassword(e.target.value)}
            placeholder="*******"
          />
          <button className="loadingButton" onClick={() => handleLogin()}>
            <>
              <img
                  src={require("./../../Img/goood.png")}
                  alt=""
                />
              <p className="dangnhap">Đăng nhập</p>
            </>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
