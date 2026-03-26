import { useState, useCallback, useEffect } from "react";
import { PIN_SCHEDULE } from "../data/pinSchedule";

function getPhTime() {
  const now = new Date();
  const ph = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Manila" }));
  ph.setHours(0, 0, 0, 0);
  return ph;
}

function getCurrentSchedule() {
  const today = getPhTime();
  return (
    PIN_SCHEDULE.find((entry) => {
      const [fy, fm, fd] = entry.from.split("-").map(Number);
      const [ty, tm, td] = entry.to.split("-").map(Number);
      const from = new Date(fy, fm - 1, fd, 0, 0, 0, 0);
      const to = new Date(ty, tm - 1, td, 23, 59, 59, 999);
      return today >= from && today <= to;
    }) || null
  );
}

function getUsedPins(scheduleKey) {
  try {
    const stored = localStorage.getItem(`used_pins_${scheduleKey}`);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function markPinUsed(scheduleKey, pin) {
  try {
    const used = getUsedPins(scheduleKey);
    if (!used.includes(pin)) {
      used.push(pin);
      localStorage.setItem(`used_pins_${scheduleKey}`, JSON.stringify(used));
    }
  } catch {
    // localStorage unavailable
  }
}

function checkPin(enteredPin) {
  const schedule = getCurrentSchedule();
  if (!schedule) return "no_schedule";

  const scheduleKey = schedule.from;
  const usedPins = getUsedPins(scheduleKey);

  if (!schedule.pins.includes(enteredPin)) return "wrong";
  if (usedPins.includes(enteredPin)) return "already_used";

  markPinUsed(scheduleKey, enteredPin);
  return "success";
}

function getPrefilledDigits() {
  const schedule = getCurrentSchedule();
  if (!schedule) return [];

  const usedPins = getUsedPins(schedule.from);
  const nextPin = schedule.pins.find((pin) => !usedPins.includes(pin));

  return nextPin ? nextPin.slice(0, 5).split("") : [];
}

export function usePinInput({ onSuccess } = {}) {
  const [digits, setDigits] = useState(() => getPrefilledDigits());
  const [status, setStatus] = useState("idle");
  const [shake, setShake] = useState(false);

  const triggerShake = useCallback(() => {
    setShake(true);
    setTimeout(() => setShake(false), 600);
  }, []);

  const handleKey = useCallback(
    (key) => {
      if (status === "success" || status === "error") return;
      if (digits.length >= 6) return;
      if (digits.length < 5) return; // first 5 locked

      const next = [...digits, key];
      setDigits(next);

      if (next.length === 6) {
        const result = checkPin(next.join(""));

        if (result === "success") {
          setStatus("success");
          onSuccess?.();
        } else {
          setStatus("error");
          triggerShake();
        }
      }
    },
    [digits, status, onSuccess, triggerShake],
  );

  useEffect(() => {
    const handleStorage = () => {
      window.location.reload();
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const handleDelete = useCallback(() => {
    if (status === "success" || status === "error") return;
    if (digits.length <= 5) return; // can't delete pre-filled
    setDigits((prev) => prev.slice(0, -1));
  }, [status, digits]);

  const reset = useCallback(() => {
    setStatus("idle");
    setShake(false);
    setDigits(getPrefilledDigits());
  }, []);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key >= "0" && e.key <= "9") handleKey(e.key);
      if (e.key === "Backspace") handleDelete();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
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
