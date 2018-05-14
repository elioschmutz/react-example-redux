import React, { Component } from 'react'
import { handleInitialData } from '../actions/shared';
import { connect } from 'react-redux';
import Dashboard from './Dashboard';
import LoadingBar from 'react-redux-loading'
import TweetPage from './TweetPage'

class App extends Component {
  componentDidMount = () => {
    this.props.dispatch(handleInitialData());
  }

  render() {
    return (
      <div>
        <LoadingBar />
        {this.props.loading === true
          ? null
          : <TweetPage match={{params: {id: '2mb6re13q842wu8n106bhk'}}} />
        }
      </div>
    )
  }
}

export default connect(({ authedUser }) => (
  { loading: authedUser }
))(App);
