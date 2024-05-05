import React, { useState, useEffect } from 'react';

const Timer = ({ expiryDate }) => {
  const [remainingTime, setRemainingTime] = useState(expiryDate - Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime(expiryDate - Date.now());
    }, 1000);

    return () => clearInterval(timer);
  }, [expiryDate]);

  const formatCountdown = () => {
    if (remainingTime <= 0) {
      return 'Expired';
    }

    const seconds = Math.floor((remainingTime / 1000) % 60);
    const minutes = Math.floor((remainingTime / 1000 / 60) % 60);
    const hours = Math.floor((remainingTime / 1000 / 60 / 60) % 24);

    return `${hours.toString().padStart(2, '0')}h${minutes.toString().padStart(2, '0')}m${seconds.toString().padStart(2, '0')}s`;
  };

  return <div className="de_countdown">{formatCountdown()}</div>;
};

export default Timer;