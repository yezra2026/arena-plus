import React from 'react';
import styles from './PinDots.module.css';

export function PinDots({ digits, status, shake }) {
  return (
    <div className={`${styles.row} ${shake ? styles.shake : ''}`}>
      {Array.from({ length: 6 }).map((_, i) => {
        const filled = i < digits.length;
        const active = i === digits.length;
        return (
          <div
          key={i}
          className={[
            styles.dot,
            filled  ? styles.filled  : '',
            i < 5   ? styles.locked  : '',
            active  ? styles.active  : '',
            status === 'error'   ? styles.error   : '',
            status === 'success' ? styles.success : '',
          ].join(' ')}
        >
          {filled ? digits[i] : ''}
        </div>
        );
      })}
    </div>
  );
}
