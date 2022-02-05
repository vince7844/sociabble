import React from 'react';
import "./CardStyle.scss";
import noImageIcon from "../../assets/images/default/no-image-icon.png";

const Card = ({ postImageUrl, postTitle }) => {
  const posImage = () => {

  }

  return (
    <div className="col-12 col-sm-6 col-md-3 p-2">
      <div className="card border-0">
        {
          postImageUrl 
            ? <img src={postImageUrl} 
                   onError={({ currentTarget }) => {
                     currentTarget.onerror = null;
                     currentTarget.src = noImageIcon
                   }}
                   className="card-img-top"
                   style={{ maxHeight: "250px" }} />
            : <img src={noImageIcon} className="card-img-top" style={{ maxHeight: "250px" }} />
        }
        <div className="description-space">
          <p>{postTitle}</p>
        </div>
      </div>
    </div>
  )
}

export default Card;