import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react';

import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import Post from './components/pages/Post';
import Login from "./components/auth/Login";

import "./App.css";

const config = {
  issuer: "https://dev-310356.oktapreview.com/oauth2/default",
  redirect_uri: window.location.origin + "/implicit/callback",
  client_id: "0oag0bpwgzoyH86fV0h7"
};

function onAuthRequired({history}){
  history.push('/login');
}

class App extends Component {
  render() {
    return (
      <Router>
          <Security issuer={config.issuer} client_id={config.client_id} redirect_uri={config.redirect_uri} onAuthRequired={onAuthRequired}>
            <div className="App">
              <Navbar />
              <div className="container">
                <Route path="/" exact={true} component={Home} />
                <SecureRoute path="/posts" exact={true} component={Post} />
                <Route path="/login" render={() => <Login baseUrl="https://dev-310356.oktapreview.com" />} />
              <Route path='/implicit/callback' component={ImplicitCallback} />
              </div>
            </div>
          </Security>
        </Router>
    );
  }
}

export default App;
