import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './SearchComponent.module.css';

interface SearchComponentProps {
  onSearch?: (term: string) => void;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ onSearch }) => {
  const [email, setEmail] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { lang } = useParams<{ lang?: string }>();
  const { t, i18n } = useTranslation();
  const currentLang = lang || i18n.language || 'en';

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleFilterClick = async (filterType: 'software' | 'startup') => {
    setError('');
    
    if (!email.trim()) {
      setError(t('errorMessage') || 'Please enter your email');
      return;
    }
    
    // if (!validateEmail(email)) {
    //   setError('Please enter a valid email address');
    //   return;
    // }

    try {
      // Save lead to JSON server
      await fetch('http://localhost:3001/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          searchTerm,
          filterType,
          timestamp: new Date().toISOString()
        })
      });

      // Navigate to browse page
      navigate(`/${currentLang}/browse?type=${filterType}&email=${encodeURIComponent(email)}&search=${encodeURIComponent(searchTerm)}`);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.backgroundGradient}></div>
      
      <div className={styles.formCard}>
        <h2 className={styles.title}>
          {t('IntroductionText')?.split('\n')[0] || 'Find Your Perfect Solution'}
        </h2>
        
        <div className={styles.inputGroup}>
          <input
            type="email"
            placeholder={t('emailLabel') || 'Enter your email'}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.emailInput}
            required
          />
          
          {/* <input
            type="text"
            placeholder={t('searchPlaceholder') || 'Search by name or keyword...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          /> */}
          
          {error && <span className={styles.errorText}>{error}</span>}
        </div>

        <div className={styles.buttonGroup}>
          <button
            onClick={() => handleFilterClick('software')}
            className={`${styles.filterButton} ${styles.softwareButton}`}
          >
            <span className={styles.buttonIcon}>💻</span>
            <span>{t('softwareFilter') || 'Browse Software'}</span>
          </button>
          
          <button
            onClick={() => handleFilterClick('startup')}
            className={`${styles.filterButton} ${styles.startupButton}`}
          >
            <span className={styles.buttonIcon}>🚀</span>
            <span>{t('startupFilter') || 'Browse Startups'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchComponent;
