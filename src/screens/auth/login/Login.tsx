import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaUser, FaLock, FaGoogle, FaFacebook, FaGithub } from "react-icons/fa";
import styles from "./Login.module.css";

const Login: React.FC = () => {
  const { t } = useTranslation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      setError(t("loginPage.loginError"));
      return;
    }

    // API call logic here
    console.log("Login attempt:", { username, password, rememberMe });
    setError("");
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <div className={styles.logoContainer}>
          <div className={styles.logoCircle}>S</div>
        </div>

        <h1 className={styles.title}>{t("loginPage.welcomeBack")}</h1>
        <p className={styles.subtitle}>{t("loginPage.loginSubtitle")}</p>

        {error && <div className={styles.errorMessage}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>
              {t("loginPage.usernameLabel")}
            </label>
            <div className={styles.inputWrapper}>
              <FaUser className={styles.inputIcon} />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={t("loginPage.usernamePlaceholder")}
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>
              {t("loginPage.passwordLabel")}
            </label>
            <div className={styles.inputWrapper}>
              <FaLock className={styles.inputIcon} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t("loginPage.passwordPlaceholder")}
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.optionsRow}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className={styles.checkbox}
              />
              <span>{t("loginPage.rememberMe")}</span>
            </label>

            <a href="#" className={styles.forgotPassword}>
              {t("loginPage.forgotPassword")}
            </a>
          </div>

          <button type="submit" className={styles.loginButton}>
            {t("loginPage.loginButton")}
          </button>
        </form>

        <div className={styles.divider}>
          <span>{t("loginPage.orLoginWith")}</span>
        </div>

        <div className={styles.socialButtons}>
          <button className={styles.socialButton} aria-label="Google">
            <FaGoogle />
          </button>
          <button className={styles.socialButton} aria-label="Facebook">
            <FaFacebook />
          </button>
          <button className={styles.socialButton} aria-label="GitHub">
            <FaGithub />
          </button>
        </div>

        <p className={styles.signupText}>
          {t("loginPage.noAccount")}{" "}
          <a href="#" className={styles.signupLink}>
            {t("loginPage.signUp")}
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
