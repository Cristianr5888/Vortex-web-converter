import PropTypes from "prop-types";

const ImageConverterView = ({
  handleImageUpload,
  convertToWebp,
  saveFile,
  convertedImages,
}) => {
  return (
    <div>
      <h2>Convertir imágenes a WebP</h2>
      <input
        type="file"
        multiple
        onChange={handleImageUpload}
        accept="image/jpeg, image/png"
        style={{ display: "none" }}
      />
      <label
        htmlFor="fileInput"
        style={{
          marginLeft: "40%",
          padding: "10px",
          backgroundColor: "gray",
          borderRadius: "8px",
          cursor: "pointer",
          color: "white",
          fontFamily: "Verdana",
          fontWeight: "500",
        }}
      ></label>
      <button
        style={{
          marginLeft: "40%",
          marginTop: "16px",
          padding: "10px",
          borderRadius: "8px",
          color: "white",
          backgroundColor: "green",
          fontFamily: "verdana",
          fontSize: "18px",
        }}
        onClick={convertToWebp}
      >
        Convertir a .webp
      </button>

      {convertedImages.length > 0 && (
        <div>
          <h3>Imágenes convertidas:</h3>
          <ul>
            {convertedImages.map((image, index) => (
              <li key={index}>
                <span>{image.name}</span>
                <button onClick={() => saveFile(image)}>Guardar</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
ImageConverterView.propTypes = {
  handleImageUpload: PropTypes.func.isRequired, // Se espera una función
  convertToWebp: PropTypes.func.isRequired, // Se espera una función
  saveFile: PropTypes.func.isRequired, // Se espera una función
  convertedImages: PropTypes.arrayOf(
    // Se espera un array de objetos
    PropTypes.shape({
      name: PropTypes.string.isRequired, // El nombre es un string obligatorio
      webpData: PropTypes.string.isRequired, // webpData es un string obligatorio
    })
  ).isRequired,
};

export default ImageConverterView;
