// src/pages/Investor.tsx
import React from "react";
import { useTranslation } from "react-i18next";

const Investor: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div>
      <h1>{t("investorTitle")}</h1>{" "}
      {/* کلید جدید برای عنوان – به JSON اضافه کن */}
      <p>{t("investorDescription")}</p> {/* توضیحات – به JSON اضافه کن */}
      {/* محتوای خاص Investor مثل لیست فرصت‌های سرمایه‌گذاری، جستجو استارتاپ‌ها، یا فرم تماس */}
    </div>
  );
};

export default Investor;
