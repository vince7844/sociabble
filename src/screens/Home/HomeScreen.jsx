import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { defaultColors } from '../../assets/colors/default-colors';
import Card from '../../components/Card/Card';
import PostModal from '../../components/Modal/Modal';
import Spinner from '../../components/Spinner/Spinner';
import { LikeContext } from '../../contexts/LikeContext';
import { getChannels, getPostsByChannelId } from '../../services/app.services';
import "./HomeStyle.scss"

const Home = () => {
  const { state } = useLocation();
  const posts = state.dataPosts;
  const token = state.userToken;

  const blue = defaultColors.blue

  const [liked, setLiked] = useState(false)
  // const [dimension, setDimension] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [postIndex, setPostIndex] = useState(null);
  const [channels, setChannels] = useState([]);
  const [newPosts, setNewPosts] = useState(null)
  const [loadingChannels, setLoadingChannels] = useState(false);
  const [loadingNewPosts, setLoadingNewPosts] = useState(false);
  const [channelButtonClicked, setChannelButtonClicked] = useState(false)

  const channelUrl = 'Api/1_0/Channels/GetAllLight';

  // For Modal rendering, once
  const postsToDisplay = newPosts ? newPosts : posts
  const post = postsToDisplay[postIndex]
  // const postId = post.Id

  useEffect(() => {
   async function handleClickChannelButton() {
      try {
        setLoadingChannels(true)
        const channel_API = await getChannels(channelUrl, token);
        console.log("Channel API = ", channel_API.data);
        const dataChannel = channel_API.data;
        setChannels(dataChannel.Channels);
      } catch (e) {
        console.error(e.message);
      }
  
      setLoadingChannels(false);
    } handleClickChannelButton();
  }, [channelButtonClicked, token])


  const handleClickChannelName = async (e, channelId) => {
    e.preventDefault();
    const newPostUrl = `Api/1_0/posts/Channel/${channelId}?count=36`

    try {
      setLoadingNewPosts(true)
      const newPosts_API = await getPostsByChannelId(newPostUrl, token);
      console.log("NEW POST API = ", newPosts_API.data);
      const dataNewPosts = newPosts_API.data;
      setNewPosts(dataNewPosts.Posts);
    } catch (e) {
      console.error(e.message);
    }

    setLoadingNewPosts(false);
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
          <button style={{backgroundColor: blue}} onClick={() => setChannelButtonClicked(true)} 
                  className="btn dropdown-toggle text-white" type="button" id="dropDownChannel" 
                  data-bs-toggle="dropdown" aria-expanded="false">
            CHANNEL
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropDownChannel">
            { loadingChannels 
                ? <Spinner />
                : channels 
                    ? channels.map(channel => 
                        <li key={channel.Id} onClick={e => handleClickChannelName(e, channel.Id)}>
                          <a className="dropdown-item" href="/">{channel.Name}</a>
                        </li>)
                    : <li className="p-2">No channels !</li> 
            }
          </ul>
        </div>
        {/* POST CARDS */}
        <div className="post-cards row px-3 py-5 gx-0">
          {/* Display all cards */}
          { loadingNewPosts 
             ? <Spinner />
             : postsToDisplay.map((post, postIndex) => 
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