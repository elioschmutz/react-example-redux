import { saveLikeToggle } from '../utils/api'

export const RECEIVE_TWEETS = 'RECEIVE_TWEETS'
export const TOGGLE_LIKE_TWEET = 'TOGGLE_LIKE_TWEET'

export function receiveTweets(tweets) {
  return {
    type: RECEIVE_TWEETS,
    tweets
  }
}


export function toggleLikeTweet({ id, hasLiked, authedUser }) {
  return {
    type: TOGGLE_LIKE_TWEET,
    id,
    hasLiked,
    authedUser
  }
}

export function handleToggleLikeTweet(info) {
  return (dispatch) => {
    dispatch(toggleLikeTweet(info))
    saveLikeToggle(info).catch(() => {
      dispatch(toggleLikeTweet(info))
      alert('There was an error while toggling a tweet')
    })
  }
}
