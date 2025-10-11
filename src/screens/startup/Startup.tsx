// src/pages/Startup.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';

const Startup: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div>
      <h1>{t('startupTitle')}</h1> {/* کلید جدید برای عنوان – به JSON اضافه کن */}
      <p>{t('startupDescription')}</p> {/* توضیحات – به JSON اضافه کن */}
      {/* محتوای خاص Startup مثل نمایش محصول، هال استارتاپ‌ها، یا فرم ثبت‌نام */}
    </div>
  );
};

export default Startup;
