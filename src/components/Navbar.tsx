import { useTranslation } from "react-i18next";
import { Link, useNavigate, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css"; // import CSS Module

function Navbar() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    const currentPath = location.pathname.replace(/^\/[a-z]{2}/, `/${lng}`);
    navigate(currentPath);
    document.body.dir = lng === "ar" ? "rtl" : "ltr";
    document.body.style.textAlign = lng === "ar" ? "right" : "left";
  };

  return (
    <div className={styles.nav}>
      <ul className={styles.ul}>
        <li className={styles.li}>
          <Link className={styles.link} to={`/${i18n.language}/home`}>
            {t("home")}
          </Link>
        </li>
        <li className={styles.li}>
          <Link className={styles.link} to={`/${i18n.language}/services`}>
            {t("services")}
          </Link>
        </li>
        <li className={styles.li}>
          <Link className={styles.link} to={`/${i18n.language}/software`}>
            {t("software")}
          </Link>
        </li>
        <li className={styles.li}>
          <Link to={`/${i18n.language}/login`} className={styles.link}>
            {t("login")}
          </Link>
        </li>
        <li className={styles.li}>
          <Link to={`/${i18n.language}/about-us`} className={styles.link}>
            {t("aboutUs")}
          </Link>
        </li>
        <li className={styles.li}>
          <Link to={`/${i18n.language}/contact-us`} className={styles.link}>
            {t("contactUs")}
          </Link>
        </li>
        <li className={styles.li}>
          <Link to={`/${i18n.language}/pricing`} className={styles.link}>
            {t("pricing")}
          </Link>
        </li>
        <li className={styles.li}>
          <Link to={`/${i18n.language}/newsletter`} className={styles.link}>
            {t("newsletter")}
          </Link>
        </li>
      </ul>
      <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={() => changeLanguage("en")}>
          {t("switchToEnglish")}
        </button>
        <button className={styles.button} onClick={() => changeLanguage("ar")}>
          {t("switchToArabic")}
        </button>
      </div>
    </div>
  );
}

export default Navbar;
