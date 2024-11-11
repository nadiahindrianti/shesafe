import React, { useState } from "react";
import logo from "../assets/images/lg_ss.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Icon } from "@iconify/react";

function Navigation() {
  // State untuk menentukan apakah menu sedang aktif atau tidak
  const [isMenuActive, setIsMenuActive] = useState(false);
  const { isLoggedin, loading } = useSelector((state) => state.users);

  // Fungsi untuk toggle menu ketika ikon burger diklik
  const handleMenu = () => {
    setIsMenuActive(!isMenuActive);
  };

  return (
    <div className="navigation">
      <div className="navbar">
        {/* Logo */}
        <div className="logo">
          <Link to="/">
            {" "}
            <img className="img-fluid" src={logo} alt="SheSafe Logo" />
          </Link>
        </div>

        {/* Link navigasi */}
        <div
          className={`navbar-links ${isMenuActive ? "active" : ""}`}
          id="nav-links">
          <ul>
            <li>
              <a href="/#hero-section">Tentang SheSafe</a>
            </li>
            <li>
              <a href="/#guide-section">Bagaimana Cara Kerjanya?</a>
            </li>
            <li>
              <a href="/#advantages-section">Mengapa Pilih Kami?</a>
            </li>
            <li>
              <a href="/#contact-section">Bergabunglah Bersama Kami</a>
            </li>
          </ul>
        </div>

        {/* Tombol login */}
        <div>
          {!isLoggedin ? (
            <li className="sm-btn-secondary btn-join">
              <Link to="/login">Masuk</Link>
            </li>
          ) : (
            <li className="sm-btn-secondary btn-join">
              <Link to="/home">
                <Icon
                  icon="iconamoon:profile-light"
                  width="20"
                  height="20"
                  style={{ color: "#ffffff" }}
                />
              </Link>
            </li>
          )}
        </div>

        {/* Toggle button (burger menu) */}
        <div className="toggle-button" id="burger-menu" onClick={handleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
