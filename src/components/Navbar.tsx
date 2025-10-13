// import { useState, useRef, useEffect } from "react";
// import { useTranslation } from "react-i18next";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import {
//   FaStore,
//   FaShoppingCart,
//   FaRocket,
//   FaBriefcase,
//   FaChevronDown,
//   FaHome,
//   FaCogs,
//   FaLaptopCode,
//   FaSignInAlt,
//   FaInfoCircle,
//   FaPhone,
//   FaTags,
//   FaNewspaper,
//   FaGlobe,
//   FaLanguage,
// } from "react-icons/fa";
// import styles from "./Navbar.module.css";

// function Navbar() {
//   const { t, i18n } = useTranslation();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [showServicesDropdown, setShowServicesDropdown] = useState(false);
//   const dropdownRef = useRef<HTMLLIElement>(null);
//   const timeoutRef = useRef<number | null>(null);

//   const lang = i18n.language;

//   const servicesSubMenu = [
//     {
//       text: t("vendor"),
//       path: `/${lang}/vendor`,
//       icon: <FaStore />,
//       color: "#667eea",
//     },
//     {
//       text: t("buyer"),
//       path: `/${lang}/buyer`,
//       icon: <FaShoppingCart />,
//       color: "#764ba2",
//     },
//     {
//       text: t("startup"),
//       path: `/${lang}/startup`,
//       icon: <FaRocket />,
//       color: "#f59e0b",
//     },
//     {
//       text: t("investor"),
//       path: `/${lang}/investor`,
//       icon: <FaBriefcase />,
//       color: "#10b981",
//     },
//   ];

//   const navLinks = [
//     { path: `/${lang}/home`, text: t("home"), icon: <FaHome /> },
//     {
//       path: `/${lang}/services`,
//       text: t("services"),
//       icon: <FaCogs />,
//       hasDropdown: true,
//     },
//     { path: `/${lang}/software`, text: t("software"), icon: <FaLaptopCode /> },
//     { path: `/${lang}/login`, text: t("login"), icon: <FaSignInAlt /> },
//     { path: `/${lang}/about-us`, text: t("aboutUs"), icon: <FaInfoCircle /> },
//     { path: `/${lang}/contact-us`, text: t("contactUs"), icon: <FaPhone /> },
//     { path: `/${lang}/pricing`, text: t("pricing"), icon: <FaTags /> },
//     {
//       path: `/${lang}/newsletter`,
//       text: t("newsletter"),
//       icon: <FaNewspaper />,
//     },
//   ];

//   const changeLanguage = (lng: string) => {
//     i18n.changeLanguage(lng);
//     const currentPath = location.pathname.replace(/^\/[a-z]{2}/, `/${lng}`);
//     navigate(currentPath);
//     document.body.dir = lng === "ar" ? "rtl" : "ltr";
//     document.body.style.textAlign = lng === "ar" ? "right" : "left";
//   };

//   const handleMouseEnter = () => {
//     if (timeoutRef.current) {
//       clearTimeout(timeoutRef.current);
//     }
//     setShowServicesDropdown(true);
//   };

//   const handleMouseLeave = () => {
//     timeoutRef.current = setTimeout(() => {
//       setShowServicesDropdown(false);
//     }, 200);
//   };

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target as Node)
//       ) {
//         setShowServicesDropdown(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//       if (timeoutRef.current) {
//         clearTimeout(timeoutRef.current);
//       }
//     };
//   }, []);

//   return (
//     <nav className={styles.nav}>
//       <ul className={styles.ul}>
//         {navLinks.map((link, index) => (
//           <li
//             key={index}
//             className={`${styles.li} ${
//               link.hasDropdown ? styles.dropdown : ""
//             }`}
//             ref={link.hasDropdown ? dropdownRef : null}
//             onMouseEnter={link.hasDropdown ? handleMouseEnter : undefined}
//             onMouseLeave={link.hasDropdown ? handleMouseLeave : undefined}
//           >
//             <Link
//               className={`${styles.link} ${
//                 link.hasDropdown ? styles.dropdownToggle : ""
//               }`}
//               to={link.path}
//             >
//               <span className={styles.linkIcon}>{link.icon}</span>
//               <span className={styles.linkText}>{link.text}</span>
//               {link.hasDropdown && (
//                 <FaChevronDown className={styles.dropdownArrow} />
//               )}
//             </Link>

//             {link.hasDropdown && (
//               <div
//                 className={`${styles.dropdownMenu} ${
//                   showServicesDropdown ? styles.show : ""
//                 }`}
//               >
//                 <div className={styles.dropdownHeader}>
//                   {/* <span className={styles.dropdownTitle}>{t("services")}</span> */}
//                 </div>
//                 <div className={styles.dropdownContent}>
//                   {servicesSubMenu.map((item, subIndex) => (
//                     <Link
//                       key={subIndex}
//                       to={item.path}
//                       className={styles.dropdownItem}
//                       onClick={() => setShowServicesDropdown(false)}
//                       style={
//                         { "--item-color": item.color } as React.CSSProperties
//                       }
//                     >
//                       <span className={styles.dropdownIcon}>{item.icon}</span>
//                       <div className={styles.dropdownTextWrapper}>
//                         <span className={styles.dropdownText}>{item.text}</span>
//                       </div>
//                     </Link>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </li>
//         ))}
//       </ul>

