import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { withAuthenticator } from 'aws-amplify-react'
import Amplify, { Auth } from 'aws-amplify';
import aws_exports from './aws-exports';
Amplify.configure(aws_exports);
// script.js
//--import { callSearchApi } from './script.js';
import file from '../api/search.html';

class App extends Component {
  componentDidMount() {
    fetch(file)
      .then( res => res.text() )
      .then( text => document.querySelector('#inner').innerHTML = text );
  }

  render() {
    // page transition
    //--window.location.href = '../api/search.html';
    return (
      <div id="inner"></div>
    );
  }
}

export default withAuthenticator(App, true);
