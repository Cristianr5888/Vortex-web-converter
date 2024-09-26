import { useTranslation } from "react-i18next";
import "./styles/about.css";
import logo_a from "./assets/vortex_logo.webp";
function About() {
  const { t } = useTranslation();
  return (
    <>
      <div className="banner-principal">
        <h1 className="about-h1" style={{ color: "white" }}>
          {t("about")}
        </h1>
      </div>
      <div className="contenedor-principal">
        <div className="contenedor-imagenes about">
          <h1 className="titulo">Vortex image converter</h1>
          <p className="pgraph-a">
            Esta página fue creada por Cristian Jiménez como proyecto personal y
            como herramienta para el desarrollo web.
          </p>
          <div className="logo-container_a">
            <img src={logo_a} alt="vortex-logo" />
          </div>
          <h1 className="titulo">¿Por qué un convertidor?</h1>
          <p className="pgraph-a">
            Un convertidor de imágenes es una herramienta que se suele usar para
            convertir múltiples imágenes a otros formatos, en el caso de JPG o
            PNG a .webP el formato webP hace que las imágenes sean más ligeras y
            no pierdan calidad
          </p>
          <h1 className="titulo">¿Cómo surgió la idea?</h1>
          <p className="pgraph-a">
            Se suelen usar conversores gratuitos para convertir tus imágenes a
            otros formatos, sin embargo muchos de estos tienen ciertas
            restricciones como número limitado de imágenes por día o 5 archivos
            a la vez, si ya eres desarrollador web ¿por qué no hacer un
            conversor para tu propio uso?
          </p>
        </div>
      </div>
    </>
  );
}

export default About;
