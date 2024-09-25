import v_logo from "../assets/vortex_logo.webp";
import "../styles/Navbar.css";
import { useState } from "react";
import usaFlag from "../assets/us.png";
import mxFlag from "../assets/mx.png";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            <h2>Vortex Convert</h2>
          </div>

          <div className="menu-icon" id="menu-icon" onClick={toggleMenu}>
            &#9776;
          </div>

          <div className={`banner-links ${isMenuOpen ? "show" : ""}`}>
            <a href="">Inicio</a>
            <a href="">Acerca de</a>

            {/* Alinea a la derecha */}
            <button
              // onClick={() => changeLanguage("en")}
              style={{ border: "none", background: "transparent" }}
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
                  width: "25px",
                }}
              />
            </button>
            <button
              // onClick={() => changeLanguage("es")}
              style={{ border: "none", background: "transparent" }}
            >
              <span className="span-navb">Español</span>
              <img
                src={mxFlag}
                alt="Español"
                style={{ width: "25px", marginLeft: "5px" }}
              />
            </button>
          </div>
        </div>
      </section>
    </>
  );
};
export default Navbar;
