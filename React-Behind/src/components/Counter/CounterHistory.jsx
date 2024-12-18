import { useState } from 'react';

import { log } from '../../log.js';

function HistoryItem({ count }) {
  log('<HistoryItem /> rendered', 3);

  const [selected, setSelected] = useState(false);

  function handleClick() {
    setSelected((prevSelected) => !prevSelected);
  }

  return (
    <li onClick={handleClick} className={selected ? 'selected' : undefined}>
      {count}
    </li>
  );
}

export default function CounterHistory({ history }) {
  log('<CounterHistory /> rendered', 2);
  // key的拿取
  // 寫在子元件的方法裡面: history.map 的 key都塞一樣的 (X)
  // 塞在props帶入: history.map 的 key都塞一樣的 (X)
  // 寫在map(()=>{id})方法裡面: 下一次render的時候還是會改變,無法持久化 (X)
  // key的值可以存在useState裡面: 因為這樣可以持久化,讓react辨識 (O)
  // map的index:可以,要資料如果順序改變,會造成react辨識錯誤(-)

  // const id = Math.floor(Math.random() * 1000);

  return (
    <ol>
      {/* key是By value來決定是否重新render, 
      所以當使用index的時候,若順序改變也會跟著改變 */}
      {history.map((count, index) => {
        console.log(count);
        return <HistoryItem key={count.id} count={count.value} />;
      })}
    </ol>
  );
}
