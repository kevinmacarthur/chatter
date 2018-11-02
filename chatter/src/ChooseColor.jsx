import React, {Component} from 'react';


function ColorDropdown ({changeUserColor, currentColor}) {
  //Deals with turning numeric colors into words for smoother user experience
  let currentColorWord = ""
  switch(currentColor) {
    case "#bc203e":
      currentColorWord = "Red"
      break;
    case "#4e8ef4":
      currentColorWord = "Blue"
      break;
    case "#25964b":
      currentColorWord = "Green"
      break;
    default:
      currentColorWord = "Black"
  }
  const styleObj = {
                    color: currentColor,
                    fontWeight: 'bold'
                    }

   function changeHandler(e){
         changeUserColor(e.target.value)
      }

  return (
    <div className="color-drop-down">
      <span>User Color: <span style={styleObj}>{currentColorWord}</span> </span>
      <select className = "drop-down" onChange={changeHandler}>
        <option value="black" >Color</option>
        <option value="black" >Black</option>
        <option value="#bc203e">Red</option>
        <option value="#4e8ef4">Blue</option>
        <option value="#25964b">Green</option>
      </select>
    </div>
  )
}

export default ColorDropdown