import { connect } from 'react-redux'
import React from 'react'
import { handleAddTweet } from '../actions/tweets'


class NewTweet extends React.Component {
  state = {
    text: ''
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
      text: ''
    }))
  }

  render() {
    const { text } = this.state
    const tweetLength = 280 - text.length

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
