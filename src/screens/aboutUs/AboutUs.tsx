import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import styles from "./AboutUs.module.css";

const AboutUs: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const currentLang = lang || i18n.language || "en";
  const isRTL = currentLang === "ar";
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    // Trigger animation on mount
    const timer = setTimeout(() => setContentVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.aboutUsPage} dir={isRTL ? "rtl" : "ltr"}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <h1
            className={`${styles.heroTitle} ${
              contentVisible ? styles.fadeInUp : ""
            }`}
          >
            {t("about.heroTitle")}
          </h1>
          <p
            className={`${styles.heroSubtitle} ${
              contentVisible ? styles.fadeInUp : ""
            }`}
            style={{ animationDelay: "0.2s" }}
          >
            {t("about.heroSubtitle")}
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className={styles.contentSection}>
        <div className={styles.container}>
          <div
            className={`${styles.contentWrapper} ${
              contentVisible ? styles.fadeIn : ""
            }`}
          >
            {/* Main Description */}
            <div className={styles.descriptionBlock}>
              <p className={styles.paragraph}>{t("about.paragraph1")}</p>
              <p className={styles.paragraph}>{t("about.paragraph2")}</p>
              <p className={styles.paragraph}>{t("about.paragraph3")}</p>
            </div>

            {/* Mission & Vision Section */}
            <div className={styles.mvSection}>
              <div className={styles.missionBlock}>
                <h2 className={styles.sectionTitle}>
                  {t("about.ourMissionTitle")}
                </h2>
                <div className={styles.divider}></div>
                <p className={styles.mvText}>{t("about.ourMissionText")}</p>
              </div>

              <div className={styles.visionBlock}>
                <h2 className={styles.sectionTitle}>
                  {t("about.ourVisionTitle")}
                </h2>
                <div className={styles.divider}></div>
                <p className={styles.mvText}>{t("about.ourVisionText")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
