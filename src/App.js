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
      },
      {
        // 
        name: "TestSearch",
        endpoint: "https://ln7hfi97tf.execute-api.ap-northeast-1.amazonaws.com/default/TestSearch"
      },
      {
        // 
        name: "PetStore",
        endpoint: "https://13g3hslrd5.execute-api.ap-northeast-1.amazonaws.com/default/pets"
      }
    ]
  }
});

// 
I18n.putVocabularies(vocabularies);
I18n.setLanguage('ja');

class App extends React.Component {

  searchKeyword = ""

  handleClick = async function () {
    const apiName = 'SearchFunction'
    const path = ''
    const user = await Auth.currentAuthenticatedUser()
    const token = user.signInUserSession.idToken.jwtToken

    var textObj = document.getElementById('scTxt')
    var keyword = textObj.firstChild.value
      
    const option = {
      headers: {
        //--Authorization: token,
        'header1': token,
      },
      'queryStringParameters': {
        'q': keyword
      }
    };

    var resultHtml = "";
    var result = await API.get(apiName, path, option);
    if ( result == null ) {
      resultHtml = "<p>null が返却されました。</p>"
    } else {
      // get data length
      var foundCount = result.body.length;
      if(foundCount > 0)
      {
        // header
        resultHtml = "<p>search result</p>";
        // make search result html
        for(let i = 0; i < foundCount; i++)
        {
          var hit = result.body[i];
          var plainText = hit.highlights.content;
          // create one
          //================================================================
          // create visible part of search result html
          resultHtml += "<hr>";
          resultHtml +=    "<div style=\"margin-bottom:1.5em\">\n";
          resultHtml +=    "  <p>case : " + i +  "</p>\n";
          resultHtml +=    "  <p>" + hit.highlights.name +  "</p>\n";
          resultHtml +=    "  <a href=\"" + hit.id + "\"  target=\"_blank\">" + hit.id + "</a>\n";
          resultHtml +=    "</div>\n";
          //================================================================
          //================================================================
          // create invisible part of search result html
          resultHtml +=    "<div onclick=\"obj=document.getElementById(\'open";
          resultHtml +=    i;
          resultHtml +=    "\').style; obj.display=(obj.display==\'none\')?\'block\':\'none\';\">\n";
          resultHtml +=    "  <a style=\"cursor:pointer;\">+ click to expand</a>\n";
          resultHtml +=    "</div>\n";
          resultHtml +=    "<div id=\"open" + i +  "\" style=\"display:none;clear:both;\">\n";
          resultHtml +=    "  <p>" + plainText + "</p>\n";
          resultHtml +=    "</div>\n";
          resultHtml +=    "<div style=\"margin-bottom:1.5em\">\n";
          resultHtml +=    "</div>\n";
          //================================================================
        }
      }
    }
    console.log('result = ' + result)
    document.getElementById('emb').innerHTML = resultHtml;
  };

  handleClick2 = async function () {
    const apiName = 'TestSearch'
    const path = ''
    const user = await Auth.currentAuthenticatedUser()
    const token = user.signInUserSession.idToken.jwtToken

    var textObj = document.getElementById('scTxt')
    var keyword = textObj.firstChild.value
      
    const option = {
      headers: {
        Authorization: token,
        'header1': token,
      },
      'queryStringParameters': {
        'q': keyword
      }
    };

    var resultHtml = "";
    var result = await API.get(apiName, path, option);
    if ( result == null ) {
      resultHtml = "<p>null が返却されました。</p>"
    } else {
      // get data length
      var foundCount = result.body.length;
      if(foundCount > 0)
      {
        // header
        resultHtml = "<p>search result</p>";
        // make search result html
        for(let i = 0; i < foundCount; i++)
        {
          var hit = result.body[i];
          var plainText = hit.highlights.content;
          // create one
          //================================================================
          // create visible part of search result html
          resultHtml += "<hr>";
          resultHtml +=    "<div style=\"margin-bottom:1.5em\">\n";
          resultHtml +=    "  <p>case : " + i +  "</p>\n";
          resultHtml +=    "  <p>" + hit.highlights.name +  "</p>\n";
          resultHtml +=    "  <a href=\"" + hit.id + "\"  target=\"_blank\">" + hit.id + "</a>\n";
          resultHtml +=    "</div>\n";
          //================================================================
          //================================================================
          // create invisible part of search result html
          resultHtml +=    "<div onclick=\"obj=document.getElementById(\'open";
          resultHtml +=    i;
          resultHtml +=    "\').style; obj.display=(obj.display==\'none\')?\'block\':\'none\';\">\n";
          resultHtml +=    "  <a style=\"cursor:pointer;\">+ click to expand</a>\n";
          resultHtml +=    "</div>\n";
          resultHtml +=    "<div id=\"open" + i +  "\" style=\"display:none;clear:both;\">\n";
          resultHtml +=    "  <p>" + plainText + "</p>\n";
          resultHtml +=    "</div>\n";
          resultHtml +=    "<div style=\"margin-bottom:1.5em\">\n";
          resultHtml +=    "</div>\n";
          //================================================================
        }
      }
    }
    console.log('result = ' + result)
    document.getElementById('emb').innerHTML = resultHtml;
  };

  handleClick3 = async function () {
    const apiName = 'PetStore'
    const path = '/3'
    const user = await Auth.currentAuthenticatedUser()
    const token = user.signInUserSession.idToken.jwtToken

    var textObj = document.getElementById('scTxt')
    var keyword = textObj.firstChild.value
      
    const option = {
      headers: {
        Authorization: token,
      },
      'queryStringParameters': {
        'q': keyword
      }
    };
    
    var res = API.get(apiName, path, option)
    .then(response => {
      console.log('reaponse = ' + response)
      document.getElementById('emb').innerHTML = response.type;
    })
    .catch(error => {
      console.log(error.response)
    });
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
            <AmplifyButton type="button" onclick={this.handleClick2}>検索2</AmplifyButton>
            <div id="emb">
  　        </div>
          </center>
        </AmplifyAuthenticator>
      </AmplifyContainer>
    );
  }
}

export default App;
