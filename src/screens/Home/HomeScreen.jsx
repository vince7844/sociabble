import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { defaultColors } from '../../assets/colors/default-colors';
import Card from '../../components/Card/Card';
import PostModal from '../../components/Modal/Modal';
import { LikeContext } from '../../contexts/LikeContext';
import "./HomeStyle.scss"

const Home = () => {
  const { state } = useLocation();

  // For Cards rendering, multiple times
  const posts = state.dataPosts;

  const [liked, setLiked] = useState(false)
  // const [dimension, setDimension] = useState({});
  const [showModal, setShowModal] = useState(false)
  const [postIndex, setPostIndex] = useState(null);

  // For Modal rendering, once
  const post = posts[postIndex]
  // const postId = post.Id

  useEffect(() => {
    console.log("Home data = ", posts)
    console.log("a post = ", post)
  })

  // Store image size
  // const onImgLoad = ({ target: img }) => {
  //   setDimension({
  //     height: img.offsetHeight,
  //     width: img.offsetWidth
  //   })
  // }

  // Render image depending of its size
  // const changeSize = idx => {
  //   switch(idx%18) {
  //     case 0:
  //     case 9: 
  //       return 'col-12 col-sm-6 col-md-6'  
  //   }
  //   return 'col-12 col-sm-6 col-md-3' 
  // }

  // When clicking on a specific card, retrieve the id of the card, and show modal
  const handleClickCard = (e, postIndex) => {
    setShowModal(true)
    setPostIndex(postIndex)
  }

  return (
    <LikeContext.Provider value={{liked, setLiked, /* token, postId */}}>
      <div className="home-screen">
        <div className="navigation">
          <nav style={{backgroundColor: defaultColors.blue}} 
              className="navbar p-3 justify-content-start">
            <div className="hamburger-icon">
              <div></div>
              <div></div>
              <div></div>
            </div>
            <p className="text-white m-0 ps-3">Sociabble Test Tech Front</p>
          </nav>
        </div>
        <div className="post-cards row px-3 py-5 gx-0">
          {/* Display all cards */}
          { posts.map((post, postIndex) => 
              <div className={`card-container col-12 col-sm-6 col-md-3 p-2`} key={post.Id}>
                <Card postImageUrl={post.ContentImageUrl}
                      postTitle={post.Title}
                      postSocialNetworkName={post.SocialNetworkType}
                      postCreator={post.SocialAccountDisplayName}
                      postUserProfilePicture={post.AccountProfilePicture}
                      onCardClick={e => handleClickCard(e, postIndex)} />
              </div>
            )} 
        </div>
        {/* Render modal, check first the postIndex */}
        { (postIndex || postIndex === 0) &&
            <PostModal 
              showPostModal={showModal} 
              hidePostModal={() => setPostIndex(null)}
              postImageUrl={post.ContentImageUrl}
              postTitle={post.Title}
              postSocialNetworkName={post.SocialNetworkType}
              postCreator={post.SocialAccountDisplayName}
              postUserProfilePicture={post.AccountProfilePicture} /> 
        }
      </div>
    </LikeContext.Provider>
  )
}

export default Home;
