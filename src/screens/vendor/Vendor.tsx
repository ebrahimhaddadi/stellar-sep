// src/pages/Vendor.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';

const Vendor: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div>
      <h1>{t('vendorTitle')}</h1> {/* کلید جدید برای عنوان – به JSON اضافه کن */}
      <p>{t('vendorDescription')}</p> {/* توضیحات – به JSON اضافه کن */}
      {/* محتوای خاص Vendor مثل فرم ساخت booth */}
    </div>
  );
};

export default Vendor;
