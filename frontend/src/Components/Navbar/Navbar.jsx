import React, { useState, useContext, useRef } from "react";
import "./Navbar.css";

import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import nav_dropdown from "../Assets/nav_dropdown.png";

const Navbar = () => {
  const [menu, setMenu] = useState("Shop");
  const { getTotalCartItems } = useContext(ShopContext);
  const menuRef = useRef();
  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle("nav-menu-visible");
    e.target.classList.toggle("open");
  };

  return (
    <div className="navbar">
      <div className="nav-logo">
        <Link
          to="/"
          onClick={() => {
            setMenu("shop");
          }}
          style={{ textDecoration: "none" }}
          className="nav-logo"
        >
          <img src={logo} alt="" />
          <p>QUICKMART</p>
        </Link>
        <img
          onClick={dropdown_toggle}
          className="nav-dropdown"
          src={nav_dropdown}
          alt=""
        />
      </div>

      <ul ref={menuRef} className="nav-menu">
        <li
          onClick={() => {
            setMenu("Shop");
          }}
        >
          {" "}
          <Link to="/" style={{ textDecoration: "none" }}>
            Shop
          </Link>{" "}
          {menu === "Shop" && <hr />}{" "}
        </li>
        <li
          onClick={() => {
            setMenu("Men");
          }}
        >
          {" "}
          <Link to="/mens" style={{ textDecoration: "none" }}>
            Men
          </Link>{" "}
          {menu === "Men" && <hr />}{" "}
        </li>
        <li
          onClick={() => {
            setMenu("Women");
          }}
        >
          {" "}
          <Link to="womens" style={{ textDecoration: "none" }}>
            Women
          </Link>{" "}
          {menu === "Women" && <hr />}
        </li>
        <li
          onClick={() => {
            setMenu("Kids");
          }}
        >
          {" "}
          <Link to="/kids" style={{ textDecoration: "none" }}>
            Kids
          </Link>{" "}
          {menu === "Kids" && <hr />}
        </li>
      </ul>

      <div className="nav-login-cart">
        {localStorage.getItem("auth-token") ? (
          <button
            style={{ textDecoration: "none" }}
            className="login-btn"
            onClick={() => {
              localStorage.removeItem("auth-token");
              window.location.replace("/");
            }}
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            style={{ textDecoration: "none" }}
            className="login-btn"
          >
            Login
          </Link>
        )}
        <Link to="/cart">
          <img src={cart_icon} alt="cart" />
        </Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  );
};

export default Navbar;
