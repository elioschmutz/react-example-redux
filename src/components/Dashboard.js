import React from 'react';
import { connect } from 'react-redux'

class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <h3 className="center">Your Timeline</h3>
        <ul className="dashboard-list">
          {this.props.tweetIds.map((tweetId) => (
            <li key={tweetId}>
              <div>TWEET ID: {tweetId}</div>
            </li>
          ))}
        </ul>
      </div>

    )
  }
}

const mapStateToProps = ({ tweets }) => (
  {
    tweetIds: Object.keys(tweets)
      .sort((a, b) => tweets[a].timestamp - tweets[b].timestamp)
  }
)

export default connect(mapStateToProps)(Dashboard)
