import React, { memo } from 'react';
import { log } from '../../log.js';

// meno、useMemo、useCallback: handle unnecessary render

// meno 使用在component上, 透過props有無變化判斷是否re-render
// const Component = memo(()=>{})

// shallowly compare check props
// props is Number or String compare "value"
// props is Object compare "reference" (useCallBack solve)

// 當父元素傳給子元素的Props是By reference時,可以在外層
// useCallBack 解決了reference的問題
// const function = useCallBack(()=>{},[])
// 用 dependencies array 的值是否有變, 查看 function是否改變

// 與父元件無關,子元件的fuction有複雜的邏輯時
// const function = useMemo(()=>{},[])

const IconButton = memo(function IconButton({ children, icon, ...props }) {
  log('<IconButton /> rendered', 2);

  const Icon = icon;
  return (
    <button {...props} className="button">
      <Icon className="button-icon" />
      <span className="button-text">{children}</span>
    </button>
  );
});
export default IconButton;
