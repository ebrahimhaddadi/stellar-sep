// src/pages/Home.tsx
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import { HiMiniXMark } from "react-icons/hi2";
import styles from "./Home.module.css";

import Logo from "../../assets/images/stellarsep-high-resolution-logo-grayscale.png";
import vendorImage from "../../assets/images/vendor.jpg";
import buyerImage from "../../assets/images/buyer.jpg";
import startupImage from "../../assets/images/startup.jpg";
import investorImage from "../../assets/images/investor.jpg";
import ServicesSection from "../../components/ServicesSection/ServicesSection";
import StatisticsSection from "../../components/StatisticsSection/StatisticsSection";
import Footer from "../../components/footer/Footer";
import VisionMission from "../../components/visionMission/VisionMission";
import SearchComponent from "../../components/SearchComponent/SearchComponent";

const Home: React.FC = () => {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>() || { lang: "en" }; // fallback به 'en' اگر lang undefined باشه

  // آرایه اسلایدها
  const slides = [
    { src: vendorImage, text: t("vendorText"), path: `/${lang}/vendor` },
    { src: buyerImage, text: t("buyerText"), path: `/${lang}/buyer` },
    { src: startupImage, text: t("startupText"), path: `/${lang}/startup` },
    { src: investorImage, text: t("investorText"), path: `/${lang}/investor` },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000); // هر 3 ثانیه

    return () => clearInterval(interval);
  }, [slides.length]);
  // حالت‌های مودال و فرم (ساده‌شده: فقط ایمیل)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // هندل تغییر ورودی ایمیل
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  // هندل ارسال فرم (فقط ایمیل - POST به JSON Server)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setErrorMessage(t("errorMessage"));
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }), // فقط ایمیل ذخیره می‌شه
      });
      if (response.ok) {
        setSuccessMessage(t("successMessage"));
        setErrorMessage("");
        setEmail(""); // پاک کردن فیلد
        setIsModalOpen(false); // بستن مودال
      } else {
        setErrorMessage(t("errorMessage"));
        setSuccessMessage("");
      }
    } catch (error) {
      setErrorMessage(t("errorMessage"));
      setSuccessMessage("");
    }
  };
  // حالت‌های جدید برای سرچ بار
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string | null>(null); // فیلتر فعال (Software یا Startup)

  // لیست نمونه برای فیلتر (جایگزین با داده‌های واقعی‌تون کنید، مثلاً از JSON Server)
  const items = [
    { id: 1, name: "App A", category: "Software" },
    { id: 2, name: "Startup B", category: "Startup" },
    { id: 3, name: "Tool C", category: "Software" },
    { id: 4, name: "Company D", category: "Startup" },
    // اضافه کنید...
  ];

  // تابع فیلتر لیست (بر اساس فیلتر و جستجو)
  const filteredItems = items.filter((item) => {
    const matchesFilter = !activeFilter || item.category === activeFilter;
    const matchesQuery = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesFilter && matchesQuery;
  });

  // هندل کلیک روی دکمه‌های فیلتر
  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter === activeFilter ? null : filter); // toggle اگر دوباره کلیک شد
  };

  // هندل جستجو
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // می‌تونید اینجا عملیات اضافی (مثل fetch از سرور) اضافه کنید
    console.log("Searching for:", searchQuery, "with filter:", activeFilter);
  };

  return (
    <div className={styles.container}>
      {/* کانتینر اسلایدر تمام‌عرض بدون border-radius */}
      <div className={styles.sliderContainer}>
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`${styles.slide} ${
              index === currentSlide ? styles.active : ""
            }`}
          >
            <img
              src={slide.src}
              alt={`Slide ${index + 1}`}
              className={styles.galleryImage}
            />
            {/* overlay برای متن و لینک روی عکس */}
            <div className={styles.overlay}>
              <p className={styles.imageText}>{slide.text}</p>
              <Link to={slide.path} className={styles.letsGo}>
                {t("letsGo")}
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.contentWrapper}>
        <div className={styles.textContent}>
          <p className={styles.text}>{t("IntroductionText")}</p>
        </div>
        {/* <img src={Logo} alt="StellarSep Logo" className={styles.logo} /> */}
        <div>
          <p>{t("AIPower")}</p>
        </div>
      </div>
      {/* باتن Lead Form */}
      {/* <button
        className={styles.leadFormButton}
        onClick={() => setIsModalOpen(true)}
      >
        {t("leadFormButton")}
      </button> */}

      {/* پیام‌های موفقیت/خطا (خارج از مودال برای سادگی) */}
      {successMessage && <p className={styles.success}>{successMessage}</p>}
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}

      {/* مودال (ساده‌شده: فقط ایمیل) */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>{t("leadFormTitle")}</h2>
            <form onSubmit={handleSubmit}>
              <label>{t("emailLabel")}:</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleInputChange}
                required
              />

              <button type="submit" className={styles.submitButton}>
                {t("submitButton")}
              </button>
            </form>
            <button
              className={styles.closeButton}
              onClick={() => setIsModalOpen(false)}
            >
              <HiMiniXMark />
            </button>
          </div>
        </div>
      )}

      {/* سرچ بار جدید */}
      <SearchComponent />

      {/* لیست نمونه برای نمایش نتایج فیلتر (اختیاری - جایگزین کنید) */}
      {/* <div className={styles.resultsList}>
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div key={item.id} className={styles.resultItem}>
              {item.name} ({item.category})
            </div>
          ))
        ) : (
          <p>{t("noResults")}</p>
        )}
      </div> */}
      <ServicesSection />
      <StatisticsSection />
      <VisionMission />
    </div>
  );
};

export default Home;
