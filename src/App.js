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
import aws_exports from './aws-exports2';
Amplify.configure(aws_exports);

Amplify.configure({
    // OPTIONAL - if your API requires authentication 
    Auth: {
        // REQUIRED - Amazon Cognito Identity Pool ID
        identityPoolId: 'ap-northeast-1:e7495629-4820-4a34-a4ab-2858a8592b3c',
        // REQUIRED - Amazon Cognito Region
        region: 'ap-northeast-1', 
        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: 'ap-northeast-1_Pif7YAiJv', 
        // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
        userPoolWebClientId: '57b2eetaf7vo2jo7gkvj2g0g4d',
    },
    API: {
        endpoints: [
            {
                name: "SearchFunction",
                endpoint: "https://gf3u303pmb.execute-api.ap-northeast-1.amazonaws.com/default/SearchFunction"
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
    sessionStorage.setItem( "aws_region" , aws_exports.aws_project_region );
    sessionStorage.setItem( "aws_poolid" , aws_exports.aws_user_pools_id );
    sessionStorage.setItem( "aws_clitid" , aws_exports.aws_user_pools_web_client_id );
    
    //fetch(file)
    //  .then( res => res.text() )
    //  .then( text => document.querySelector('#inner').innerHTML = text );
  }

  GetSearchApi = () => {
    const apiName = 'SearchFunction';
    const path = '';
    //--const user = await Auth.currentAuthenticatedUser();
    //--const token = user.signInUserSession.idToken.jwtToken;
    var keyword = document.getElementById('scTxt').value;
      
    const option = {
      headers: {
        //--Authorization: token,
      },
      'queryStringParameters': {
        'q': keyword
      }
    };

    return API.get(apiName, path, option);
      
    //API
    //  .get(apiName, path, option)
    //  .then(response => {
    //    console.log(response);
    //    var objEmb = document.getElementById('emb');
    //  　objEmb.innerHTML = response;
    //  })
    //  .catch(error => {
    //    console.log(error);
    //  });

    //const res = await API.get(apiName, path, option);
  };

  handleClick = async function () {
  //handleClick = () => {
      //var keyword = document.getElementById('scTxt').value;
      var response = await GetSearchApi();
      var objEmb = document.getElementById('emb');
    　objEmb.innerHTML = response;
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
          <center>
            <legend>検索実行</legend>
            <label >検索文字列 : </label>
            <AmplifyInput id="scTxt" value="" type="text" placeholder="検索したいキーワードを入力"></AmplifyInput>
            <AmplifyButton type="button" onclick={this.callScript}>Alert 表示</AmplifyButton>
            <AmplifyButton type="button" onclick={this.handleClick}>API Call</AmplifyButton>
            <div id="emb">
  　        </div>
          </center>
        </AmplifyAuthenticator>
      </AmplifyContainer>
    );
  }
}

export default App;
//--export default withMyAuthenticator(App, true);
