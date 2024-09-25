import { useState } from "react";
import "../styles/Convert.css";
import animation from "../assets/vortex_logo.webp";

const Converter = () => {
  const [images, setImages] = useState([]);
  const [convertedImages, setConvertedImages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isConverting, setIsConverting] = useState(false); // Nuevo estado para controlar la animación

  const handleImageUpload = (event) => {
    const files = event.target.files;
    const imagesArray = Array.from(files).map((file) => ({
      name: file.name.split(".")[0],
      file: file,
    }));
    setImages(imagesArray);
    setSelectedFiles(files);
  };

  const convertToWebp = async () => {
    if (images.length === 0) return;
    setIsConverting(true); // Iniciar la animación
    const webpImages = [];
    for (const imageObj of images) {
      const reader = new FileReader();

      reader.onloadend = async () => {
        const img = new Image();
        img.src = reader.result;

        img.onload = async () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          canvas.width = img.width;
          canvas.height = img.height;

          ctx.drawImage(img, 0, 0);
          const webpImage = canvas.toDataURL("image/webp", 0.8);

          webpImages.push({
            name: imageObj.name,
            webpData: webpImage,
          });

          if (webpImages.length === images.length) {
            setConvertedImages(webpImages);
            setIsConverting(false); // Detener la animación
          }
        };
      };

      reader.readAsDataURL(imageObj.file);
    }
  };

  const saveFile = async (image) => {
    try {
      const fileHandle = await window.showSaveFilePicker({
        suggestedName: `${image.name}.webp`,
        types: [
          {
            description: "WebP Image",
            accept: { "image/webp": [".webp"] },
          },
        ],
      });

      const writableStream = await fileHandle.createWritable();
      const response = await fetch(image.webpData);
      const blob = await response.blob();

      await writableStream.write(blob);
      await writableStream.close();
    } catch (error) {
      console.error("Error al guardar el archivo:", error);
    }
  };

  // let loadingClass = "loading-image";
  // if (isConverting) {
  //   loadingClass += " rotating"; // Añade la clase de rotación si está convirtiendo
  // }

  return (
    <div className="contenedor-principal">
      <h1 className="titulo">Convertir Imágenes a .WebP</h1>

      <input
        id="fileInput"
        type="file"
        multiple
        accept="image/jpeg, image/png"
        className="input-archivo"
        onChange={handleImageUpload}
      />

      <label htmlFor="fileInput" className="boton-archivo">
        {selectedFiles && selectedFiles.length === 1
          ? "1 archivo seleccionado"
          : selectedFiles && selectedFiles.length > 1
          ? `${selectedFiles.length} archivos seleccionados`
          : "Elegir archivos"}
      </label>

      <button
        className="boton-convertir"
        onClick={convertToWebp}
        disabled={images.length === 0}
      >
        Convertir a WebP
      </button>

      <div className="loading-container">
        <img
          src={animation} // Asegúrate de tener el path correcto a tu imagen
          alt="loading"
          className={`loading-image ${isConverting ? "rotating" : ""}`}
          // Mostrar solo cuando esté convirtiendo o ya haya imágenes convertidas
        />
      </div>

      <div className="contenedor-imagenes">
        {convertedImages.length > 0}
        {convertedImages.map((image, index) => (
          <div key={index}>
            <img
              src={image.webpData}
              alt={`converted-${index}`}
              className="imagen-convertida"
            />
            <button className="boton-guardar" onClick={() => saveFile(image)}>
              Guardar imagen
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Converter;
