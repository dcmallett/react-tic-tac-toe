import { useState } from "react"

import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";

//function outside the component function as it does not need to use anything inside the component function
//also it does not need to be re-run when the component function has been run



function deriveActivePlayer(gameTurns) {

    let currentPlayer = 'X';
    if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
      currentPlayer = 'O'
    }
    return currentPlayer;
}

function App() {
  const [gameTurns, setGameTurns] = useState([])
  // const [activePlayer, setActivePlayer] = useState('X')

  const activePlayer = deriveActivePlayer(gameTurns) 

  function handleSelectSquare(rowIndex, colsIndex) {
    setGameTurns(prevTurns => {
      const currentPlayer = deriveActivePlayer(prevTurns)

      const updatedTurns = [
        { square: { row: rowIndex, col: colsIndex }, player: currentPlayer }, 
        ...prevTurns
      ];

      return updatedTurns;
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player 
            initialName="Player 1" 
            symbol="X" 
            isActive={activePlayer === 'X'} 
          />
          <Player 
            initialName="Player 2" 
            symbol="O" 
            isActive={activePlayer === 'O'} 
          />
        </ol>
        <GameBoard 
          onSelectSquare={handleSelectSquare} 
          turns={gameTurns}
        />
      </div>
      <Log turns={gameTurns} />
    </main>
  )
}

export default App
