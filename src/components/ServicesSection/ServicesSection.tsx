import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./ServicesSection.module.css";

interface ServiceCard {
  id: string;
  icon: string;
}

const ServicesSection: React.FC = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const currentLang = lang || i18n.language || "en";

  const services: ServiceCard[] = [
    {
      id: "dataAnalysis",
      icon: "📊", // یا میتونید از آیکون‌های دیگه استفاده کنید
    },
    {
      id: "leadGeneration",
      icon: "👥",
    },
    {
      id: "technicalDemo",
      icon: "🖥️",
    },
    {
      id: "aiMatching",
      icon: "🤖",
    },
  ];

  const handleServiceClick = (serviceId: string) => {
    navigate(`/${currentLang}/services?service=${serviceId}`);
  };

  return (
    <section className={styles.servicesSection}>
      <div className={styles.container}>
        {/* <h2 className={styles.sectionTitle}>
          {t('servicesItem.title')}
        </h2> */}
        <div className={styles.servicesGrid}>
          {services.map((service, index) => (
            <div
              key={service.id}
              className={styles.serviceCard}
              onClick={() => handleServiceClick(service.id)}
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <div className={styles.iconWrapper}>
                <span className={styles.iconText}>{service.icon}</span>
              </div>
              <h3 className={styles.serviceTitle}>
                {t(`servicesItem.${service.id}.title`)}
              </h3>
              <p className={styles.serviceDescription}>
                {t(`servicesItem.${service.id}.description`)}
              </p>
              <div className={styles.arrowIcon}>
                <span>{currentLang === "ar" ? "←" : "→"}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
