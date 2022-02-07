import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { defaultColors } from '../../assets/colors/default-colors';
import Card from '../../components/Card/Card';
import PostModal from '../../components/Modal/Modal';

// import "./HomeStyle.scss"

const Home = () => {
  const { state } = useLocation();

  // For Cards rendering, multiple times
  const posts = state.dataPosts;

  const [dimension, setDimension] = useState({});
  const [showModal, setShowModal] = useState(false)
  const [postId, setPostId] = useState(null);

  // For Modal rendering, once
  const post = posts[postId]

  // useEffect(() => {
  //   console.log("Home data = ", posts)
  // })

  // Store image size
  const onImgLoad = ({ target: img }) => {
    setDimension({
      height: img.offsetHeight,
      width: img.offsetWidth
    })
  }

  // Render image depending of its size
  const changeSize = idx => {
    switch(idx%18) {
      case 0:
      case 9: 
        return 'col-12 col-sm-6 col-md-6'  
    }
    return 'col-12 col-sm-6 col-md-3' 
  }

  // When clicking on a specific card, retrieve the id of the card, and show modal
  const handleClickCard = (e, postIndex) => {
    setShowModal(true)
    setPostId(postIndex)
  }

  return (
    <div className="home-screen mt-5">
      <div className="navigation fixed-top">
        <nav style={{backgroundColor: defaultColors.backgroundBlue}} 
            className="navbar p-2 justify-content-start">
          <p className="text-white m-0 ps-3">Sociabble Test Tech Front</p>
        </nav>
      </div>
      <div className="post-cards row p-5">
        {/* Display all cards */}
        { posts.map((post, postIndex) => 
            <div className={`card-container col-12 col-sm-6 col-md-3 p-2`} key={post.Id}>
              <Card postImageUrl={post.ContentImageUrl}
                    postTitle={post.Title}
                    postCreator={post.SocialAccountDisplayName}
                    postUserProfilePicture={post.AccountProfilePicture}
                    onCardClick={e => handleClickCard(e, postIndex)} />
            </div>
          )} 
      </div>
      {/* Render modal, check first if there is a post id or not */}
      { (postId || postId === 0) &&
          <PostModal 
            showPostModal={showModal} 
            hidePostModal={() => setPostId(null)}
            postImageUrl={post.ContentImageUrl}
            postTitle={post.Title}
            postCreator={post.SocialAccountDisplayName}
            postUserProfilePicture={post.AccountProfilePicture} /> 
      }
    </div>
  )
}

export default Home;
