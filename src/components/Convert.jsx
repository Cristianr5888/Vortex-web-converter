import JSZip from "jszip";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { saveAs } from "file-saver";
import animation from "../assets/vortexLogoSE.png";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

const Converter = () => {
  const { t } = useTranslation();
  const [images, setImages] = useState([]);
  const [convertedImages, setConvertedImages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isConverting, setIsConverting] = useState(false);

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
    setIsConverting(true);

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
            setIsConverting(false);
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

  const downloadAllAsZip = async () => {
    const zip = new JSZip();
    for (const image of convertedImages) {
      const response = await fetch(image.webpData);
      const blob = await response.blob();
      zip.file(`${image.name}.webp`, blob);
    }
    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "converted_images.zip");
  };

  const selectedLabel =
    selectedFiles && selectedFiles.length
      ? selectedFiles.length === 1
        ? t("one_file")
        : `${selectedFiles.length} ${t("more_files")}`
      : t("sel_files");

  return (
    <Box className="contenedor-principal" component="main">
      <Paper className="converter-card" elevation={8}>
        <Stack spacing={3} alignItems="center">
          <Typography variant="h2" className="titulo">
            {t("title_h")}
          </Typography>
          <Typography className="subtitle" variant="body1" textAlign="center">
            {t("banner_h")}
          </Typography>
          <Typography className="subtitle" variant="body1" textAlign="center">
            {t("banner_h2")}
          </Typography>

          <Box className="file-group">
            <input
              id="fileInput"
              type="file"
              multiple
              accept="image/jpeg, image/png"
              className="input-archivo"
              onChange={handleImageUpload}
            />
            <label htmlFor="fileInput" className="boton-archivo">
              {selectedLabel}
            </label>
          </Box>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            alignItems="center"
          >
            <Button
              className="boton-convertir"
              variant="contained"
              onClick={convertToWebp}
              disabled={images.length === 0 || isConverting}
            >
              {t("conv_files")}
            </Button>
            {convertedImages.length > 1 && (
              <Button
                className="boton-zip"
                variant="outlined"
                onClick={downloadAllAsZip}
              >
                {t("zip")}
              </Button>
            )}
          </Stack>

          <Box className="loading-container">
            {isConverting && (
              <Stack direction="row" spacing={2} alignItems="center">
                <img
                  src={animation}
                  alt="converting"
                  className="loading-image rotating"
                />
                <CircularProgress color="secondary" />
                <Typography>Convirtiendo imágenes...</Typography>
              </Stack>
            )}
          </Box>
        </Stack>
      </Paper>

      <Grid container spacing={3} className="contenedor-imagenes" sx={{ marginTop: "20px" }}>
        {convertedImages.map((image, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Paper className="converted-card" elevation={6}>
              <img
                src={image.webpData}
                alt={`converted-${index}`}
                className="imagen-convertida"
              />
              <Button
                className="boton-guardar"
                variant="contained"
                onClick={() => saveFile(image)}
              >
                {t("save_files")}
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Converter;
