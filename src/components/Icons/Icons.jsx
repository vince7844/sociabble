import React, { useContext } from 'react'
import { defaultColors } from '../../assets/colors/default-colors';
import { LikeContext } from '../../contexts/LikeContext';
import { addLike } from '../../services/app.services';

const Icons = ({ hasBackground }) => {
  const blue = defaultColors.blue;
  const green = defaultColors.green;
  const red = defaultColors.red;
  const addLikeUrl = 'Api/1_0/Actions/Like';

  const { liked, setLiked, token, postId } = useContext(LikeContext)

  const handleLikeClick = () => {
    setLiked(!liked)
    // addLike(addLikeUrl, token, postId).then(res => console.log("add like ? ", res))
  }

  return (
    <div className="icons d-flex justify-content-end" style={hasBackground ? {position: "absolute", bottom: 0, right: 0} : {display: "block"}}>
      <i className="bi bi-heart-fill"
         onClick={!hasBackground ? handleLikeClick : null} 
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