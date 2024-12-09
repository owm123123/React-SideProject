const initGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const GameBoard = ({ handleChangeSymbol, turns }) => {
  let gameBoard = initGameBoard;
  turns.map((turn) => {
    const { square, playerSymbol } = turn;
    const { row, col } = square;
    gameBoard[row][col] = playerSymbol;
  });

  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button onClick={() => handleChangeSymbol(rowIndex, colIndex)}>
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
};

export default GameBoard;
