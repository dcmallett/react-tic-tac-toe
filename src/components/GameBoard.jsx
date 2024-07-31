const intialGameBoard = [
  //multi-dimensional array
  [null, null, null],
  [null, null, null],
  [null, null, null],
]

export default function GameBoard({ onSelectSquare, turns }) {

  let gameBoard = intialGameBoard;

  for(const turn of turns) {
    //if turns is an empty [] this wont execute
    const { square, player } = turn;
    const { row, col } = square;

    //we are diriving state. (computed value) that is derived from the gameTurns state
    //
    gameBoard[row][col] = player;
  }


  return (
    <ol id="game-board">
      {/* 
        its not good use case to use the index in case any data gets swapped around as the 
        index is not tied to the data but to the postion of the data. but this use case is fine
        as we wont be swapping data around normally it would be an ID thats used
      */}
      {gameBoard.map((row, rowIndex) => <li key={rowIndex}>
        <ol>
          {row.map((playerSymbol, colsIndex) => <li key={colsIndex}>
            <button 
              onClick={() => onSelectSquare(rowIndex, colsIndex)} 
                disabled={playerSymbol !== null}
              >
                {playerSymbol}
            </button>
          </li>)}
        </ol>
      </li>)}
    </ol>
  )
}