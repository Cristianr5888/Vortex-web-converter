import v_logo from "../assets/vortex_fb-removebg-preview.png";
import "../styles/Navbar.css";
import i18n from "../i18n";
import { useTranslation } from "react-i18next";
import usaFlag from "../assets/us.png";
import mxFlag from "../assets/mx.png";
import { Link } from "react-router-dom";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";

const Navbar = () => {
  const { t } = useTranslation();
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <AppBar position="sticky" elevation={0} className="nav-appbar">
      <Toolbar className="nav-toolbar">
        <Box className="nav-left">
          <img src={v_logo} alt="Logo" className="logo" />
          <Typography className="brand-title" variant="h6">
            Vortex Img Converter
          </Typography>
        </Box>

        <Box className="nav-links">
          <Button component={Link} to="/" className="nav-button">
            {t("home")}
          </Button>
          <Button component={Link} to="/about" className="nav-button">
            {t("about")}
          </Button>
          <Button component={Link} to="#" className="nav-button">
            {t("png")}
          </Button>
        </Box>

        <Box className="nav-actions">
          <Button
            className="lang-button"
            onClick={() => changeLanguage("en")}
            size="small"
          >
            <img src={usaFlag} alt="English" className="flag-icon" />
            English
          </Button>
          <Button
            className="lang-button"
            onClick={() => changeLanguage("es")}
            size="small"
          >
            <img src={mxFlag} alt="Español" className="flag-icon" />
            {t("language")}
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;
