import React, { Component } from 'react';
import file from './api/search.htm';
import logo from './logo.svg';
import './App.css';
import Amplify, { Auth, API } from 'aws-amplify';
import { AmplifyAuthenticator, AmplifyContainer, AmplifySignIn, AmplifySignOut } from '@aws-amplify/ui-react'; 
import { AmplifyButton, AmplifyInput } from '@aws-amplify/ui-react'; 
import { I18n } from 'aws-amplify';
import { vocabularies } from './vocabularies2';
import aws_exports from './aws-exports2';
Amplify.configure(aws_exports);

Amplify.configure({
  Auth: {
    identityPoolId: 'ap-northeast-1:e7495629-4820-4a34-a4ab-2858a8592b3c',
    region: 'ap-northeast-1', 
    userPoolId: 'ap-northeast-1_Pif7YAiJv', 
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

  var searchKeyword = "aws";

  componentDidMount() {
    sessionStorage.setItem( "aws_region" , aws_exports.aws_project_region );
    sessionStorage.setItem( "aws_poolid" , aws_exports.aws_user_pools_id );
    sessionStorage.setItem( "aws_clitid" , aws_exports.aws_user_pools_web_client_id );
  }

  handleClick = async function () {
    const apiName = 'SearchFunction';
    const path = '';
    //--const user = await Auth.currentAuthenticatedUser();
    //--const token = user.signInUserSession.idToken.jwtToken;
    var keyword = this.searchKeyword;
    if(keyword == '') {
      keyword = 'aws';
    }
      
    const option = {
      headers: {
        //--Authorization: token,
        accept: 'text/html'
      },
      'queryStringParameters': {
        'q': keyword
      }
    };

    var res = await API.get(apiName, path, option);
    if ( res == null ) {
      res = "<p>null が返却されました。</p>";
    }
    console.log(res);
    document.getElementById('emb').innerHTML = res;
  };

  render() {
    return (
      <AmplifyContainer>
        <AmplifyAuthenticator>
          <AmplifySignIn slot="sign-in" hideSignUp></AmplifySignIn>
          <AmplifySignOut />
          <center>
            <legend>検索実行</legend>
            <label >検索文字列 : </label>
            <AmplifyInput id="scTxt" value={this.searchKeyword} type="text" placeholder="検索キーワード入力"></AmplifyInput>
            <AmplifyButton type="button" onclick={this.handleClick}>検索</AmplifyButton>
            <div id="emb">
  　        </div>
          </center>
        </AmplifyAuthenticator>
      </AmplifyContainer>
    );
  }
}

export default App;
