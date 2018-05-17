import { connect } from 'react-redux'
import React from 'react'
import { handleAddTweet } from '../actions/tweets'
import { Redirect } from 'react-router-dom'


class NewTweet extends React.Component {
  state = {
    text: '',
    toHome: false
  }

  handleChange = (e) => {
    const text = e.target.value
    this.setState(() => ({
      text
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { text } = this.state
    const { dispatch, id } = this.props

    dispatch(handleAddTweet(text, id))

    this.setState(() => ({
      text: '',
      toHome: id ? false : true
    }))
  }

  render() {
    const { text, toHome } = this.state
    const tweetLength = 280 - text.length

    if (toHome === true) {
      return <Redirect to="/" />
    }

    return (
      <div>
        <h3 className="center">Componse new Tweet</h3>
        <form className="new-tweet" onSubmit={this.handleSubmit}>
          <textarea placeholder="What's happening?"
            value={text}
            onChange={this.handleChange}
            className="textarea"
            maxLength={280} />
          {tweetLength <= 100 && (
            <div className="tweet-length">{tweetLength}</div>
          )}
          <button
            className="btn"
            type="submit"
            disabled={text === ''}>Submit</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = ({ authedUser }) => {
  return { authedUser }
}

export default connect(mapStateToProps)(NewTweet)
