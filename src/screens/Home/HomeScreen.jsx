import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { defaultColors } from '../../assets/colors/default-colors';
import Card from '../../components/Card/Card';
// import "./HomeStyle.scss"

const Home = () => {
  const { state } = useLocation();
  const posts = state.dataPosts

  useEffect(() => {
    console.log("Home data = ", posts)
  })

  return (
    <div className="home-screen mt-5">
      <div className="navigation fixed-top">
        <nav style={{backgroundColor: defaultColors.background}} 
            className="navbar p-2 justify-content-start">
          <p className="text-white m-0 ps-3">Sociabble Test Tech Front</p>
        </nav>
      </div>
      <div className="row p-5">
        { posts.map(post => <Card key={post.Id} 
                                  postImageUrl={post.ContentImageUrl}
                                  postTitle={post.Title} />)} 
      </div>
    </div>
  )
}

export default Home;
