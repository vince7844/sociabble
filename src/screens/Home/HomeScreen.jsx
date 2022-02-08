import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { defaultColors } from '../../assets/colors/default-colors';
import Card from '../../components/Card/Card';
import PostModal from '../../components/Modal/Modal';
import { LikeContext } from '../../contexts/LikeContext';
import { getChannels } from '../../services/app.services';
import "./HomeStyle.scss"

const Home = () => {
  const { state } = useLocation();
  const blue = defaultColors.blue
  const channelUrl = 'Api/1_0/Channels/GetAllLight';
  // For Cards rendering, multiple times
  const posts = state.dataPosts;
  const token = state.userToken;

  const [liked, setLiked] = useState(false)
  // const [dimension, setDimension] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [postIndex, setPostIndex] = useState(null);
  const [channels, setChannels] = useState([]);
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false);

  // For Modal rendering, once
  const post = posts[postIndex]

  useEffect(() => {
    console.log("channels = ", channels)
  })

  const handleClickChannel = async (e) => {
    e.preventDefault();

    try {
      setLoading(true)
      const channel_API = await getChannels(channelUrl, token);
      console.log("Channel API = ", channel_API.data);
      const dataChannel = channel_API.data;
      setChannels(dataChannel.Channels);
    } catch (e) {
      console.error(e.message);
      setError(true);
    }

    setLoading(false);
  }

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
        {/* NAVIGATION BAR */}
        <div className="navigation">
          <nav style={{backgroundColor: blue}} 
              className="navbar p-3 justify-content-start">
            <div className="hamburger-icon">
              <div></div>
              <div></div>
              <div></div>
            </div>
            <p className="text-white m-0 ps-3">Sociabble Test Tech Front</p>
          </nav>
        </div>
        {/* CHANNEL DROPDOWN */}
        <div className="channel dropdown m-3">
          <button style={{backgroundColor: blue}} onClick={handleClickChannel} 
                  className="btn dropdown-toggle text-white" type="button" id="dropDownChannel" 
                  data-bs-toggle="dropdown" aria-expanded="false">
            CHANNEL
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropDownChannel">
            { loading 
                ? <div class="d-flex justify-content-center m-5">
                    <div className="me-4 spinner-border text-primary" role="status"></div>
                  </div>
                : channels.map(channel => <li><a className="dropdown-item" href="/home">{channel.Name}</a></li>)
            }
          </ul>
        </div>
        {/* POST CARDS */}
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
