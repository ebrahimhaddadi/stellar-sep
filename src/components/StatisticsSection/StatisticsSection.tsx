import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './StatisticsSection.module.css';

interface StatItem {
  id: string;
  value: number;
  suffix?: string;
  icon: string;
}

const StatisticsSection: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [animatedValues, setAnimatedValues] = useState<{ [key: string]: number }>({});

  const stats: StatItem[] = [
    {
      id: 'activeUsers',
      value: 5000,
      suffix: '+',
      icon: '👥'
    },
    {
      id: 'successfulProjects',
      value: 1200,
      suffix: '+',
      icon: '🚀'
    },
    {
      id: 'satisfactionRate',
      value: 98,
      suffix: '%',
      icon: '⭐'
    },
    {
      id: 'globalPartners',
      value: 150,
      suffix: '+',
      icon: '🌍'
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('statistics-section');
      if (section) {
        const rect = section.getBoundingClientRect();
        const isInViewport = rect.top <= window.innerHeight && rect.bottom >= 0;
        if (isInViewport && !isVisible) {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on mount

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible]);

  useEffect(() => {
    if (isVisible) {
      stats.forEach((stat) => {
        let currentValue = 0;
        const increment = stat.value / 50; // تقسیم بر 50 برای انیمیشن نرم
        const timer = setInterval(() => {
          currentValue += increment;
          if (currentValue >= stat.value) {
            currentValue = stat.value;
            clearInterval(timer);
          }
          setAnimatedValues(prev => ({
            ...prev,
            [stat.id]: Math.floor(currentValue)
          }));
        }, 30);
      });
    }
  }, [isVisible]);

  return (
    <section id="statistics-section" className={styles.statisticsSection}>
      <div className={styles.backgroundPattern}></div>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.sectionTitle}>
            {t('statistics.title')}
          </h2>
          <p className={styles.sectionSubtitle}>
            {t('statistics.subtitle')}
          </p>
        </div>
        
        <div className={styles.statsGrid}>
          {stats.map((stat, index) => (
            <div
              key={stat.id}
              className={`${styles.statCard} ${isVisible ? styles.visible : ''}`}
              style={{
                animationDelay: `${index * 0.15}s`
              }}
            >
              <div className={styles.statIconWrapper}>
                <span className={styles.statIcon}>{stat.icon}</span>
                <div className={styles.iconGlow}></div>
              </div>
              
              <div className={styles.statContent}>
                <div className={styles.statValue}>
                  <span className={styles.number}>
                    {animatedValues[stat.id] || 0}
                  </span>
                  {stat.suffix && (
                    <span className={styles.suffix}>{stat.suffix}</span>
                  )}
                </div>
                <h3 className={styles.statTitle}>
                  {t(`statistics.${stat.id}`)}
                </h3>
              </div>
              
              <div className={styles.decorativeLine}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
