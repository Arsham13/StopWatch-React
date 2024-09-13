import React, { useRef } from 'react'

function DarkMode() {
    let darkMode = useRef(null)
  
    let isClicked = false
    const handleClick = ()=>{
      if(isClicked !== true){
        darkMode.current.innerText = 'Light'
        darkMode.current.parentElement.parentElement.parentElement.style = 'color-scheme:dark'
      } else{
        darkMode.current.innerText = 'Dark'
        darkMode.current.parentElement.parentElement.parentElement.style = 'color-scheme:light'
      }
  
      isClicked = !isClicked
    }
  
    return (
        <>
        <h3 onClick={handleClick} ref={darkMode} id="dl">Dark</h3>
        </>
    )
}

export default DarkMode