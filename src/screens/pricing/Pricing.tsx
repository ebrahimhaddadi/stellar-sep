import React from 'react';
import { useTranslation } from 'react-i18next';

const Pricing: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="page-container">
      <h1>{t('pricing')}</h1>
      <p>{t('pricingDescription') || 'View our pricing plans and options.'}</p> {/* placeholder */}
    </div>
  );
};

export default Pricing;
