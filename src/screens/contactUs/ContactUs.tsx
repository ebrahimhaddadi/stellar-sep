import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  FaMapMarkerAlt, 
  FaEnvelope, 
  FaPhone, 
  FaClock,
  FaUser,
  FaMobileAlt,
  FaTag,
  FaEdit,
  FaPaperPlane,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram
} from 'react-icons/fa';
import styles from './ContactUs.module.css';

const ContactUs: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // محاکی API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Form Data Submitted:', formData);
      
      setSubmitStatus('success');
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
      
    } catch (error) {
      console.error('Submit error:', error);
      setSubmitStatus('error');
      
      // Hide error message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.contactContainer} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className={styles.backgroundPattern}></div>
      
      <div className={styles.contentWrapper}>
        {/* Header Section */}
        <div className={styles.headerSection}>
          <h1 className={styles.mainTitle}>
            {t('contactPage.title')}
          </h1>
          <p className={styles.subtitle}>
            {t('contactPage.subtitle')}
          </p>
        </div>

        <div className={styles.mainContent}>
          {/* Contact Information Section */}
          <div className={styles.infoSection}>
            <div className={styles.infoCard}>
              <h2 className={styles.infoTitle}>
                {t('contactPage.getInTouch')}
              </h2>
              
              {/* Location */}
              <div className={styles.infoItem}>
                <div className={styles.iconWrapper}>
                  <FaMapMarkerAlt />
                </div>
                <div className={styles.infoText}>
                  <h3>{t('contactPage.location')}</h3>
                  <p>{t('contactPage.locationValue')}</p>
                </div>
              </div>

              {/* Email */}
              <div className={styles.infoItem}>
                <div className={styles.iconWrapper}>
                  <FaEnvelope />
                </div>
                                <div className={styles.infoText}>
                  <h3>{t('contactPage.email')}</h3>
                  <a href="mailto:info@stellarsep.com" className={styles.link}>
                    {t('contactPage.emailValue')}
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className={styles.infoItem}>
                <div className={styles.iconWrapper}>
                  <FaPhone />
                </div>
                <div className={styles.infoText}>
                  <h3>{t('contactPage.phone')}</h3>
                  <a href="tel:+971501234567" className={styles.link}>
                    {t('contactPage.phoneValue')}
                  </a>
                </div>
              </div>

              {/* Working Hours */}
              <div className={styles.infoItem}>
                <div className={styles.iconWrapper}>
                  <FaClock />
                </div>
                <div className={styles.infoText}>
                  <h3>{t('contactPage.workingHours')}</h3>
                  <p>{t('contactPage.workingHoursValue')}</p>
                </div>
              </div>

              {/* Socials */}
              <div className={styles.socialLinks}>
                <p className={styles.followText}>{t('contactPage.followUs')}:</p>
                <div className={styles.iconsRow}>
                  <a href="#" aria-label="Facebook"><FaFacebookF /></a>
                  <a href="#" aria-label="Twitter"><FaTwitter /></a>
                  <a href="#" aria-label="LinkedIn"><FaLinkedinIn /></a>
                  <a href="#" aria-label="Instagram"><FaInstagram /></a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className={styles.formSection}>
            <h2>{t('contactPage.sendMessage')}</h2>

            <form onSubmit={handleSubmit} className={styles.contactForm}>
              <div className={styles.inputGroup}>
                <label><FaUser /> {t('contactPage.nameFormLabel')}</label>
                <input
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder={t('contactPage.namePlaceholder')}
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label><FaEnvelope /> {t('contactPage.emailFormLabel')}</label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder={t('contactPage.emailPlaceholder')}
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label><FaMobileAlt /> {t('contactPage.phoneFormLabel')}</label>
                <input
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder={t('contactPage.phonePlaceholder')}
                />
              </div>

              <div className={styles.inputGroup}>
                <label><FaTag /> {t('contactPage.subjectFormLabel')}</label>
                <input
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder={t('contactPage.subjectPlaceholder')}
                />
              </div>

              <div className={styles.inputGroup}>
                <label><FaEdit /> {t('contactPage.messageFormLabel')}</label>
                <textarea
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder={t('contactPage.messagePlaceholder')}
                  required
                />
              </div>

              <button className={styles.submitButton} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <FaPaperPlane className={styles.loadingIcon} />
                    &nbsp;{t('contactPage.sending')}
                  </>
                ) : (
                  <>
                    <FaPaperPlane />&nbsp;{t('contactPage.submitButton')}
                  </>
                )}
              </button>

              {submitStatus === 'success' && (
                <p className={styles.successMessage}>{t('contactPage.successMessage')}</p>
              )}
              {submitStatus === 'error' && (
                <p className={styles.errorMessage}>{t('contactPage.errorMessage')}</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
