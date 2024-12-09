import React from 'react';
import Destructuring from './Destructuring';

const Page = () => {
  // destructuring array
  let userArray = ['John', 'Lin'];
  let [firstName, lastName] = userArray;
  console.log(firstName);
  console.log(lastName);

  // destructuring object
  let userObject = {
    name: 'Amy',
    age: 24,
  };
  let { name, age } = userObject;
  console.log(name);
  console.log(age);
  return (
    <div>
      <h1>Destructuring Page</h1>
      <Destructuring {...userObject} />
    </div>
  );
};

export default Page;
