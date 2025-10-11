import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const currentLang = lang || i18n.language || 'en';
  const isRTL = currentLang === 'ar';

  const socialLinks = [
    { icon: '📧', href: 'mailto:info@stellarsep.com', label: 'Email' },
    { icon: '💬', href: 'https://twitter.com/stellarsep', label: 'Twitter' },
    { icon: '👔', href: 'https://linkedin.com/company/stellarsep', label: 'LinkedIn' },
    { icon: '📷', href: 'https://instagram.com/stellarsep', label: 'Instagram' }
  ];

  const quickLinks = [
    { key: 'home', path: `/${currentLang}` },
    { key: 'aboutUs', path: `/${currentLang}/about` },
    { key: 'services', path: `/${currentLang}/services` },
    { key: 'contactUs', path: `/${currentLang}/contact` }
  ];

  const services = [
    { key: 'dataAnalysis', path: `/${currentLang}/services?service=dataAnalysis` },
    { key: 'leadGeneration', path: `/${currentLang}/services?service=leadGeneration` },
    { key: 'technicalDemo', path: `/${currentLang}/services?service=technicalDemo` },
    { key: 'aiMatching', path: `/${currentLang}/services?service=aiMatching` }
  ];

  // برای نمایش عنوان خدمات بر اساس زبان جاری
  const getServiceTitle = (serviceKey: string) => {
    const serviceItem = t(`servicesItems.${serviceKey}`, { returnObjects: true });
    if (typeof serviceItem === 'object' && serviceItem !== null) {
      return isRTL ? serviceItem.arabic : serviceItem.english;
    }
    return serviceKey;
  };

  return (
    <footer className={styles.footer} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className={styles.footerPattern}></div>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          {/* Company Info Section */}
          <div className={styles.footerSection}>
            <h3 className={styles.logoTitle}>StellarSEP</h3>
            <p className={styles.companyDescription}>
              {t('footer.companyDescription')}
            </p>
            <div className={styles.socialLinks}>
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label={social.label}
                >
                  <span>{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Section */}
          <div className={styles.footerSection}>
            <h4 className={styles.sectionTitle}>{t('footer.quickLinks')}</h4>
            <ul className={styles.linksList}>
              {quickLinks.map((link) => (
                <li key={link.key}>
                  <Link to={link.path} className={styles.footerLink}>
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Section */}
          <div className={styles.footerSection}>
            <h4 className={styles.sectionTitle}>{t('footer.ourServices')}</h4>
            <ul className={styles.linksList}>
              {services.map((service) => (
                <li key={service.key}>
                  <Link to={service.path} className={styles.footerLink}>
                    {getServiceTitle(service.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div className={styles.footerSection}>
            <h4 className={styles.sectionTitle}>{t('footer.contactInfo')}</h4>
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>📍</span>
                <span>{t('footer.address')}</span>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>📞</span>
                <span dir="ltr">+1 (555) 123-4567</span>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>✉️</span>
                <span>info@stellarsep.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className={styles.newsletterSection}>
          <h4 className={styles.newsletterTitle}>{t('footer.newsletterTitle')}</h4>
          <p className={styles.newsletterDescription}>
            {t('footer.newsletterDescription')}
          </p>
          <form className={styles.newsletterForm} onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder={t('footer.emailPlaceholder')}
              className={styles.emailInput}
              dir={isRTL ? 'rtl' : 'ltr'}
            />
            <button type="submit" className={styles.subscribeButton}>
              {t('footer.subscribe')}
            </button>
          </form>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            {t('footer.copyright', { year: new Date().getFullYear() })}
          </p>
          <div className={styles.bottomLinks}>
            <Link to={`/${currentLang}/privacy`} className={styles.bottomLink}>
              {t('footer.privacyPolicy')}
            </Link>
            <span className={styles.separator}>|</span>
            <Link to={`/${currentLang}/terms`} className={styles.bottomLink}>
              {t('footer.termsOfService')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
