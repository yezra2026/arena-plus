import React, { useCallback } from 'react';
import styles from './Keypad.module.css';

const KEYS = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  [null, '0', 'del'],
];

function DeleteIcon() {
  return (
    <svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 1H20C20.5523 1 21 1.44772 21 2V14C21 14.5523 20.5523 15 20 15H8L1 8L8 1Z"
        stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M13 5.5L9.5 9M9.5 5.5L13 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function Key({ value, onPress, disabled }) {
  const handleClick = useCallback(() => {
    if (!disabled && value !== null) onPress(value);
  }, [value, onPress, disabled]);

  if (value === null) return <div className={styles.empty} />;

  const isDel = value === 'del';

  return (
    <button
      className={`${styles.key} ${isDel ? styles.del : styles.num}`}
      onClick={handleClick}
      disabled={disabled}
      aria-label={isDel ? 'Delete' : value}
      type="button"
    >
      {isDel ? <DeleteIcon /> : (
        <span className={styles.numInner}>
          <span className={styles.digit}>{value}</span>
        </span>
      )}
    </button>
  );
}


export function Keypad({ onKey, onDelete, disabled }) {
  const handlePress = useCallback((val) => {
    if (val === 'del') onDelete();
    else onKey(val);
  }, [onKey, onDelete]);

  return (
    <div className={styles.grid}>
      {KEYS.flat().map((k, i) => (
        <Key key={i} value={k} onPress={handlePress} disabled={disabled} />
      ))}
    </div>
  );
}
