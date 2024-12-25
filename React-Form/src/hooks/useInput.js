import { useState } from 'react';

export default function useInput(defaultValue, invalidFn) {
  const [enteredValue, setEnteredValue] = useState(defaultValue);
  const [didEdit, setDidEdit] = useState(false);
  console.log(didEdit);
  console.log('Fn:' + invalidFn(enteredValue));
  const hasError = didEdit && invalidFn(enteredValue);

  function handleOnBlur() {
    setDidEdit(true);
  }

  function handleEnteredValue(event) {
    setEnteredValue(event.target.value);
    setDidEdit(false);
  }

  return { enteredValue, handleOnBlur, handleEnteredValue, hasError };
}
