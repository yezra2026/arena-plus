import React, { useEffect, useState } from 'react';
import styles from './SuccessOverlay.module.css';

export function SuccessOverlay({ show, onReset, isError }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show) requestAnimationFrame(() => setVisible(true));
    else setVisible(false);
  }, [show]);

  if (!show) return null;

  return (
    <div className={`${styles.overlay} ${visible ? styles.in : ''}`}>
      <div className={`${styles.card} ${isError ? styles.errorCard : ''}`}>
        <div className={styles.iconWrap}>
          {isError ? (
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="20" fill="#DC2626"/>
              <path d="M13 13L27 27M27 13L13 27" stroke="white" strokeWidth="2.5"
                strokeLinecap="round"/>
            </svg>
          ) : (
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="20" fill="var(--color-success)"/>
              <path d="M11 20.5L17 26.5L29 14" stroke="white" strokeWidth="2.5"
                strokeLinecap="round" strokeLinejoin="round"
                className={styles.checkPath}/>
            </svg>
          )}
        </div>
        <h2 className={styles.title}>
          {isError ? 'Wrong Code' : 'CONGRATULATIONS!'}
        </h2>
        <p className={styles.sub}>
          {isError ? 'The code you entered is incorrect.' : 'You are the Winner!'}
        </p>
        <button className={`${styles.btn} ${isError ? styles.errorBtn : ''}`}
          onClick={onReset} type="button">
          {isError ? 'Okay' : 'START A NEW GAME'}
        </button>
      </div>
    </div>
  );
}