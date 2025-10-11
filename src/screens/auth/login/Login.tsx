import React from 'react';
import { useTranslation } from 'react-i18next';

const Login: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="page-container">
      <h1>{t('login')}</h1>
      <p>{t('loginDescription') || 'Please log in to access your account.'}</p> {/* placeholder – کلید description رو می‌تونید به JSON اضافه کنید */}
      {/* اینجا می‌تونید فرم لاگین اضافه کنید */}
    </div>
  );
};

export default Login;
