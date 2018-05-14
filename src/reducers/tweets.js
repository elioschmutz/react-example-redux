import { RECEIVE_TWEETS, TOGGLE_LIKE_TWEET } from '../actions/tweets'

export default function tweets(state = {}, action) {
  switch (action.type) {
    case RECEIVE_TWEETS:
      return {
        ...state,
        ...action.tweets
      }
    case TOGGLE_LIKE_TWEET:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          likes: action.hasLiked === true
            ? state[action.id].likes.filter((author) => author !== action.authedUser)
            : state[action.id].likes.concat([action.authedUser])
        }
      }
    default:
      return state
  }
}
