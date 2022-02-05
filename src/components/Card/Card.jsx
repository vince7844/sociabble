import React, { useEffect, useState } from 'react';
import "./CardStyle.scss";
import noImageIcon from "../../assets/images/default/no-image-icon.png";

const Card = ({ 
  postImageUrl,
  postTitle,
  postSocialMedia,
  postUserProfilePicture }) => {

  const [dimension, setDimension] = useState({})

  // Render image depending of it size
  const changeSize = idx => {
    switch(idx%18) {
      case 0:
      case 9: 
        return 'col-12 col-sm-6 col-md-6'  
    }
    return 'col-12 col-sm-6 col-md-4' 
  }

  // Store image size
  const onImgLoad = ({ target: img }) => {
    setDimension({
      height: img.offsetHeight,
      width: img.offsetWidth
    })
  }

  // Check image size
  useEffect(() => {
    console.log(`image width: ${dimension.width} / image height: ${dimension.height}`)
  })

  return (
    <div className={`card-container ${changeSize(dimension.width)} p-2`}>
      <div className="card border-0">
        {
          postImageUrl 
            ? <img src={postImageUrl} 
                   onError={({ currentTarget }) => {
                     currentTarget.onerror = null;
                     currentTarget.src = noImageIcon
                   }}
                   onLoad={onImgLoad}
                   className="card-img card-img-top" 
               />
            : <img src={noImageIcon} className="card-img card-img-top" />
        }
        <div className="description">
          <div className="social-media-info d-flex">
            <img src={postUserProfilePicture} width="30" height="30" className="me-3"/>
            <p className="social-media-name"><strong>{postSocialMedia}</strong></p>
          </div>
          <p className="social-media-title mt-2">{postTitle}</p>
        </div>
      </div>
    </div>
  )
}

export default Card;