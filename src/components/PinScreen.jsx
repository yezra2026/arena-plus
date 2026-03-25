import React from 'react';
import { usePinInput } from '../hooks/usePinInput';
import { PinDots } from './PinDots';
import { Keypad } from './Keypad';
import { SuccessOverlay } from './SuccessOverlay';
import styles from './PinScreen.module.css';

export function PinScreen() {
  const { digits, status, shake, handleKey, handleDelete, reset } =
    usePinInput();

  const isError   = status === 'error';
  const isSuccess = status === 'success';

  return (
    <div className={`${styles.root} ${isError ? styles.errorFlash : ''}`}>

      <div className={styles.bgAccent} />

      <main className={styles.card}>

        <div className={styles.logoSpacer} />

        <div className={styles.interactive}>

          <div className={styles.heading}>
            <p className={styles.subtitle}>
              {isError ? 'Incorrect PIN' : 'You only have 1 attempt'}
            </p>
          </div>

          <PinDots digits={digits} status={status} shake={shake} />

          <Keypad
            onKey={handleKey}
            onDelete={handleDelete}
            disabled={isSuccess}
          />

        </div>

      </main>

      <SuccessOverlay show={isSuccess || isError} onReset={reset} isError={isError} />
    </div>
  );
}