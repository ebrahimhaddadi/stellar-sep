import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../screens/home/Home";
import Services from "../screens/services/Service";
import Software from "../screens/softwares/Softwares";
import Login from "../screens/auth/login/Login"; // جدید
import AboutUs from "../screens/aboutUs/AboutUs"; // جدید
import ContactUs from "../screens/contactUs/ContactUs"; // جدید
import Pricing from "../screens/pricing/Pricing"; // جدید
import Newsletter from "../screens/newsletter/Newsletter"; // جدید
import Startup from "../screens/startup/Startup";
import Investor from "../screens/investor/Investor";
import Vendor from "../screens/vendor/Vendor";
import Buyer from "../screens/buyer/Buyer";
import BrowsePage from "../screens/browse/Browse";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/en/home" replace />} />{" "}
      {/* ریدایرکت ریشه به زبان پیش‌فرض */}
      {/* روت‌های با پیشوند زبان */}
      <Route path="/:lang/home" element={<Home />} />
      <Route path="/:lang/services" element={<Services />} />
      <Route path="/:lang/software" element={<Software />} />
      {/* روت‌های جدید */}
      <Route path="/:lang/login" element={<Login />} />
      <Route path="/:lang/about-us" element={<AboutUs />} />{" "}
      {/* dash برای URL بهتر */}
      <Route path="/:lang/contact-us" element={<ContactUs />} />
      <Route path="/:lang/pricing" element={<Pricing />} />
      <Route path="/:lang/newsletter" element={<Newsletter />} />
      <Route path="/:lang/startup" element={<Startup />} />
      <Route path="/:lang/investor" element={<Investor />} />
      <Route path="/:lang/vendor" element={<Vendor />} />
      <Route path="/:lang/buyer" element={<Buyer />} />
      <Route path="/:lang/browse" element={<BrowsePage />} />
      {/* اگر مسیر نامعتبر بود، به home ریدایرکت کن */}
      <Route path="*" element={<Navigate to="/en/home" replace />} />
    </Routes>
  );
};

export default AppRoutes;
