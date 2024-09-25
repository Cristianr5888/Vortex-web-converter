import "./App.css";
import "./index.css";
import Converter from "./components/Convert.jsx";
import Navbar from "./components/Navbar.jsx";
import CopyR from "./components/Footer.jsx";
import Banner from "./components/Banner.jsx";
function App() {
  return (
    <div className="wrapper">
      <Navbar />

      <div className="main">
        <Banner />
        <section>
          <Converter />
        </section>
      </div>

      <CopyR />
    </div>
  );
}

export default App;
