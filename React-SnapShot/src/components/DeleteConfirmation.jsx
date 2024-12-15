import { useEffect } from 'react';

export default function DeleteConfirmation({ onConfirm, onCancel }) {
  // need useEffect because still execute after user cancel
  // setTimeout(() => {
  //   onConfirm();
  // }, 3000);

  useEffect(() => {
    console.log('start timerout');
    const timer = setTimeout(() => {
      onConfirm();
    }, 3000);

    return () => {
      console.log('clear timerout');
      clearTimeout(timer);
    };
  }, []);

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
    </div>
  );
}
