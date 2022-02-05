import React from 'react';

const Card = ({ postImageUrl }) => {
  return (
    <div className="col-sm-4 p-2">
      <div className="card border-0">
        <img src={postImageUrl} className="card-img-top" alt="..." />
      </div>
    </div>
  )
}

export default Card;