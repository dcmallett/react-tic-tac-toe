import { useState } from "react";

export default function Player({ initialName, symbol, isActive, onChangeName }) {

  const  [ playerName, setPlayerName ] = useState(initialName);
  const [ isEditing, setIsEditing ] = useState(false); 

  const handleEditClick = () => {
    //To update the state correctly. You need to pass in a function
    //into the state that you want to update
    //using the function form. You garentee you are always updating the 
    //previous state value
    setIsEditing((editing) => !isEditing)

    if(isEditing) {
      onChangeName(symbol, playerName)
    }
  }

  //function for change when you change the player name
  // becuase on change listens for every key stroke. You need to listen to the event
  //So you need to pass an event param / prop into the change function
  function handleChange(event) {
    //Here the setPlayerName state is listening for the value on the target event.
    //TWO WAY BINDING
    setPlayerName(event.target.value)
  }


  return (
      <li className={isActive ? 'active' : undefined}>
      <span className="player">
        {!isEditing && <span className="player-name">{playerName}</span> }
        
        {isEditing && <input type="text" required value={playerName} onChange={handleChange} /> }
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
    </li>
  )
}