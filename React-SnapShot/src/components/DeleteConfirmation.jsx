import { useEffect, useState } from 'react';
import ProgressBar from './ProgressBar';

const TIMER = 3000;
export default function DeleteConfirmation({ onConfirm, onCancel }) {
  useEffect(() => {
    console.log('Starter Timerout');
    const timer = setTimeout(() => {
      onConfirm();
    }, TIMER);

    // 一定會在重新render之前執行
    return () => {
      console.log('Clear Timerout');
      clearTimeout(timer);
    };
    // dependency array 不能放 function or object 這種比對是 reference
    // 這時需要用 useCallBack() 將 onConfirm 這個 function記憶化
  }, [onConfirm]);

  return (
    <div id="delete-confirmation">
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div id="confirmation-actions">
        <button onClick={onCancel} className="button-text">
          No
        </button>
        <button onClick={onConfirm} className="button">
          Yes
        </button>
      </div>
      <ProgressBar timer={TIMER} />
    </div>
  );
}
