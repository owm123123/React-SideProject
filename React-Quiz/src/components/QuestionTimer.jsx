import React, { useEffect, useState } from 'react';

export default function QuestionTimer({ timeOut, onTimeOut }) {
  const [remainingTimer, setRemainingTimer] = useState(timeOut);

  useEffect(() => {
    console.log('SETTING INTERVAL');
    setInterval(() => {
      const interval = setRemainingTimer((prev) => prev - 100);
      return () => {
        clearInterval(interval);
      };
    }, 100);
  }, []);

  useEffect(() => {
    // send answer is null
    console.log('SETTING TIMER');
    const timer = setTimeout(onTimeOut, timeOut);

    return () => {
      clearTimeout(timer);
    };
  }, [timeOut, onTimeOut]);

  return <progress value={remainingTimer} max={timeOut} />;
}
