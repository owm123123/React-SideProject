// public & assets 都可以放圖片,共享檔案
// 差別: public 可以用url察看到, assets不可以
// 選擇: 如果是放在index.jsx或app.jsx可以放在public, 如果是component可以放在assets

// nested array[[]] useState change value
// const [na, setNa] = useState([[],[]]);
// setNa((prevNa) => {
//  const updateBoard = [
//    ...prevGameBoard.map((innerArray) => [...innerArray]),
//  ];
//  updateBoard[1][2] = test;
//  return updateBoard;
// })

import { WINNING_COMBINATIONS } from './winning-combinations';
import { useState } from 'react';
import GameBoard from './components/GameBoard';
import Player from './components/Player';
import Log from './components/Log';

function App() {
  const [turns, setTurns] = useState([]);

  let currentPlayer = deriveActivePlayer();
  function deriveActivePlayer() {
    let currentPlayer = 'X';
    if (turns.length > 0 && turns[0].playerSymbol == 'X') {
      currentPlayer = 'O';
    }
    return currentPlayer;
  }

  const initGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];

  let gameBoard = initGameBoard;
  turns.map((turn) => {
    const { square, playerSymbol } = turn;
    const { row, col } = square;
    gameBoard[row][col] = playerSymbol;
  });

  let winer;
  WINNING_COMBINATIONS.forEach((combination) => {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winer = firstSquareSymbol;
    }
  });

  function handleChangeSymbol(rowIndex, colIndex) {
    setTurns((prevTurn) => {
      const updatesTurns = [
        {
          square: { row: rowIndex, col: colIndex },
          playerSymbol: currentPlayer,
        },
        ...prevTurn,
      ];
      return updatesTurns;
    });
  }

  return (
    <>
      <header>
        <img src="game-logo.png" alt="Tic-Tac-Toe"></img>
        <h1>React Tic-Tac-Toe</h1>
      </header>
      <main>
        <div id="game-container">
          <ol id="players" className="highlight-player">
            <Player
              initName="Player 1"
              symbol="X"
              isActive={currentPlayer === 'X'}
            />
            <Player
              initName="Player 2"
              symbol="O"
              isActive={currentPlayer === 'O'}
            />
          </ol>
          {winer && <p>you won! {winer}</p>}
          <GameBoard
            handleChangeSymbol={handleChangeSymbol}
            gameBoard={gameBoard}
          />
        </div>
        <Log turns={turns} />
      </main>
    </>
  );
}

export default App;
