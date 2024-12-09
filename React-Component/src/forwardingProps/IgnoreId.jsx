import React from 'react';

// ...props (spread syntax)
// 所有未被解構的物件 (object, array)

const IgnoreId = ({
  children,
  id,
  className,
  count,
  richText = false,
  ...props
}) => {
  // console.log(...props); 會拋出錯誤，因為 props 不是可迭代物件
  console.log(richText);
  return (
    <ul id={id} className={className}>
      {children}
      <li>
        <span>{count}</span>
        <button {...props}>+</button>
      </li>
    </ul>
  );
};

export default IgnoreId;
