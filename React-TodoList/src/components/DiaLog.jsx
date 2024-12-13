import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';
import Button from './Button';

const DiaLog = forwardRef(function DiaLog({ children }, ref) {
  const dialogRef = useRef();
  useImperativeHandle(ref, () => ({
    open() {
      dialogRef.current.showModal();
    },
  }));

  return createPortal(
    <dialog
      className="backdrop:bg-stone-900/90 p-4 rounded-md shadow-md"
      ref={dialogRef}
    >
      {children}
      <form method="dialog" className="mt-4 text-right">
        <Button>close</Button>
      </form>
    </dialog>,
    document.getElementById('modal-root')
  );
});

export default DiaLog;
