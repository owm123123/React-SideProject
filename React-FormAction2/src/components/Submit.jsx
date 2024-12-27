import React from 'react';
import { useFormStatus } from 'react-dom';

export default function Submit() {
  // pending: true/false
  const { pending } = useFormStatus();
  return (
    <p className="actions">
      <button type="submit" disabled={pending}>
        {pending ? 'Submitting' : 'Submit'}
      </button>
    </p>
  );
}
