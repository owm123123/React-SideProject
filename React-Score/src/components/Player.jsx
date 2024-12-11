import { useRef } from 'react';
import { useState } from 'react';

export default function Player() {
  const [playerName, setPlayerName] = useState(null);

  const playerNameInput = useRef();

  function handleClickPlayerName() {
    setPlayerName(playerNameInput.current.value);
  }

  return (
    <section id="player">
      <h2>Welcome {playerName ?? 'unknown entity'}</h2>
      <p>
        <input ref={playerNameInput} type="text" />
        <button onClick={handleClickPlayerName}>Set Name</button>
      </p>
    </section>
  );
}
