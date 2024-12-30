import React from 'react';

export default function Input({ label, id, ...props }) {
  return (
    <p>
      <label htmlFor={id}>{label}</label>
      <input id={id} name={id} {...props} />
    </p>
  );
}
