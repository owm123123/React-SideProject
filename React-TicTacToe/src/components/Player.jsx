import React, { useState } from 'react';

const Player = ({ initName, symbol, isActive }) => {
  const [name, setName] = useState(initName);
  const [isEdit, setIsEdit] = useState(false);

  function handleEditButton() {
    setIsEdit(!isEdit);
  }

  function handleEditName(event) {
    setName(event.target.value);
  }

  let playerName = <span className="player-name">{name}</span>;
  if (isEdit) {
    playerName = (
      <input type="text" required value={name} onChange={handleEditName} />
    );
  }

  return (
    <li className={isActive && 'active'}>
      <span className="player">
        {playerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditButton}>{isEdit ? 'Save' : 'Edit'}</button>
    </li>
  );
};

export default Player;
