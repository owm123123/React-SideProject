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
import GameOver from './components/GameOver';

const INITIAL_PLAYER_NAME = {
  X: 'Player 1',
  O: 'Player 2',
};

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(turns) {
  let currentPlayer = 'X';
  if (turns.length > 0 && turns[0].playerSymbol == 'X') {
    currentPlayer = 'O';
  }
  return currentPlayer;
}

function deriveWinner(gameBoard, playerName) {
  let winner;
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
      winner = playerName[firstSquareSymbol];
    }
  });
  return winner;
}

function derviceGameBoard(turns) {
  // 建立一個新array
  let gameBoard = [...INITIAL_GAME_BOARD].map((array) => [...array]);
  // 記憶體位置一樣不會re-render
  // let gameBoard = INITIAL_GAME_BOARD;

  turns.map((turn) => {
    const { square, playerSymbol } = turn;
    const { row, col } = square;
    gameBoard[row][col] = playerSymbol;
  });
  return gameBoard;
}

function App() {
  const [playerName, setPlayerName] = useState(INITIAL_PLAYER_NAME);
  const [turns, setTurns] = useState([]);

  const currentPlayer = deriveActivePlayer(turns);
  const gameBoard = derviceGameBoard(turns);
  const winner = deriveWinner(gameBoard, playerName);
  const hasDraw = turns.length === 9 && !winner;
  console.log(winner);

  function handleRestart() {
    setTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayerName((prevPlayerName) => {
      return { ...prevPlayerName, [symbol]: newName };
    });
  }

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
              onChangeName={handlePlayerNameChange}
            />
            <Player
              initName="Player 2"
              symbol="O"
              isActive={currentPlayer === 'O'}
              onChangeName={handlePlayerNameChange}
            />
          </ol>
          {(winner || hasDraw) && (
            <GameOver winner={winner} onRestart={handleRestart} />
          )}
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
