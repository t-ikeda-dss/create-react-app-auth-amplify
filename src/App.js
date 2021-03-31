import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { withAuthenticator } from 'aws-amplify-react'
import Amplify, { Auth } from 'aws-amplify';
import aws_exports from './aws-exports';
Amplify.configure(aws_exports);
// script.js
//--import { callSearchApi } from './script.js';

class App extends Component {
  render() {
    // page transition
    //--window.location.href = '../api/search.html';
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="../api/search.html"
          >
            search
          </a>
        </header>
      </div>
    );
  }
}

export default withAuthenticator(App, true);
