import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { AmplifyAuthenticator, AmplifyContainer, AmplifySignIn, AmplifySignOut } from '@aws-amplify/ui-react'; 
import { AmplifyButton, AmplifyInput } from '@aws-amplify/ui-react'; 
import { I18n } from 'aws-amplify';
import { vocabularies } from './vocabularies2';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import menu_page from './mainmenu';
import search_page from './search';
import aws_exports from './aws-exports2';
Amplify.configure(aws_exports);

// 
I18n.putVocabularies(vocabularies);
I18n.setLanguage('ja');

class App extends React.Component {

  render() {
    return (
      <AmplifyContainer>
        <AmplifyAuthenticator>
          <AmplifySignIn slot="sign-in" hideSignUp></AmplifySignIn>
          <AmplifySignOut />
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={page1} />
              <Route exact path="/page2" component={page2} />　//追加　URLで/page2を指定するとpage2を表示する
            </Switch>
         </BrowserRouter>
         </AmplifyAuthenticator>
      </AmplifyContainer>
    );
  }
}

export default App;
