import React, { Component } from 'react';
import file from './api/search.htm';
import logo from './logo.svg';
import './App.css';
import { withAuthenticator } from 'aws-amplify-react'
import Amplify, { Auth } from 'aws-amplify';
import aws_exports from './aws-exports';
Amplify.configure(aws_exports);
  
function useScript(url) {
  const script = document.createElement('script');
  script.src = url;
  script.async = true;
  document.body.appendChild(script);
}

class App extends Component {
  
  componentDidMount() {
    useScript('https://sdk.amazonaws.com/js/aws-sdk-2.7.19.min.js');
    useScript('https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js');
    useScript('/api/js/script.js');
    useScript('/api/js/apigClient.js');
    useScript('/api/js/amazon-cognito-identity.min.js');
    useScript('/api/js/lib/axios/dist/axios.standalone.js');
    useScript('/api/js/lib/CryptoJS/components/hmac.js');
    useScript('/api/js/lib/CryptoJS/components/enc-base64.js');
    useScript('/api/js/lib/url-template/url-template.js');
    useScript('/api/js/lib/apiGatewayCore/sigV4Client.js');
    useScript('/api/js/lib/apiGatewayCore/apiGatewayClient.js');
    useScript('/api/js/lib/apiGatewayCore/simpleHttpClient.js');
    useScript('/api/js/lib/apiGatewayCore/utils.js');
    useScript('/api/js/lib/CryptoJS/rollups/hmac-sha256.js');
    useScript('/api/js/lib/CryptoJS/rollups/sha256.js');
    
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
