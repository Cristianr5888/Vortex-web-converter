// ImageUploader.jsx
import { useState } from "react";

const ImageUploader = () => {
  const [images, setImages] = useState([]);
  const [convertedImages, setConvertedImages] = useState([]);

  // Función para manejar la selección de imágenes
  const handleImageUpload = (event) => {
    const files = event.target.files;
    const imagesArray = Array.from(files).map((file) => ({
      name: file.name.split(".")[0], // Guardamos solo el nombre sin la extensión
      file: file,
    }));
    setImages(imagesArray); // Guardamos los archivos seleccionados
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

  // Función para guardar el archivo
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
      <h2 style={{ paddingBottom: "15px", textAlign: "center" }}>
        Convertir imágenes a WebP
      </h2>
      <input
        id="fileInput"
        type="file"
        multiple
        onChange={handleImageUpload}
        accept="image/jpeg, image/png"
        style={{ display: "none" }} // Ocultamos el input
      />
      <label
        htmlFor="fileInput"
        style={{
          display: "inline-block",
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
        {images.length === 1
          ? "1 archivo seleccionado"
          : images.length > 1
          ? `${images.length} archivos seleccionados`
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
          fontFamily: "Verdana",
          fontSize: "18px",
        }}
        onClick={convertToWebp}
      >
        Convertir a .webp
      </button>

      {convertedImages.length > 0 && (
        <div style={{ marginLeft: "40%" }}>
          <h3>Imágenes convertidas:</h3>
          <ul>
            {convertedImages.map((image, index) => (
              <li key={index}>
                <span>{image.name + ".webp"}</span>
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
                  Guardar
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
