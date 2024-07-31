export default function Log({ turns }) {
  return (
    <ol id="log">
      <h1>Game Log:</h1>
      {/*This row col syntax will be our key */}
      {turns.map((turn) => <li key={`${turn.square.row}${turn.square.col}`}>
        {turn.player} selected {turn.square.row}, {turn.square.col}</li>
      )}
    </ol>
  )
}