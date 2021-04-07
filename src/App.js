import React, { Component } from 'react';
//--import { FormSection, SectionHeader, SectionBody, SectionFooter, InputRow, ButtonRow, Link, } from 'aws-amplify-react';
import file from './api/search.htm';
import logo from './logo.svg';
import './App.css';
//--import { withMyAuthenticator } from './MyAuth';
import Amplify, { Auth, API } from 'aws-amplify';
import { AmplifyAuthenticator, AmplifyContainer, AmplifySignIn, AmplifySignOut } from '@aws-amplify/ui-react'; 
import { AmplifyButton, AmplifyInput } from '@aws-amplify/ui-react'; 
import { I18n } from 'aws-amplify';
import { vocabularies } from './vocabularies2';
import aws_exports from './aws-exports';
Amplify.configure(aws_exports);

Amplify.configure({
    // OPTIONAL - if your API requires authentication 
    Auth: {
        // REQUIRED - Amazon Cognito Identity Pool ID
        identityPoolId: 'ap-northeast-1:f749b712-c439-48f4-9fa5-a7ce66fdbc25',
        // REQUIRED - Amazon Cognito Region
        region: 'ap-northeast-1', 
        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: 'ap-northeast-1_S01Kqn7pX', 
        // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
        userPoolWebClientId: '30j2k1vbmbsc85hqbi7omo8pp6',
    },
    API: {
        endpoints: [
            {
                name: "SearchFunction",
                endpoint: " https://gf3u303pmb.execute-api.ap-northeast-1.amazonaws.com"
            }
        ]
    }
});

// 
I18n.putVocabularies(vocabularies);
I18n.setLanguage('ja');

// 
function useScript(url) {
  const script = document.createElement('script');
  script.src = url;
  script.async = true;
  document.body.appendChild(script);
}

class App extends React.Component {
  
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
    sessionStorage.setItem( "aws_region" , aws_exports.aws_project_region );
    sessionStorage.setItem( "aws_poolid" , aws_exports.aws_user_pools_id );
    sessionStorage.setItem( "aws_clitid" , aws_exports.aws_user_pools_web_client_id );
    
    fetch(file)
      .then( res => res.text() )
      .then( text => document.querySelector('#inner').innerHTML = text );
  }

  callScript = () => {
    alert("call script");
    //--callSearchApi();
  }

  render() {
    return (
      <AmplifyContainer>
        <AmplifyAuthenticator>
          <AmplifySignIn slot="sign-in" hideSignUp></AmplifySignIn>
          <AmplifySignOut />
          <div id="inner"></div>
        </AmplifyAuthenticator>
      </AmplifyContainer>
    );
  }
}

export default App;
//--export default withMyAuthenticator(App, true);
