import React, { Component } from 'react';
import file from './api/search.htm';
import logo from './logo.svg';
import './App.css';
import { withAuthenticator } from 'aws-amplify-react'
import Amplify, { Auth } from 'aws-amplify';
import aws_exports from './aws-exports';
Amplify.configure(aws_exports);
// script.js
//--import { callSearchApi } from './script.js';

class App extends Component {
  componentDidMount() {
    //@@
    const script = document.createElement("script");
    script.src = "/api/js/script.js";
    script.async = true;
    document.body.appendChild(script);
    //++
    fetch(file)
      .then( res => res.text() )
      .then( text => document.querySelector('#inner').innerHTML = text );
  }

  render() {
    return (
      <div id="inner"></div>
    );
  }
}

export default withAuthenticator(App, true);
