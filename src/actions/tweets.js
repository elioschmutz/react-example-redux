import { saveLikeToggle, saveTweet } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_TWEETS = 'RECEIVE_TWEETS'
export const TOGGLE_LIKE_TWEET = 'TOGGLE_LIKE_TWEET'
export const ADD_TWEET = 'ADD_TWEET'

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

export function addTweet(tweet) {
  return {
    type: ADD_TWEET,
    tweet
  }
}

export function handleAddTweet(text, replyingTo) {
  return (dispatch, getState) => {
    const { authedUser } = getState()
    dispatch(showLoading())
    saveTweet({
      text,
      author: authedUser,
      replyingTo
    }).then((tweet) => {
      dispatch(addTweet(tweet))
    }).catch((e) => {
      alert('There was an error while adding a tweet')
    }).finally(() => {
      dispatch(hideLoading())
    })
  }
}
