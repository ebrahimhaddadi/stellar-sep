// src/App.tsx
import React, { useState, useEffect } from "react";
import { darken, lighten, getComplementary } from "./utils/colorUtils"; // فرض بر اینه که این فایل وجود داره
import Navbar from "./components/Navbar";
import AppRoutes from "./routers/AppRouter";
import "./App.css"; // استایل‌های جهانی

function App() {
  const [primaryColor, setPrimaryColor] = useState("#5b099b"); // پیش‌فرض جدید: بنفش اصلی

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--primary", primaryColor); // #5b099b
    root.style.setProperty("--secondary", "#5d0085"); // رنگ پیشنهادی تیره‌تر (ثابت، اما می‌تونید darken(primaryColor, 0.3) کنید اگر بخواید دینامیک باشه)
    root.style.setProperty("--accent", getComplementary(primaryColor)); // complementary محاسبه‌شده (مثلاً برای بنفش، چیزی مثل #9bf509)
    root.style.setProperty("--background", "#fbf9f9"); // رنگ پیشنهادی روشن برای background
    root.style.setProperty("--text", "#333"); // متن تیره برای background روشن
    root.style.setProperty("--text-light", "#fff"); // متن روشن برای background تیره
  }, [primaryColor]);

  return (
    <div className="App">
      <div style={{ position: "relative", width: "100%" }}>
        <Navbar />
      </div>
      <main className="main-content">
        <AppRoutes />
      </main>
    </div>
  );
}

export default App;
