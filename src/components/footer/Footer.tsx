import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import styles from "./Footer.module.css";
import {
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
  FaChartBar,
  FaUserPlus,
  FaDesktop,
  FaBrain,
  FaHome,
  FaInfoCircle,
  FaServicestack,
  FaAddressCard,
  FaArrowRight,
  FaPaperPlane,
} from "react-icons/fa";

const Footer: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const currentLang = lang || i18n.language || "en";
  const isRTL = currentLang === "ar";
  const [email, setEmail] = useState("");
  const [subscribeStatus, setSubscribeStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const socialLinks = [
    {
      icon: <FaEnvelope />,
      href: "mailto:info@stellarsep.com",
      label: "Email",
      color: "#EA4335",
    },
    {
      icon: <FaTwitter />,
      href: "https://twitter.com/stellarsep",
      label: "Twitter",
      color: "#1DA1F2",
    },
    {
      icon: <FaLinkedinIn />,
      href: "https://linkedin.com/company/stellarsep",
      label: "LinkedIn",
      color: "#0077B5",
    },
    {
      icon: <FaInstagram />,
      href: "https://instagram.com/stellarsep",
      label: "Instagram",
      color: "#E4405F",
    },
  ];

  const quickLinks = [
    { key: "home", path: `/${currentLang}`, icon: <FaHome /> },
    {
      key: "aboutUs",
      path: `/${currentLang}/about-us`,
      icon: <FaInfoCircle />,
    },
    {
      key: "services",
      path: `/${currentLang}/services`,
      icon: <FaServicestack />,
    },
    {
      key: "contactUs",
      path: `/${currentLang}/contact-us`,
      icon: <FaAddressCard />,
    },
  ];

  const services = [
    {
      key: "dataAnalysis",
      path: `/${currentLang}/services?service=dataAnalysis`,
      icon: <FaChartBar />,
    },
    {
      key: "leadGeneration",
      path: `/${currentLang}/services?service=leadGeneration`,
      icon: <FaUserPlus />,
    },
    {
      key: "technicalDemo",
      path: `/${currentLang}/services?service=technicalDemo`,
      icon: <FaDesktop />,
    },
    {
      key: "aiMatchingEngine",
      path: `/${currentLang}/services?service=aiMatching`,
      icon: <FaBrain />,
    },
  ];

  const getServiceTitle = (serviceKey: string) => {
    const serviceItem = t(`servicesItems.${serviceKey}`, {
      returnObjects: true,
    });
    if (typeof serviceItem === "object" && serviceItem !== null) {
      return isRTL ? (serviceItem as any).arabic : (serviceItem as any).english;
    }
    return serviceKey;
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setSubscribeStatus("loading");

    // Simulate API call
    setTimeout(() => {
      setSubscribeStatus("success");
      setEmail("");
      setTimeout(() => setSubscribeStatus("idle"), 3000);
    }, 1500);
  };

  return (
    <footer className={styles.footer} dir={isRTL ? "rtl" : "ltr"}>
      <div className={styles.footerPattern}></div>

      {/* Wave SVG at top */}
      <div className={styles.waveTop}>
        <svg viewBox="0 0 1440 100" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="rgba(255,255,255,0.05)"
            d="M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,58.7C672,53,768,43,864,48C960,53,1056,75,1152,74.7C1248,75,1344,53,1392,42.7L1440,32L1440,100L1392,100C1344,100,1248,100,1152,100C1056,100,960,100,864,100C768,100,672,100,576,100C480,100,384,100,288,100C192,100,96,100,48,100L0,100Z"
          />
        </svg>
      </div>

      <div className={styles.container}>
        {/* Main Footer Content */}
        <div className={styles.footerContent}>
          {/* Company Info Section */}
          <div className={`${styles.footerSection} ${styles.companySection}`}>
            <div className={styles.logoWrapper}>
              <h3 className={styles.logoTitle}>
                Stellar<span className={styles.logoAccent}>SEP</span>
              </h3>
              <div className={styles.logoUnderline}></div>
            </div>
            <p className={styles.companyDescription}>
              {t("footer.companyDescription") ||
                "Your AI-Powered Digital Booth Platform. Connect, showcase, and discover technology innovations."}
            </p>
            <div className={styles.socialLinks}>
              <p className={styles.followText}>
                {t("footer.followUs") || "Follow Us"}
              </p>
              <div className={styles.socialIconsRow}>
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                    aria-label={social.label}
                    style={
                      { "--hover-color": social.color } as React.CSSProperties
                    }
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className={styles.footerSection}>
            <h4 className={styles.sectionTitle}>
              <span className={styles.titleIcon}>🔗</span>
              {t("footer.quickLinks") || "Quick Links"}
            </h4>
            <ul className={styles.linksList}>
              {quickLinks.map((link) => (
                <li key={link.key}>
                  <Link to={link.path} className={styles.footerLink}>
                    <span className={styles.linkIcon}>{link.icon}</span>
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Section */}
          <div className={styles.footerSection}>
            <h4 className={styles.sectionTitle}>
              <span className={styles.titleIcon}>💼</span>
              {t("footer.ourServices") || "Our Services"}
            </h4>
            <ul className={styles.linksList}>
              {services.map((service) => (
                <li key={service.key}>
                  <Link to={service.path} className={styles.footerLink}>
                    <span className={styles.linkIcon}>{service.icon}</span>
                    {getServiceTitle(service.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div className={styles.footerSection}>
            <h4 className={styles.sectionTitle}>
              <span className={styles.titleIcon}>📞</span>
              {t("footer.contactInfo") || "Contact Info"}
            </h4>
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>
                  <FaMapMarkerAlt />
                </span>
                <span>
                  {t("footer.address") || "Dubai, United Arab Emirates"}
                </span>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>
                  <FaPhone />
                </span>
                <span dir="ltr">+971502648618</span>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>
                  <FaEnvelope />
                </span>
                <a
                  href="mailto:info@stellarsep.com"
                  className={styles.contactLink}
                >
                  info@stellarsep.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className={styles.newsletterSection}>
          <div className={styles.newsletterContent}>
            <div className={styles.newsletterText}>
              <h4 className={styles.newsletterTitle}>
                {t("footer.newsletterTitle") || "Subscribe to Our Newsletter"}
              </h4>
              <p className={styles.newsletterDescription}>
                {t("footer.newsletterDescription") ||
                  "Stay updated with the latest news and exclusive offers!"}
              </p>
            </div>
            <form className={styles.newsletterForm} onSubmit={handleSubscribe}>
              <div className={styles.inputWrapper}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={
                    t("footer.emailPlaceholder") || "Enter your email"
                  }
                  className={styles.emailInput}
                  dir={isRTL ? "rtl" : "ltr"}
                  disabled={subscribeStatus === "loading"}
                />
                <button
                  type="submit"
                  className={styles.subscribeButton}
                  disabled={subscribeStatus === "loading" || !email}
                >
                  {subscribeStatus === "loading" ? (
                    <span className={styles.loadingSpinner}></span>
                  ) : subscribeStatus === "success" ? (
                    "✓"
                  ) : (
                    <>
                      {t("footer.subscribe") || "Subscribe"}
                      <FaPaperPlane />
                    </>
                  )}
                </button>
              </div>
              {subscribeStatus === "success" && (
                <p className={styles.successMessage}>
                  {t("footer.subscribeSuccess") || "Successfully subscribed!"}
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <div className={styles.bottomContent}>
            <p className={styles.copyright}>
              © {new Date().getFullYear()} StellarSEP.{" "}
              {t("footer.allRightsReserved") || "All rights reserved."}
            </p>
            <div className={styles.bottomLinks}>
              <Link
                to={`/${currentLang}/privacy`}
                className={styles.bottomLink}
              >
                {t("footer.privacyPolicy") || "Privacy Policy"}
              </Link>
              <span className={styles.separator}>•</span>
              <Link to={`/${currentLang}/terms`} className={styles.bottomLink}>
                {t("footer.termsOfService") || "Terms of Service"}
              </Link>
              <span className={styles.separator}>•</span>
              <Link
                to={`/${currentLang}/cookies`}
                className={styles.bottomLink}
              >
                {t("footer.cookiePolicy") || "Cookie Policy"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
