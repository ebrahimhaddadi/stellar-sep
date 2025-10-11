// src/components/Software.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';

function Software() {
  const { t } = useTranslation();
  return (
    <div>
      <h1>{t('software')}</h1>
      <p>{t('softwareDescription')}</p>
    </div>
  );
}

export default Software;
