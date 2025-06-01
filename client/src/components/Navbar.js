// src/components/Navbar.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaBars, FaTimes, FaSignOutAlt  } from "react-icons/fa";
import '../style.css';
import logo from '../assets/logomobo.png';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('currentUser'));
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const logout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light fixed-top mask-custom shadow-0 mb-5">
        <div className="container d-flex align-items-center justify-content-between w-100">

          {/* Brand */}
          <a className="navbar-brand d-flex align-items-center" href="/#">
            <span className="mr-2">
              <img src={logo} alt="Logo" style={{ height: "60px", width: "auto" }} />
            </span>
            <span style={{ color: '#5e9693' }}>HOTEL</span>
            <span style={{ color: '#e4bd75' }}>SYNC</span>
          </a>

          {/* Desktop Nav Links */}
          <div className="d-none d-lg-block">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item"><a className="nav-link" href="/home">Home</a></li>
              <li className="nav-item"><a className="nav-link" href="#!">Features</a></li>
              <li className="nav-item"><a className="nav-link" href="#!">Portfolio</a></li>
              <li className="nav-item"><a className="nav-link" href="#!">Reference</a></li>
              <li className="nav-item"><a className="nav-link" href="#!">About</a></li>
              <li className="nav-item"><a className="nav-link" href="#!">Team</a></li>
              <li className="nav-item"><a className="nav-link" href="#!">Contact</a></li>
            </ul>
          </div>

          {/* User/Profile/Login */}
          <div className="d-none d-lg-flex align-items-center">
            {user ? (
              <div className="custom-dropdown" ref={dropdownRef}>
                <div
                  className="profile-link custom-toggle"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <FaUser className="icon" />
                  <span className="username">{user.name}</span>
                  <span className="dropdown-arrow">▼</span>
                </div>
                {dropdownOpen && (
                  <div className="dropdown-content-custom">
                    <a className="dropdown-item-custom" href="/reservations">Reserving</a>
                    <div className="dropdown-item-custom" onClick={logout}>Logout</div>
                  </div>
                )}
              </div>
            ) : (
              <ul className="navbar-nav d-flex flex-row gap-2">
                <li className="nav-item me-3 me-lg-2">
                  <a className="nav-link" href="/login"><i className="fas fa-sign-in-alt"></i></a>
                </li>
                <li className="nav-item me-3 me-lg-0">
                  <a className="nav-link" href="/register"><i className="fas fa-user-plus"></i></a>
                </li>
              </ul>
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className="d-lg-none">
            <FaBars className="icon" size={24} onClick={() => setMenuOpen(true)} />
          </div>
        </div>
      </nav>

      {/* Mobile Side Panel */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <div className="menu-header">
          <FaTimes className="close-icon" onClick={() => setMenuOpen(false)} />
        </div>
        <ul className="mobile-nav-links">
          <li><a href="/home">Home</a></li>
          <li><a href="#!">Features</a></li>
          <li><a href="#!">Portfolio</a></li>
          <li><a href="#!">Reference</a></li>
          <li><a href="#!">About</a></li>
          <li><a href="#!">Team</a></li>
          <li><a href="#!">Contact</a></li>
        </ul>
       {user && (
  <div className="logout-link" onClick={logout}>
    <FaSignOutAlt />
    <span>Logout</span>
  </div>
)}
      </div>
    </header>
  );
};

export default Navbar;