//       <div className={styles.buttonContainer}>
//         <button
//           className={`${styles.button} ${lang === "en" ? styles.active : ""}`}
//           onClick={() => changeLanguage("en")}
//         >
//           <FaGlobe className={styles.buttonIcon} />
//           <span>English</span>
//         </button>
//         <button
//           className={`${styles.button} ${lang === "ar" ? styles.active : ""}`}
//           onClick={() => changeLanguage("ar")}
//         >
//           <FaLanguage className={styles.buttonIcon} />
//           <span>{t("switchToArabic")}</span>
//         </button>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;

import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FaStore,
  FaShoppingCart,
  FaRocket,
  FaBriefcase,
  FaChevronDown,
  FaGlobe,
} from "react-icons/fa";
import styles from "./Navbar.module.css";
import logoImage from "../assets/images/logo3.png";

function Navbar() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [showServicesDropdown, setShowServicesDropdown] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const servicesTimeoutRef = useRef<number | null>(null);
  const langTimeoutRef = useRef<number | null>(null);

  const lang = i18n.language;

  const servicesSubMenu = [
    { text: "Vendor", path: `/${lang}/vendor`, icon: <FaStore /> },
    { text: "Buyer", path: `/${lang}/buyer`, icon: <FaShoppingCart /> },
    { text: "Startup", path: `/${lang}/startup`, icon: <FaRocket /> },
    { text: "Investor", path: `/${lang}/investor`, icon: <FaBriefcase /> },
  ];

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    const currentPath = location.pathname.replace(/^\/[a-z]{2}/, `/${lng}`);
    navigate(currentPath);
    document.body.dir = lng === "ar" ? "rtl" : "ltr";
    setShowLangDropdown(false);
  };

  // Services dropdown handlers
  const handleServicesMouseEnter = () => {
    if (servicesTimeoutRef.current) {
      clearTimeout(servicesTimeoutRef.current);
    }
    setShowServicesDropdown(true);
  };

  const handleServicesMouseLeave = () => {
    servicesTimeoutRef.current = window.setTimeout(() => {
      setShowServicesDropdown(false);
    }, 200);
  };

  // Language dropdown handlers
  const handleLangMouseEnter = () => {
    if (langTimeoutRef.current) {
      clearTimeout(langTimeoutRef.current);
    }
    setShowLangDropdown(true);
  };

  const handleLangMouseLeave = () => {
    langTimeoutRef.current = window.setTimeout(() => {
      setShowLangDropdown(false);
    }, 200);
  };

  useEffect(() => {
    return () => {
      if (servicesTimeoutRef.current) {
        clearTimeout(servicesTimeoutRef.current);
      }
      if (langTimeoutRef.current) {
        clearTimeout(langTimeoutRef.current);
      }
    };
  }, []);

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        {/* Logo Section */}

        {/* Center Navigation */}
        <div className={styles.navCenter}>
          <Link to={`/${lang}/home`} className={styles.logoSection}>
            <img src={logoImage} alt="StellarSep" className={styles.logo} />
          </Link>
          {/* Services Dropdown */}
          <div
            className={styles.dropdown}
            onMouseEnter={handleServicesMouseEnter}
            onMouseLeave={handleServicesMouseLeave}
          >
            <button className={styles.navLink}>
              {t("services")}
              <FaChevronDown className={styles.dropdownIcon} />
            </button>
            {showServicesDropdown && (
              <div className={styles.dropdownMenu}>
                {servicesSubMenu.map((item, index) => (
                  <Link
                    key={index}
                    to={item.path}
                    className={styles.dropdownItem}
                    onClick={() => setShowServicesDropdown(false)}
                  >
                    <span className={styles.itemIcon}>{item.icon}</span>
                    <span>{item.text}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* <Link to={`/${lang}/software`} className={styles.navLink}>
            {t("software")}
          </Link> */}

          <Link to={`/${lang}/pricing`} className={styles.navLink}>
            {t("pricing")}
          </Link>
          <Link to={`/${lang}/newsletter`} className={styles.navLink}>
            {t("newsletter")}
          </Link>

          <Link to={`/${lang}/about-us`} className={styles.navLink}>
            {t("aboutUs")}
          </Link>

          <Link to={`/${lang}/contact-us`} className={styles.navLink}>
            {t("contactUs")}
          </Link>
        </div>

        {/* Right Section */}
        <div className={styles.navRight}>
          {/* Language Selector */}

          {/* Login Button */}
          <Link to={`/${lang}/login`} className={styles.loginButton}>
            {t("login")}
          </Link>

          {/* CTA Button */}
          <Link to={`/${lang}/login`} className={styles.loginButton}>
            {t("register")}
          </Link>
          <div
            className={styles.langDropdown}
            onMouseEnter={handleLangMouseEnter}
            onMouseLeave={handleLangMouseLeave}
          >
            <button className={styles.langButton}>
              <FaGlobe />
              <span>{lang === "en" ? "EN" : "AR"}</span>
              <FaChevronDown className={styles.dropdownIcon} />
            </button>
            {showLangDropdown && (
              <div className={styles.langMenu}>
                <button
                  onClick={() => changeLanguage("en")}
                  className={`${styles.langOption} ${
                    lang === "en" ? styles.active : ""
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => changeLanguage("ar")}
                  className={`${styles.langOption} ${
                    lang === "ar" ? styles.active : ""
                  }`}
                >
                  العربية
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
