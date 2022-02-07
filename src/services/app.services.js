import axios from 'axios';

export const getPosts = (apiUrl, token) => {
  return axios.get(apiUrl, { 
    headers: {
      "X-Sociabble-Device": "app",
      "Authorization": "Bearer " + token,
      "Content-Type": "application/json"
    }
  })
}

export const postLike = (apiUrl, token, pId) => {
  return axios.post(apiUrl, {
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