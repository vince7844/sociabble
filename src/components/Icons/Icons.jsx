import React from 'react'
import { defaultColors } from '../../assets/colors/default-colors';

const Icons = ({ hasBackground }) => {
  const blue = defaultColors.blue;
  const green = defaultColors.green;
  const red = defaultColors.red;

  return (
    <div className="icons d-flex justify-content-end" style={hasBackground ? {position: "absolute", bottom: 0, right: 0} : {display: "block"}}>
      <i className="bi bi-heart-fill" style={hasBackground ? {backgroundColor: green} : {color: green}}></i>
      <i className="bi bi-bookmark-fill" style={hasBackground ? {backgroundColor: green} : {color: green}}></i>
      <i className="bi bi-share-fill" style={hasBackground ? {backgroundColor: blue} : {color: blue}}></i>
    </div>
  )
}

export default Icons