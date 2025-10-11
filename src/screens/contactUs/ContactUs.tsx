import React from 'react';
import { useTranslation } from 'react-i18next';

const ContactUs: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="page-container">
      <h1>{t('contactUs')}</h1>
      <p>{t('contactUsDescription') || 'Get in touch with us for any inquiries.'}</p> {/* placeholder – می‌تونید فرم تماس اضافه کنید */}
    </div>
  );
};

export default ContactUs;
