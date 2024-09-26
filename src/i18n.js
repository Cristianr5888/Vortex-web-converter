// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Traducciones en varios idiomas
const resources = {
  es: {
    translation: {
      language: "Español",
      home: "Inicio",
      about: "Acerca de",
      png: "Convertir a png",
      text_copied: "Texto copiado en el portapapeles",
      // HOME
      title_h: "Convertir imagenes a .webP",
      sel_files: "Elegir archivos",
      one_file: "1 archivo seleccionado",
      more_files: "archivos seleccionados",
      conv_files: "Convertir a WebP",
      save_files: "Guardar imagen",

      banner_h:
        "Este conversor es completamente gratuito sin limitaciones de ningun\
            tipo, te permite convertir tus imagenes JPG o PNG a webp. Solo sube\
            tus imágenes, dale click a convertir, espera unos segundos y estarán\
            listas.",
    },
  },
  en: {
    translation: {
      language: "Spanish",
      home: "Home",
      about: "About",
      png: "Convert to png",
      text_copied: "Text copied to clipboard",
      // HOME
      sel_files: "Select files",
      one_file: "1 file selected",
      more_files: "files selected",
      conv_files: "Convert to WebP",
      save_files: "Save file",
      title_h: "Convert images to .webP",
      banner_h:
        "This converter is completely free with no limitations of any kind.\
       You can convert your JPG or PNG images to webP.\
        Just upload your images,click convert, wait a few seconds, and they will be ready.",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "es", // Idioma inicial
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
