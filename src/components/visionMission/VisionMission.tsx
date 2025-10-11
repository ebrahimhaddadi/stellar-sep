import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import styles from './VisionMission.module.css';

interface TypewriterTextProps {
  text: string;
  delay?: number;
  onComplete?: () => void;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({ text, delay = 50, onComplete }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay);
      return () => clearTimeout(timer);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, delay, onComplete]);

  return <span className={styles.typewriterText}>{displayedText}</span>;
};

const VisionMission: React.FC = () => {
  const { i18n } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const currentLang = lang || i18n.language || 'en';
  const isRTL = currentLang === 'ar';
  
  const [showVision, setShowVision] = useState(false);
  const [showMission, setShowMission] = useState(false);
  const [visionComplete, setVisionComplete] = useState(false);
  const [missionComplete, setMissionComplete] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const content = {
    en: {
      visionTitle: "Our Vision",
      visionText: "A permanent digital exhibition of various software products across different categories for searching, discovering, and selling software to organizations, investors, and startups in the GCC region.",
      missionTitle: "Our Mission",
      missionText: "Implementing an intelligent, localized marketplace platform to connect software vendors and buyers through demos, pre-sales, and AI-powered solution discovery."
    },
    ar: {
      visionTitle: "رؤيتنا",
      visionText: "نمایشگاه دیجیتال دائمی از انواع مختلف محصولات نرم‌افزاری در طبقه‌بندی‌های مختلف جهت جستجو، کشف و فروش نرم‌افزار برای سازمان‌ها، سرمایه‌گذاران و استارت‌آپ‌ها در حوزه کشورهای خلیج فارس.",
      missionTitle: "مأموريتنا",
      missionText: "پیاده‌سازی بستر خرید و فروش بومی و هوشمند برای اتصال فروشندگان و خریداران نرم‌افزار با استفاده از دمو، پیش‌فروش و یافتن راهکار مبتنی بر هوش مصنوعی."
    }
  };

  const currentContent = currentLang === 'ar' ? content.ar : content.en;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShowVision(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (visionComplete && !showMission) {
      const timer = setTimeout(() => {
        setShowMission(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [visionComplete, showMission]);

  return (
    <section className={styles.visionMissionSection} ref={sectionRef} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className={styles.container}>
        {/* Background Animation */}
        <div className={styles.backgroundAnimation}>
          <div className={styles.floatingShape1}></div>
          <div className={styles.floatingShape2}></div>
          <div className={styles.floatingShape3}></div>
        </div>

        {/* Vision Section */}
        <div className={`${styles.contentBlock} ${showVision ? styles.visible : ''}`}>
          <div className={styles.iconWrapper}>
            <span className={styles.icon}>👁️</span>
            <span className={styles.iconGlow}></span>
          </div>
          
          <h2 className={styles.title}>
            {showVision && (
              <TypewriterText 
                text={currentContent.visionTitle} 
                delay={100}
                onComplete={() => setVisionComplete(true)}
              />
            )}
          </h2>
          
          <div className={styles.divider}></div>
          
          <p className={styles.description}>
            {visionComplete && (
              <TypewriterText 
                text={currentContent.visionText} 
                delay={30}
              />
            )}
          </p>
        </div>

        {/* Mission Section */}
        <div className={`${styles.contentBlock} ${showMission ? styles.visible : ''}`}>
          <div className={styles.iconWrapper}>
            <span className={styles.icon}>🎯</span>
            <span className={styles.iconGlow}></span>
          </div>
          
          <h2 className={styles.title}>
            {showMission && (
              <TypewriterText 
                text={currentContent.missionTitle} 
                delay={100}
                onComplete={() => setMissionComplete(true)}
              />
            )}
          </h2>
          
          <div className={styles.divider}></div>
          
          <p className={styles.description}>
            {missionComplete && (
              <TypewriterText 
                text={currentContent.missionText} 
                delay={30}
              />
            )}
          </p>
        </div>

        {/* Decorative Elements */}
        <div className={styles.decorativeLines}>
          <svg className={styles.lineSvg} viewBox="0 0 1200 100">
            <path 
              d="M0,50 Q300,0 600,50 T1200,50" 
              fill="none" 
              stroke="url(#gradient)" 
              strokeWidth="2"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.2" />
                <stop offset="50%" stopColor="var(--accent)" stopOpacity="0.5" />
                <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.2" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default VisionMission;
