import React from 'react';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';

const ResultModal = forwardRef(function ResultModal(
  { targetTime, timeRemaining, onReset },
  ref
) {
  const dialogRef = useRef();

  // () => ({物件})
  useImperativeHandle(ref, () => ({
    open() {
      dialogRef.current.showModal();
    },
  }));

  const userLost = timeRemaining <= 0;
  const formattedTimeRemaining = (timeRemaining / 1000).toFixed(2);
  const score = (1 - timeRemaining / (targetTime * 1000)) * 100;

  return createPortal(
    // 在dialog中使用ESC也會關閉, 可以加 onClose防範
    <dialog ref={dialogRef} className="result-modal" onClose={onReset}>
      {userLost ? <h2>You lose</h2> : <h2>Your Score: {score}</h2>}
      <p>
        The Target time was <strong>{targetTime} seconds.</strong>
      </p>
      <p>
        You stopped the timer with{' '}
        <strong>{formattedTimeRemaining} seconds left.</strong>
      </p>
      <form method="dialog">
        <button onClick={onReset}>Close</button>
      </form>
    </dialog>,
    document.getElementById('modal')
  );
});

export default ResultModal;
