import axios from 'axios';

const HEADER = (token) => {
  const params = {
    "X-Sociabble-Device": "app",
    "Authorization": "Bearer " + token,
    "Content-Type": "application/json"
  } 
  return params;
}

export const getPosts = (postUrl, token) => {
  return axios.get(postUrl, { 
    headers: HEADER(token)
  })
}

export const getPostsByChannelId = (newPostUrl, token) => {
  return axios.get(newPostUrl, { 
    headers: HEADER(token)
  })
}

export const addLike = (likeUrl, token, pId) => {
  return axios.post(likeUrl, {
    postId: pId,
    channelId: "00000000-0000-0000-0000-000000000000",
    targetNetworkType: "sociabble"
  }, { 
    headers: HEADER(token)
  })
}

export const getChannels = (channelUrl, token) => {
  return axios.get(channelUrl, { 
    headers: HEADER(token)
  })
}