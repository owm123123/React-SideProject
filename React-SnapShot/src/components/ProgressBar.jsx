import { useState, useEffect } from 'react';

export default function ProgressBar({ timer }) {
  const [remainingTimer, setRemainingTimer] = useState(timer);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log('Starter Interval');
      setRemainingTimer((prevTimer) => prevTimer - 10);
    }, 10);

    return () => {
      console.log('Clear Interval');
      clearInterval(interval);
    };
  }, []);
  return <progress value={remainingTimer} max={timer} />;
}
