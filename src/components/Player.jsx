import { useState } from "react";

export default function Player({ name, symbol}) {

  const [ isEditing, setIsEditing ] = useState(false); 

  //add function that is triggered when button is clicked
  const handleEditClick = () => {
    setIsEditing(true)
  }
  //chage is setIsEditing to true
  //show span player-name when editing is false
  //show input when isEditing is true

  return (
      <li>
      <span className="player">
        {!isEditing && <span className="player-name">{name}</span> }
        {isEditing && <input type="text" required /> }
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>Edit</button>
    </li>
  )
}