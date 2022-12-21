import React, { useEffect, useState } from 'react';
import styles from './PWAInstallButton.module.css';

export const PWAInstallButton = () => {
  const [installPrompt, setInstallPrompt] = useState(null);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e: any) => {
      e.preventDefault();
      setInstallPrompt(e);
    });
  }, [installPrompt]);

  const installApp = async () => {
    if (!installPrompt) {
      alert('이미 다운로드 했습니다');
      return false;
    }

    installPrompt?.prompt();
    setInstallPrompt(null);
  };

  return installPrompt ? (
    <button className={styles.button} onClick={installApp}>
      바탕화면에 설치해서 편리하게 사용하세요!
    </button>
  ) : (
    ''
  );
};
