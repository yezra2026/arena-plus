import { useState, useCallback, useEffect } from 'react';

const SECRET_PIN = '246800';

export function usePinInput({ onSuccess } = {}) {
  const [digits, setDigits] = useState([]);
  const [status, setStatus] = useState('idle');
  const [shake, setShake]   = useState(false);

  const triggerShake = useCallback(() => {
    setShake(true);
    setTimeout(() => setShake(false), 600);
  }, []);

  const handleKey = useCallback((key) => {
    if (status === 'success' || status === 'error') return;
    if (digits.length >= 6) return;

    const next = [...digits, key];
    setDigits(next);

    if (next.length === 6) {
      if (next.join('') === SECRET_PIN) {
        setStatus('success');
        onSuccess?.();
      } else {
        setStatus('error');
        triggerShake();
      }
    }
  }, [digits, status, onSuccess, triggerShake]);

  const handleDelete = useCallback(() => {
    if (status === 'success' || status === 'error') return;
    setDigits(prev => prev.slice(0, -1));
  }, [status]);

  const reset = useCallback(() => {
    setDigits([]);
    setStatus('idle');
    setShake(false);
  }, []);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key >= '0' && e.key <= '9') handleKey(e.key);
      if (e.key === 'Backspace') handleDelete();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleKey, handleDelete]);

  return {
    digits,
    status,
    shake,
    handleKey,
    handleDelete,
    reset,
  };
}