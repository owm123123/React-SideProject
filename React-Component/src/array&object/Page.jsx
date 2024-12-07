import React from 'react';
import util from './util';

console.log(util);
const Page = () => {
  return (
    <ul>
      <h1>hello</h1>
      {/* 在使用 map的時候, 記得如果只有return那一行 
          1. 可以省略 {return ...} 
             (inem, index) => <span>{item}</span>
          2. 如果有加{}那就記得要加 return 
             (inem, index) => { return <span>{item}</span>} */}
      {util ? (
        util.map((item, index) => {
          return <li key={index}>{item.val}</li>;
        })
      ) : (
        <h1>data not found</h1>
      )}
    </ul>
  );
};

export default Page;
