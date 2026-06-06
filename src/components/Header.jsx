import { NavLink, Link } from "react-router-dom";
import {
  HiMenu,
  HiX,
  HiHome,
  HiSearch,
  HiDocumentText,
  HiLogout,
  HiChevronDown,
} from "react-icons/hi";
import React, { useState, useRef, useEffect } from "react";
import "../css/header.css";
import Logo from "../assets/logo.png";

export const Header = () => {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const dropdownRef = useRef(null);
  const mobileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setIsDropdownOpen(false);
      if (mobileRef.current && !mobileRef.current.contains(e.target))
        setIsMobileOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    window.location.reload();
  };

  const navItems = [
    { to: "/", label: "Beranda", icon: HiHome, end: true },
    { to: "/cari-dokter", label: "Tanya Dokter", icon: HiSearch },
    { to: "/artikel", label: "Artikel", icon: HiDocumentText },
  ];

  const userInitial = loggedInUser
    ? loggedInUser.username.charAt(0).toUpperCase()
    : "";
  const userName = loggedInUser
    ? loggedInUser.username.charAt(0).toUpperCase() +
      loggedInUser.username.slice(1)
    : "";

  return (
    <header className="nav-root">
      <nav className="nav-bar">
        {/* Brand */}
        <Link to="/" className="nav-brand">
          <img src={Logo} alt="eClinic" className="nav-logo" />
          <span className="nav-brand-name">eClinic</span>
        </Link>

        {/* Desktop Links */}
        <ul className="nav-links">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={end}
                className={({ isActive }) =>
                  "nav-item" + (isActive ? " nav-item--active" : "")
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Desktop Right */}
        <div className="nav-right">
          {!loggedInUser ? (
            <div className="nav-auth">
              <Link to="/login" className="nav-btn-ghost">Masuk</Link>
              <Link to="/register" className="nav-btn-primary">Daftar Gratis</Link>
            </div>
          ) : (
            <div className="nav-user" ref={dropdownRef}>
              <button
                className="nav-user-btn"
                onClick={() => setIsDropdownOpen((p) => !p)}
                aria-expanded={isDropdownOpen}
                aria-label="User menu"
              >
                <span className="nav-avatar">{userInitial}</span>
                <span className="nav-username">{userName}</span>
                <HiChevronDown
                  className={`nav-chevron${isDropdownOpen ? " nav-chevron--open" : ""}`}
                />
              </button>

              {isDropdownOpen && (
                <div className="nav-dropdown">
                  <div className="nav-dropdown-header">
                    <span className="nav-avatar nav-avatar--lg">{userInitial}</span>
                    <div>
                      <p className="nav-dropdown-name">{userName}</p>
                      <p className="nav-dropdown-role">Pengguna</p>
                    </div>
                  </div>
                  <div className="nav-dropdown-divider" />
                  <button onClick={handleLogout} className="nav-dropdown-item nav-dropdown-item--danger">
                    <HiLogout />
                    Keluar
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Hamburger */}
          <button
            className="nav-hamburger"
            onClick={() => setIsMobileOpen((p) => !p)}
            aria-label="Toggle menu"
          >
            {isMobileOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="nav-mobile-overlay" onClick={() => setIsMobileOpen(false)}>
          <div
            className="nav-mobile-drawer"
            ref={mobileRef}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="nav-mobile-brand">
              <img src={Logo} alt="eClinic" className="nav-logo" />
              <span className="nav-brand-name">eClinic</span>
            </div>
            <ul className="nav-mobile-links">
              {navItems.map(({ to, label, icon: Icon, end }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={end}
                    className={({ isActive }) =>
                      "nav-mobile-item" + (isActive ? " nav-mobile-item--active" : "")
                    }
                    onClick={() => setIsMobileOpen(false)}
                  >
                    <Icon className="nav-mobile-icon" />
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <div className="nav-mobile-footer">
              {!loggedInUser ? (
                <>
                  <Link to="/login" className="nav-btn-ghost nav-btn--full" onClick={() => setIsMobileOpen(false)}>Masuk</Link>
                  <Link to="/register" className="nav-btn-primary nav-btn--full" onClick={() => setIsMobileOpen(false)}>Daftar Gratis</Link>
                </>
              ) : (
                <button onClick={handleLogout} className="nav-btn-danger nav-btn--full">
                  <HiLogout /> Keluar
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
