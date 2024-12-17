import { useState } from 'react';

import Counter from './components/Counter/Counter.jsx';
import Header from './components/Header.jsx';
import { log } from './log.js';
import SetCounter from './components/Counter/SetCounter.jsx';

function App() {
  log('<App /> rendered');

  const [chosenCount, setChosenCount] = useState(0);

  function handleSetClick(newCount) {
    setChosenCount(newCount);
  }

  return (
    <>
      <Header />
      <main>
        <SetCounter onSet={handleSetClick} />
        <Counter initialCount={chosenCount} />
      </main>
    </>
  );
}

export default App;
