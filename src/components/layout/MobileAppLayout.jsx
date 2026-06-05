import React from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import {
  FaHome,
  FaCalendarAlt,
  FaRegCommentDots,
  FaRegUser,
} from 'react-icons/fa';
import '../../css/home.css';

const MobileAppLayout = ({ children }) => {
  const location = useLocation();

  // Show bottom navigation bar only for core main pages
  const mainPaths = ['/', '/cari-dokter', '/chat', '/login'];
  const showNav = mainPaths.includes(location.pathname);

  return (
    <div className="mobile-home-page">
      <div className="phone-home" style={{ display: 'flex', flexDirection: 'column' }}>
        {/* Mock Status Bar */}
        <div className="status-row" aria-hidden="true" style={{ flexShrink: 0 }}>
          <span>9:41</span>
          <div className="status-icons">
            <span className="signal-bars">
              <i />
              <i />
              <i />
            </span>
            <span className="wifi-icon" />
            <span className="battery-icon" />
          </div>
        </div>

        {/* Scrollable page body content */}
        <div 
          className="app-main-content" 
          style={{ 
            flex: '1 1 auto', 
            overflowY: 'auto', 
            overflowX: 'hidden',
            paddingBottom: showNav ? '24px' : '0px'
          }}
        >
          {children}
        </div>

        {/* Global Bottom Navigation Bar */}
        {showNav && (
          <nav className="bottom-app-nav" aria-label="Navigasi utama">
            <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
              <FaHome />
              <span>Home</span>
            </NavLink>
            <NavLink to="/cari-dokter" className={({ isActive }) => (isActive ? 'active' : '')}>
              <FaCalendarAlt />
            </NavLink>
            <NavLink to="/chat" className={({ isActive }) => (isActive ? 'active' : '')}>
              <FaRegCommentDots />
            </NavLink>
            <NavLink to="/login" className={({ isActive }) => (isActive ? 'active' : '')}>
              <FaRegUser />
            </NavLink>
          </nav>
        )}
      </div>
    </div>
  );
};

export default MobileAppLayout;
