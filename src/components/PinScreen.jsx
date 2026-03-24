import React from 'react';
import { usePinInput } from '../hooks/usePinInput';
import { PinDots } from './PinDots';
import { Keypad } from './Keypad';
import { SuccessOverlay } from './SuccessOverlay';
import styles from './PinScreen.module.css';
/*import bgImage from '../assets/test.jpg'
import logoSrc from '../assets/logo.png';*/


export function PinScreen() {
  const { digits, status, shake, handleKey, handleDelete, reset, remaining } =
    usePinInput();

  const isError   = status === 'error';
  const isSuccess = status === 'success';

  return (
    <div className={`${styles.root} ${isError ? styles.errorFlash : ''}`} style={{ /* backgroundImage: isError ? 'none' : `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' */ }}>

      {/* Background decoration */}
      <div className={styles.bgAccent} />

      <main className={styles.card}>

        <div className={styles.logoSpacer} />

        {/* Heading */}
        <div className={styles.heading}>
        <p className={styles.subtitle}>
          {isError ? 'Incorrect PIN' : 'You only have 1 attempt'}
        </p>
        </div>

        {/* PIN Dots */}
        <PinDots digits={digits} status={status} shake={shake} />

        {/* Keypad */}
        <Keypad
          onKey={handleKey}
          onDelete={handleDelete}
          disabled={isSuccess}
        />

      </main>

      {/* Success overlay */}
      <SuccessOverlay show={isSuccess || isError} onReset={reset} isError={isError} />
    </div>
  );
}
