"use client";
import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import styles from './Timepicker.module.css';

const Timepicker = ({ onClose }) => {
  const [hours, setHours] = useState(12);
  const [minutes, setMinutes] = useState(0);

  const handleSwipeHours = (direction) => {
    setHours((prev) => {
      const newHours = direction === 'up' ? (prev + 1) % 24 : (prev === 0 ? 23 : prev - 1);
      return newHours;
    });
  };

  const handleSwipeMinutes = (direction) => {
    setMinutes((prev) => {
      let newMinutes;
      if (direction === 'up') {
        newMinutes = (prev + 5) % 60;
      } else {
        newMinutes = (prev - 5 + 60) % 60;
      }
      return newMinutes;
    });
  };

  const hourHandlers = useSwipeable({
    onSwipedUp: () => handleSwipeHours('up'),
    onSwipedDown: () => handleSwipeHours('down'),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const minuteHandlers = useSwipeable({
    onSwipedUp: () => handleSwipeMinutes('up'),
    onSwipedDown: () => handleSwipeMinutes('down'),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const formatNumber = (number) => number.toString().padStart(2, '0');

  const handleSave = () => {
    console.log(`Selected time: ${formatNumber(hours)}:${formatNumber(minutes)}`);
    onClose();
  };

  return (
    <div className={styles.timepickerOverlay} onClick={onClose}>
      <div className={styles.timepickerContainer} onClick={(e) => e.stopPropagation()}>
        <div className={styles.timepicker}>
          <div className={styles.timeColumn} {...hourHandlers}>
            <div className={styles.timeItem}>{formatNumber((hours === 0 ? 23 : hours - 1))}</div>
            <div className={styles.timeItemMain}>{formatNumber(hours)}</div>
            <div className={styles.timeItem}>{formatNumber((hours + 1) % 24)}</div>
          </div>
          <div className={styles.timeSeparator}>:</div>
          <div className={styles.timeColumn} {...minuteHandlers}>
            <div className={styles.timeItem}>{formatNumber((minutes === 0 ? 55 : (minutes - 5 + 60) % 60))}</div>
            <div className={styles.timeItemMain}>{formatNumber(minutes)}</div>
            <div className={styles.timeItem}>{formatNumber((minutes + 5) % 60)}</div>
          </div>
        </div>
        <div className={styles.timepickerActions}>
          <button className={styles.button} onClick={onClose}>Cancel</button>
          <button className={styles.button} onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default Timepicker;
