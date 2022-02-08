import axios from 'axios';

export const getPosts = (postUrl, token) => {
  return axios.get(postUrl, { 
    headers: {
      "X-Sociabble-Device": "app",
      "Authorization": "Bearer " + token,
      "Content-Type": "application/json"
    }
  })
}

export const addLike = (likeUrl, token, pId) => {
  return axios.post(likeUrl, {
    postId: pId,
    channelId: "00000000-0000-0000-0000-000000000000",
    targetNetworkType: "sociabble"
  }, { 
    headers: {
      "X-Sociabble-Device": "app",
      "Authorization": "Bearer " + token,
      "Content-Type": "application/json"
    }
  })
}

export const getChannels = (channelUrl, token) => {
  return axios.get(channelUrl, { 
    headers: {
      "X-Sociabble-Device": "app",
      "Authorization": "Bearer " + token,
      "Content-Type": "application/json"
    }
  })
}