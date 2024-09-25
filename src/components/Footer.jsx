import "../styles/Copy.css";
import crvancedd from "../assets/logo.png";
function CopyR() {
  return (
    <div>
      <div className="bar">
        <p>Copyright © 2024 </p>
        <div className="s">
          <p>Programmed by CRVANCED</p>
          <img className="img_copy" src={crvancedd} alt="" />
        </div>
      </div>
    </div>
  );
}

export default CopyR;
