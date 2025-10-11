import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./Services.module.css";

const Services: React.FC = () => {
  const [searchParams] = useSearchParams();
  const serviceId = searchParams.get("service");
  const { t } = useTranslation();

  useEffect(() => {
    // Handle specific service display based on serviceId
    if (serviceId) {
      console.log("Selected service:", serviceId);
      // Add logic to show specific service details
    }
  }, [serviceId]);

  return (
    <div className={styles.container}>
      <h1>{t("services.title")}</h1>
      {serviceId && (
        <div className={styles.serviceDetail}>
          <h2>Service: {serviceId}</h2>
          {/* Add detailed service information here */}
        </div>
      )}
    </div>
  );
};

export default Services;
