import React from 'react';
import { useTranslation } from 'react-i18next';

const Newsletter: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="page-container">
      <h1>{t('newsletter')}</h1>
      <p>{t('newsletterDescription') || 'Subscribe to our newsletter for updates.'}</p> {/* placeholder – می‌تونید فرم سابسکرایب اضافه کنید */}
    </div>
  );
};

export default Newsletter;
