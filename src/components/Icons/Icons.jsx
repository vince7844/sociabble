import React, { useState } from 'react'
import { defaultColors } from '../../assets/colors/default-colors';

const Icons = ({ hasBackground }) => {
  const [liked, setLiked] = useState(false)
  const blue = defaultColors.blue;
  const green = defaultColors.green;
  const red = defaultColors.red;

  return (
    <div className="icons d-flex justify-content-end" style={hasBackground ? {position: "absolute", bottom: 0, right: 0} : {display: "block"}}>
      <i className="bi bi-heart-fill"
         onClick={!hasBackground ? () => setLiked(true) : null} 
         style={hasBackground ? 
          { backgroundColor: liked ? red : green } : 
          { color: liked ? red : green, cursor: "pointer"}}
         ></i>
      <i className="bi bi-bookmark-fill" 
         style={hasBackground ? {backgroundColor: green} : {color: green, cursor: "pointer"}}></i>
      <i className="bi bi-share-fill" 
         style={hasBackground ? {backgroundColor: blue} : {color: blue, cursor: "pointer"}}></i>
    </div>
  )
}

export default Icons