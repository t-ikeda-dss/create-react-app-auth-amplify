import React from 'react';
import { ConfirmSignIn, ConfirmSignUp, ForgotPassword, SignIn, SignOut, VerifyContact, withAuthenticator } from 'aws-amplify-react';
import MySignUp from './MySignUp'
import { AmplifyTheme } from 'aws-amplify-react';

const myTheme = {
    ...AmplifyTheme,
    BackgroundColor: { color: 'blue',backgroundColor: 'blue' },
    button: { color: 'green',backgroundColor: 'green' },
    amazonSignInButton: { color: 'blue',backgroundColor: 'blue' },
    signInButton: { backgroundColor: 'blue' , color: 'blue'}
};

export function withMyAuthenticator(Comp, greetings) {
  return withAuthenticator(Comp, {includeGreetings: greetings, theme: myTheme }, [
      <SignIn/>,
      <SignOut/>,
      <ConfirmSignIn/>,
      <VerifyContact/>,
      <MySignUp override={'SignUp'}/>,
      <ConfirmSignUp/>,
      <ForgotPassword/>
    ]);
}
