import React from 'react';

// 不能直接在function的param裡面解構 (重要)
const Destructuring = ({ name, age }) => {
  // destructuring 可以用在function arguments接收的時候, 解構出{} (這樣可以不用每次都object.ATTRIBUTE)
  // let { name, age } = props.userObject; // 解構userObject
  console.log(name);
  console.log(age);
  return (
    <div>
      <span>name: {name}</span>
      <br></br>
      <span>age: {age}</span>
    </div>
  );
};

export default Destructuring;
