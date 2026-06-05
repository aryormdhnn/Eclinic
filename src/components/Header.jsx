import { NavLink, Link } from "react-router-dom";
import {
  HiChevronDown,
  HiMenu,
  HiX,
  HiHome,
  HiSearch,
  HiDocumentText,
} from "react-icons/hi";
import React, { useState, useRef, useEffect } from "react";
import "../css/header.css";
import Logo from "../assets/logo.png";
import "../globalstyle.css";

export const Header = () => {
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

  const navItems = [
    { to: "/", label: "Dashboard", icon: HiHome, end: true },
    { to: "/cari-dokter", label: "Dokter", icon: HiSearch },
    { to: "/artikel", label: "Artikel", icon: HiDocumentText },
  ];

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="menubar">
            <Link to="/" className="brand-link">
              <img src={Logo} alt="eClinic Logo" className="logo" />
              <span>eClinic</span>
            </Link>
            <div className="menu men-nav">
              {navItems.map(({ to, label, icon: Icon, end }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={end}
                  className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
                >
                  <Icon />
                  <span>{label}</span>
                </NavLink>
              ))}
            </div>
          </div>

          <div className="icons">

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
                  {navItems.map(({ to, label, icon: Icon, end }) => (
                    <NavLink
                      key={to}
                      to={to}
                      end={end}
                      className="nav-link"
                      onClick={closeSideMenu}
                    >
                      <Icon />
                      <span>{label}</span>
                    </NavLink>
                  ))}
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
        </div>
      </nav>
    </div>
  );
};

export default Header;
