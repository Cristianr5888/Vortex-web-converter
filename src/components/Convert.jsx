import { useState } from "react";

const ImageConverter = () => {
  const [images, setImages] = useState([]);
  const [convertedImages, setConvertedImages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState(null); // Nueva variable de estado

  // Función para manejar la selección de imágenes
  const handleImageUpload = (event) => {
    const files = event.target.files;
    const imagesArray = Array.from(files).map((file) => ({
      name: file.name.split(".")[0], // Guardamos solo el nombre sin la extensión
      file: file,
    }));
    setImages(imagesArray); // Guardamos los archivos seleccionados
    setSelectedFiles(files); // Guardamos los archivos seleccionados para el botón personalizado
  };

  // Función para convertir las imágenes a .webp
  const convertToWebp = async () => {
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
          const webpImage = canvas.toDataURL("image/webp", 0.8); // Convertir a .webp

          webpImages.push({
            name: imageObj.name, // Usamos el nombre original
            webpData: webpImage,
          });

          if (webpImages.length === images.length) {
            setConvertedImages(webpImages); // Guardar las imágenes convertidas
          }
        };
      };

      reader.readAsDataURL(imageObj.file); // Leer la imagen como Data URL
    }
  };

  // Función para guardar el archivo usando la API de File System Access
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

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>CR VORTEX</h1>
      <h2 style={{ textAlign: "center" }}>Convertir Imágenes a WebP</h2>

      {/* Input de archivo oculto */}
      <input
        id="fileInput"
        type="file"
        multiple
        accept="image/jpeg, image/png"
        style={{ display: "none" }} // Ocultamos el input original
        onChange={handleImageUpload}
      />

      {/* Botón personalizado para subir archivos */}
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
      >
        {selectedFiles
          ? `${selectedFiles.length} archivos seleccionados`
          : "Elegir archivos"}
      </label>

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
        disabled={images.length === 0}
      >
        Convertir a WebP
      </button>

      <div style={{ alignItems: "center", marginLeft: "40%" }}>
        {convertedImages.length > 0 && <h3>Imágenes Convertidas:</h3>}
        {convertedImages.map((image, index) => (
          <div key={index}>
            <img
              src={image.webpData}
              alt={`converted-${index}`}
              style={{ width: "200px" }}
            />
            <button
              style={{
                padding: "8px",
                borderRadius: "8px",
                backgroundColor: "yellow",
                margin: "5px",
                fontFamily: "Verdana",
                fontWeight: "500",
              }}
              onClick={() => saveFile(image)}
            >
              Guardar imagen
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageConverter;
