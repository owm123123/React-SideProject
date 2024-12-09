import React, { useState } from 'react';
import IgnoreId from './IgnoreId';
import SpreadProps from './SpreadProps';

const Page = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      {/* 在component設定id、className會無效, 需要用props傳進去 */}
      <IgnoreId
        id="IgnoreId"
        className="IgnoreClass"
        test="test"
        onClick={() => setCount((prep) => prep + 1)}
        count={count}
      >
        <li>test1</li>
        <li>test1</li>
        <li>test1</li>
      </IgnoreId>

      <SpreadProps id="name" type="text" placeholder="input name" />
      <br />
      <SpreadProps id="age" type="number" placeholder="input age" />
      <br />
      <SpreadProps id="date" type="date" placeholder="input date" />
      <br />
      <SpreadProps isTextArea id="neno" placeholder="input neno" />
      <br />
      <SpreadProps isTextArea id="test" placeholder="input test" />
    </div>
  );
};

export default Page;
