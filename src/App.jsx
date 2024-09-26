import "./App.css";
import "./index.css";
import Home from "./home.jsx";

import Navbar from "./components/Navbar.jsx";
import CopyR from "./components/Footer.jsx";

import About from "./about.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <CopyR />
    </Router>
  );
}

export default App;
