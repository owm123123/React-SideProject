import React from 'react';

// 一個component會接Spread syntax{...props}表示他應該是一個單純做css的component
// 讓你的parent去給值
const SpreadProps = ({ isTextArea, ...props }) => {
  if (isTextArea) {
    return (
      <button className={`text-button button ${isTextArea} ? "test"`}>
        {children}
      </button>
    );
  }
  return <input {...props} />;
};

export default SpreadProps;
