// src/pages/Buyer.tsx (مشابه برای بقیه)
import React from 'react';
import { useTranslation } from 'react-i18next';

const Buyer: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div>
      <h1>{t('buyerTitle')}</h1>
      <p>{t('buyerDescription')}</p>
      {/* محتوای خاص Buyer مثل جستجو محصولات */}
    </div>
  );
};

export default Buyer;
