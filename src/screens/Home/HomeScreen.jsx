import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import "./HomeStyle.scss"

const Home = () => {
  const { state } = useLocation();
  const posts = state.dataPosts

  useEffect(() => {
    console.log("Home data = ", posts)
  })

  return (
   <h1>Home page</h1>
  )
}

export default Home;
