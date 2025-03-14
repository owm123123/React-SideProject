import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import IconButton from '../UI/IconButton.jsx';
import MinusIcon from '../UI/Icons/MinusIcon.jsx';
import PlusIcon from '../UI/Icons/PlusIcon.jsx';
import CounterOutput from './CounterOutput.jsx';
import { log } from '../../log.js';
import CounterHistory from './CounterHistory.jsx';

export default function Counter({ initialCount }) {
  log('<Counter /> rendered', 1);

  const isPrime = useMemo(
    function isPrime(number) {
      log('Calculating if is prime number', 2, 'other');
      if (number <= 1) {
        return false;
      }
      const limit = Math.sqrt(number);
      for (let i = 2; i <= limit; i++) {
        if (number % i === 0) {
          return false;
        }
      }
      return true;
    },
    [initialCount]
  );

  const initialCountIsPrime = isPrime;

  const [counter, setCounter] = useState(initialCount);
  const [history, setHistory] = useState([]);
  const countId = useRef(0);

  function addCountId() {
    return (countId.current += 1);
  }

  // 父層觸發子層渲染的方式
  // 想要因為傳入Props來達到局部的改變,可以用 useEffect(() => {}, [Props])
  // 想要整個子元件整個重新渲染,可以在父元件加上key來達到效果

  // 局部渲染 => useEffect
  // 整個渲染 => key

  // useEffect(() => {
  //   setCounter(initialCount);
  // }, [initialCount]);

  const handleDecrement = useCallback(function handleDecrement() {
    setCounter((prevCounter) => prevCounter - 1);
    setHistory((prev) => [{ id: addCountId(), value: -1 }, ...prev]);
  }, []);

  const handleIncrement = useCallback(function handleIncrement() {
    setCounter((prevCounter) => prevCounter + 1);
    setHistory((prev) => [{ id: addCountId(), value: 1 }, ...prev]);
  }, []);

  return (
    <section className="counter">
      <p className="counter-info">
        The initial counter value was <strong>{initialCount}</strong>. It{' '}
        <strong>is {initialCountIsPrime ? 'a' : 'not a'}</strong> prime number.
      </p>
      <p>
        <IconButton icon={MinusIcon} onClick={handleDecrement}>
          Decrement
        </IconButton>
        <CounterOutput value={counter} />
        <IconButton icon={PlusIcon} onClick={handleIncrement}>
          Increment
        </IconButton>
      </p>
      <CounterHistory history={history} />
    </section>
  );
}
