import React, { Component } from 'react';
//--import { FormSection, SectionHeader, SectionBody, SectionFooter, InputRow, ButtonRow, Link, } from 'aws-amplify-react';
import file from './api/search.htm';
import logo from './logo.svg';
import './App.css';
//--import { withMyAuthenticator } from './MyAuth';
import Amplify, { Auth } from 'aws-amplify';
import { AmplifyAuthenticator, AmplifyContainer, AmplifySignIn, AmplifySignOut } from '@aws-amplify/ui-react'; 
import { I18n } from 'aws-amplify';
import { vocabularies } from './vocabularies2';
import aws_exports from './aws-exports';
Amplify.configure(aws_exports);

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
    sessionStorage.setItem( "aws_region" , aws_exports.aws_project_region );
    sessionStorage.setItem( "aws_poolid" , aws_exports.aws_user_pools_id );
    sessionStorage.setItem( "aws_clitid" , aws_exports.aws_user_pools_web_client_id );
    
    //++fetch(file)
    //++  .then( res => res.text() )
    //++  .then( text => document.querySelector('#inner').innerHTML = text );
  }

  render() {
    return (
      <AmplifyContainer>
        <AmplifyAuthenticator>
          <AmplifySignIn slot="sign-in" hideSignUp></AmplifySignIn>
          <AmplifySignOut />
          <!--div id="inner"--><!--/div-->
          <center>
            <legend>検索実行</legend>
            <!--input search word-->
              <div class="form-group">
                <label class="col-sm-2">検索文字列 : </label>
                <input class="form-control" id="scTxt" value="" type="text" placeholder="検索したいキーワードを入力">
              </div>
              <!--search execution button by api gateway-->
              <div class="form-group">
                <button type="button" id="apiBtn" class="btn btn-lg btn-primary btn-block" onclick="callSearchApi();">検索 API 実行</button>
              </div>
          </center>
          <!--show search result-->
  　      <div class="form-group2" id="emb">
  　      </div>      
        </AmplifyAuthenticator>
      </AmplifyContainer>
    );
  }
}

export default App;
//--export default withMyAuthenticator(App, true);
