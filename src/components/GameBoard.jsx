export default function GameBoard({ onSelectSquare, board }) {

  return (
    <ol id="game-board">
      {/* 
        its not good use case to use the index in case any data gets swapped around as the 
        index is not tied to the data but to the postion of the data. but this use case is fine
        as we wont be swapping data around normally it would be an ID thats used
      */}
      {board.map((row, rowIndex) => <li key={rowIndex}>
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