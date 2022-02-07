import React, { useEffect, useState } from 'react';
import "./CardStyle.scss";
import noImageIcon from "../../assets/images/default/no-image-icon.png";
import Icons from "../Icons/Icons";

const Card = ({ 
  postImageUrl,
  postTitle,
  postCreator,
  postUserProfilePicture,
  onCardClick }) => {
  const [liked, isLiked] = useState(false);
  const postTitleTruncate = postTitle.length < 120 ? postTitle : postTitle.substring(0, 120) + '...';

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
        <Icons hasBackground={true} />
      </div>
    </div>
  )
}

export default Card;