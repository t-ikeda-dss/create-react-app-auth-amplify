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
    //    identityPoolId: 'ap-northeast-1:f749b712-c439-48f4-9fa5-a7ce66fdbc25',
        // REQUIRED - Amazon Cognito Region
    //    region: 'ap-northeast-1', 
        // OPTIONAL - Amazon Cognito User Pool ID
    //    userPoolId: 'ap-northeast-1_S01Kqn7pX', 
        // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    //    userPoolWebClientId: '30j2k1vbmbsc85hqbi7omo8pp6',
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

  handleClick = async function () {
    const user = await Auth.currentAuthenticatedUser();
    const token = user.signInUserSession.idToken.jwtToken;
    const myInit = {
      headers: {
        Authorization: token,
      },
      'queryStringParameters': {
        'q': 'aws'
      }
    };

    const res = await API.get('SearchFunction', '', myInit);
    console.log(res);
    var objEmb = document.getElementById('emb');
  　objEmb.innerHTML = res;
  };

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
            <button type="button" onclick="callSearchApi();">Amplify のボタン</button>
            <AmplifyButton type="button" onclick={this.handleClick}>Amplify のボタン</AmplifyButton>
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
