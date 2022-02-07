import React, { useEffect, useState } from 'react';
import "./CardStyle.scss";
import noImageIcon from "../../assets/images/default/no-image-icon.png";
import { defaultColors } from '../../assets/colors/default-colors';

const Card = ({ 
  postImageUrl,
  postTitle,
  postCreator,
  postUserProfilePicture,
  onCardClick }) => {
  const [liked, isLiked] = useState(false);
  const postTitleTruncate = postTitle.length < 120 ? postTitle : postTitle.substring(0, 120) + '...';
  const bgBlue = defaultColors.backgroundBlue;
  const bgGreen = defaultColors.backgroundGreen;
  const bgRed = defaultColors.backgroundRed;

  return (
    <div className="card border-0" onClick={onCardClick}>
      {
        postImageUrl 
          ? <img src={postImageUrl} 
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = noImageIcon
                  }}
                //  onLoad={onImgLoad}
                  className="card-img card-img-top" 
              />
          : <img src={noImageIcon} className="card-img card-img-top" />
      }
      <div className="description">
        <div className="social-media-info d-flex">
          <img src={postUserProfilePicture} width="30" height="30" className="me-3" />
          <p className="social-media-creator"><strong>{postCreator}</strong></p>
        </div>
        <p className="social-media-title m-0">{postTitleTruncate}</p>
        <div className="icons d-flex justify-content-end">
          <i className="bi bi-heart-fill" style={{backgroundColor: liked ? bgRed : bgGreen}}></i>
          <i className="bi bi-bookmark-fill" style={{backgroundColor: bgGreen}}></i>
          <i className="bi bi-share-fill" style={{backgroundColor: bgBlue}}></i>
        </div>
      </div>
    </div>
  )
}

export default Card;