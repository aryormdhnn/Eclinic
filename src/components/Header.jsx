import { NavLink, Link } from "react-router-dom";
import {
  HiShoppingCart,
  HiChevronDown,
  HiMenu,
  HiX,
} from "react-icons/hi";
import React, { useState, useContext, useRef, useEffect } from "react";
import "../css/header.css";
import Logo from "../assets/logo.png";
import "../globalstyle.css";
import { ProductContext } from '../context/ProductContext';

export const Header = () => {
  const { cartItems } = useContext(ProductContext);
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  // Simple boolean toggles — no fragile click counter
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  const dropdownRef = useRef(null);
  const sideMenuRef = useRef(null);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (sideMenuRef.current && !sideMenuRef.current.contains(event.target)) {
        setIsSideMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const closeSideMenu = () => setIsSideMenuOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    window.location.reload();
  };

  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div>
      <nav className="navbar">
        <div className="menubar">
          <Link to="/">
            <img src={Logo} alt="eClinic Logo" className="logo" />
          </Link>
          <div className="menu men-nav">
            <NavLink
              to="/"
              end
              className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
            >
              Beranda
            </NavLink>
            <NavLink
              to="/cari-dokter"
              className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
            >
              Cari Dokter
            </NavLink>
            <NavLink
              to="/artikel"
              className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
            >
              Artikel
            </NavLink>
            <NavLink
              to="/toko"
              className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
            >
              Toko Obat
            </NavLink>
          </div>
        </div>

        <div className="icons">
          <NavLink to="/cart" className="cart-icon">
            <HiShoppingCart />
            {totalCartItems > 0 && (
              <span className="cart-item-count">{totalCartItems}</span>
            )}
          </NavLink>

          <div className="button-header">
            {!loggedInUser ? (
              <>
                <Link to="/register" className="btn btn-outline-success">
                  Register
                </Link>
                <Link to="/login" className="btn btn-success">
                  Masuk
                </Link>
              </>
            ) : (
              <div className="info-title" ref={dropdownRef}>
                <div className="name">
                  {loggedInUser.username.charAt(0).toUpperCase()}
                </div>
                <h6 className="navbar-info-title">
                  {loggedInUser.username.charAt(0).toUpperCase() +
                    loggedInUser.username.slice(1)}
                </h6>
                <div className="dropdown">
                  <button
                    onClick={() => setIsDropdownOpen((prev) => !prev)}
                    aria-label="User menu"
                    aria-expanded={isDropdownOpen}
                  >
                    <HiChevronDown className="dropdown-button" />
                  </button>
                  {isDropdownOpen && (
                    <div className="dropdown-content">
                      <span className="dropdown-item">Profil</span>
                      <span className="dropdown-item">Pengaturan</span>
                      <button onClick={handleLogout} className="dropdown-item">
                        Keluar
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Mobile hamburger */}
          <div className="dropdown-side" ref={sideMenuRef}>
            <button
              onClick={() => setIsSideMenuOpen((prev) => !prev)}
              className="side"
              aria-label="Toggle navigation menu"
            >
              {isSideMenuOpen ? (
                <HiX className="burger-icon" />
              ) : (
                <HiMenu className="burger-icon" />
              )}
            </button>

            {isSideMenuOpen && (
              <div className="menu men-side">
                <NavLink to="/" end className="nav-link" onClick={closeSideMenu}>
                  Beranda
                </NavLink>
                <NavLink to="/cari-dokter" className="nav-link" onClick={closeSideMenu}>
                  Cari Dokter
                </NavLink>
                <NavLink to="/artikel" className="nav-link" onClick={closeSideMenu}>
                  Artikel
                </NavLink>
                <NavLink to="/toko" className="nav-link" onClick={closeSideMenu}>
                  Toko Obat
                </NavLink>
                {loggedInUser && (
                  <button onClick={handleLogout} className="keluar">
                    Keluar
                  </button>
                )}
                {!loggedInUser && (
                  <>
                    <NavLink to="/login" className="nav-link" onClick={closeSideMenu}>
                      Masuk
                    </NavLink>
                    <NavLink to="/register" className="nav-link" onClick={closeSideMenu}>
                      Register
                    </NavLink>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
