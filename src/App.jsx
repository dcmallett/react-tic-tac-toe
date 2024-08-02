import { useState } from "react"

import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2'
}

const INITIAL_GAME_BOARD = [
  //multi-dimensional array
  [null, null, null],
  [null, null, null],
  [null, null, null],
]

//function outside the component function as it does not need to use anything inside the component function
//also it does not need to be re-run when the component function has been run

function deriveActivePlayer(gameTurns) {

    let currentPlayer = 'X';
    if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
      currentPlayer = 'O'
    }
    return currentPlayer;
}

function deriveGameBoard(gameTurns) {
    //becuase we are using an array within an array we need to take a copy of the whole state
    //but also we need to map over the arrays inside and take copies of them too
    let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])];

    for(const turn of gameTurns) {
      //if turns is an empty [] this wont execute
      const { square, player } = turn;
      const { row, col } = square;

      //we are diriving state. (computed value) that is derived from the gameTurns state
      //
      gameBoard[row][col] = player;
    }

    return gameBoard
}



function deriveWinner(gameBoard, players) {
  let winner;


  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column]
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column]
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column]

    if (
      firstSquareSymbol && 
      firstSquareSymbol === secondSquareSymbol && 
      firstSquareSymbol === thirdSquareSymbol
    ) {
        winner = players[firstSquareSymbol]
    }
  }

  return winner
}




function App() {

  const [players, setPlayers] = useState(PLAYERS)


  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurns) 
  const gameBoard = deriveGameBoard(gameTurns)
  const winner = deriveWinner(gameBoard, players)
  const hasDraw = gameTurns.length === 9 && !winner


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


  function handleRestart() {
    setGameTurns([])
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName
      }
    })
  }



  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player 
            initialName={PLAYERS.X}
            symbol="X" 
            isActive={activePlayer === 'X'}
            onChangeName={handlePlayerNameChange}
          />
          <Player 
            initialName={PLAYERS.O}
            symbol="O" 
            isActive={activePlayer === 'O'} 
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner}  onRestart={handleRestart} />}
        <GameBoard 
          onSelectSquare={handleSelectSquare} 
          board={gameBoard}
        />
      </div>
      <Log turns={gameTurns} />
    </main>
  )
}

export default App
