import React from 'react'
import { connect } from 'react-redux'
import { formatTweet, formatDate } from '../utils/helpers'
import { handleToggleLikeTweet } from '../actions/tweets'
import TiHeartOutline from 'react-icons/lib/ti/heart-outline'
import TiHeartFullOutline from 'react-icons/lib/ti/heart-full-outline'
import TiArrowBackOutline from 'react-icons/lib/ti/arrow-back-outline'
import { Link, withRouter } from 'react-router-dom'

class Tweet extends React.Component {
  handleLike = (e) => {
    e.preventDefault()
    const { dispatch, authedUser, tweet } = this.props
    dispatch(handleToggleLikeTweet({
      id: tweet.id,
      hasLiked: tweet.hasLiked,
      authedUser
    }))
  }

  toParent = (e, parentId) => {
    e.preventDefault()
    this.props.history.push(`/tweet/${parentId}`)
  }

  render() {
    if (this.props.tweet === null) {
      return <p className="tweet">This tweet does not exists</p>
    }

    const {
      name, avatar, timestamp, text, hasLiked, likes, replies, parent, id
    } = this.props.tweet

    return (
      <Link to={`/tweet/${id}`} className="tweet">
        <img
          src={avatar}
          alt={`Avatar of ${name}`}
          className="avatar" />
        <div className="tweet-info">
          <div>
            <span>{name}</span>
            <div>{formatDate(timestamp)}</div>
            {parent && (
              <button className="replying-to" onClick={(e) => this.toParent(e, parent.id)}>
                Replying to @{parent.author}
              </button>
            )}
            <p>{text}</p>
          </div>
          <div className="tweet-icons">
            <TiArrowBackOutline className="tweet-icon" />
            <span>{replies !== 0 && replies}</span>
            <button className="heart-button" onClick={this.handleLike}>
              {hasLiked === true
                ? <TiHeartFullOutline color="#e0245e" className="tweet-icon" />
                : <TiHeartOutline className="tweet-icon" />
              }
            </button>
            <span>{likes !== 0 && likes}</span>
          </div>
        </div>
      </Link>
    )
  }
}

const mapStateToProps = ({ tweets, users, authedUser }, { id }) => {
  const tweet = tweets[id]
  const replyingTo = tweet ? tweets[tweet.replyingTo] : null

  return {
    authedUser: authedUser,
    tweet: tweet ? formatTweet(tweet, users[tweet.author], authedUser, replyingTo) : null
  }
}

export default withRouter(connect(mapStateToProps)(Tweet))
