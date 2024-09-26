import "../styles/Banner.css";
import { useTranslation } from "react-i18next";
function Banner() {
  const { t } = useTranslation();
  return (
    <>
      <div className="banner-principal">
        <div className="banner-interno">
          <p>{t("banner_h")}</p>
        </div>
      </div>
    </>
  );
}
export default Banner;
