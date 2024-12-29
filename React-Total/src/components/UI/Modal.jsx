import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export default function Modal({ children, open, className }) {
  const dialog = useRef();

  useEffect(() => {
    const modal = dialog.current;

    // TODO: 可再加強 useEffect return 的觸發時機
    if (open) modal.showModal();
    return () => {
      modal.close();
    };
  }, [open]);

  return (
    <>
      {createPortal(
        <dialog ref={dialog} className={`modal ${className}`}>
          {children}
        </dialog>,
        document.getElementById('modal')
      )}
    </>
  );
}
