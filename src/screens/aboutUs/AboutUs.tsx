import React from 'react';
import { useTranslation } from 'react-i18next';

const AboutUs: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="page-container">
      <h1>{t('aboutUs')}</h1>
      <p>{t('aboutUsDescription') || 'Learn more about our company and mission.'}</p> {/* placeholder */}
    </div>
  );
};

export default AboutUs;
