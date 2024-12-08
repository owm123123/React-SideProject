import { useRef } from 'react';
import { useState } from 'react';

export default function Player() {
  const [playerName, setPlayerName] = useState(null);
  // const [isSubmit, setIsSubmit] = useState(false);

  // function handlePlayerName(event) {
  //   setIsSubmit(false);
  //   setPlayerName(event.target.value);
  // }

  const playerNameInput = useRef();

  function handleClickPlayerName() {
    setPlayerName(playerNameInput.current.value);
    // setIsSubmit(true);
  }

  return (
    <section id="player">
      {/* <h2>Welcome {isSubmit ? playerName : 'unknown entity'}</h2> */}
      {/* 可修改成以下 */}
      <h2>Welcome {playerName ?? 'unknown entity'}</h2>
      <p>
        <input ref={playerNameInput} type="text" />
        {/* <input type="text" value={playerName} onChange={handlePlayerName} /> */}
        <button onClick={handleClickPlayerName}>Set Name</button>
      </p>
    </section>
  );
}
