import "./App.css";
import "./index.css";
import Home from "./home.jsx";
import Navbar from "./components/Navbar.jsx";
import CopyR from "./components/Footer.jsx";
import About from "./about.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#ae8cff",
    },
    secondary: {
      main: "#f7efff",
    },
    background: {
      default: "#f8f5ff",
      paper: "#ffffff",
    },
    text: {
      primary: "#2f1b47",
      secondary: "#6b46c1",
    },
  },
  typography: {
    fontFamily: ["Inter", "Roboto", "Arial", "sans-serif"].join(", "),
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <CopyR />
      </Router>
    </ThemeProvider>
  );
}

export default App;
