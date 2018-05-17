import React, { Component, Fragment } from 'react'
import { handleInitialData } from '../actions/shared';
import { connect } from 'react-redux';
import Dashboard from './Dashboard';
import LoadingBar from 'react-redux-loading'
import TweetPage from './TweetPage'
import NewTweet from './NewTweet'
import Nav from './Nav'
import { BrowserRouter as Router, Route } from 'react-router-dom'

class App extends Component {
  componentDidMount = () => {
    this.props.dispatch(handleInitialData());
  }

  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className="container">
            <Nav />
            {this.props.loading === true
              ? null
              :
              <div>
                <Route path="/" exact component={Dashboard} />
                <Route path="/tweet/:id" exact component={TweetPage} />
                <Route path="/new" exact component={NewTweet} />
              </div>
            }
          </div>
        </Fragment>
      </Router>
    )
  }
}

export default connect(({ authedUser }) => (
  { loading: authedUser }
))(App);
