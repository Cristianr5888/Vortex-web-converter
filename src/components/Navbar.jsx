import v_logo from "../assets/vortex_logo.webp";
import "../styles/Navbar.css";
import { useState } from "react";
import i18n from "../i18n";
import { useTranslation } from "react-i18next";
import usaFlag from "../assets/us.png";
import mxFlag from "../assets/mx.png";
import { Link } from "react-router-dom";
const Navbar = () => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <>
      <section className="Navbar-S">
        <div className="banner">
          <div className="logo-container">
            <img src={v_logo} alt="Logo" className="logo" />
          </div>
          <div className="banner-text">
            <h2
              style={{
                fontStyle: "italic",
              }}
            >
              Vortex - Img Converter
            </h2>
          </div>

          <div className="menu-icon" id="menu-icon" onClick={toggleMenu}>
            &#9776;
          </div>

          <div
            className={`banner-links ${isMenuOpen ? "show" : ""}`}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
              <Link
                to="/"
                style={{
                  padding: "10px 15px",
                  display: "block",
                  fontWeight: "bold",
                }}
              >
                {t("home")}
              </Link>
              <Link
                to="/about"
                style={{
                  padding: "10px 15px",
                  display: "block",
                  fontWeight: "bold",
                }}
              >
                {t("about")}
              </Link>
              <Link
                to="#"
                style={{
                  padding: "10px 15px",
                  display: "block",
                  fontWeight: "bold",
                }}
              >
                {t("png")}
              </Link>
            </div>

            <button
              onClick={() => changeLanguage("en")}
              style={{
                border: "none",
                background: "transparent",
                display: "flex",
                alignItems: "center",
              }}
            >
              <span
                className="span-navb"
                style={{
                  marginLeft: "10px",
                }}
              >
                English
              </span>
              <img
                src={usaFlag}
                alt="English"
                style={{
                  width: "35px",
                  marginRight: "5px",
                  marginLeft: "5px",
                }}
              />
            </button>
            <button
              onClick={() => changeLanguage("es")}
              style={{
                border: "none",
                background: "transparent",
                display: "flex",
                alignItems: "center",
                padding: "12px 0",
              }}
            >
              <span
                className="span-navb"
                style={{
                  marginLeft: "10px",
                }}
              >
                {t("language")}
              </span>
              <img
                src={mxFlag}
                alt="Español"
                style={{
                  width: "35px",
                  marginRight: "5px",
                  marginLeft: "5px",
                }}
              />
            </button>
            {/* <button
              onClick={() => changeLanguage("es")}
              style={{ border: "none", background: "transparent" }}
            >
              <span className="span-navb">{t("language")}</span>
              <img
                src={mxFlag}
                alt="Español"
                style={{ width: "35px", marginLeft: "5px" }}
              />
            </button> */}
          </div>
        </div>
      </section>
    </>
  );
};
export default Navbar;
