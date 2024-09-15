import React from "react";
import Menu from "../Menu/Menu";
import "./Insert.css"

const Insert = () => {
  return (
    <div className="home-container">
      <Menu />
      <div className="content">
        <h3>thêm sản phẩm</h3>

        <form >
          <div >
            <label for="email">Email:</label>
            <input
              type="file"
              id="email"
              placeholder="Enter email"
              name="email"
            />
          </div>
          <div>
            <label for="pwd">Password:</label>
            <input
              type="date"
              id="pwd"
              placeholder="Enter password"
              name="pswd"
            />
          </div>
          <div>
            <label>
              <input type="checkbox" name="remember" /> Remember me
            </label>
          </div>
          <button type="submit">Submit</button>
          <input type="reset" value="Reset"/>

        </form>
      </div>
    </div>
  );
};

export default Insert;
