import React from 'react';
import { ConfirmSignIn, ConfirmSignUp, ForgotPassword, SignIn, SignOut, VerifyContact, withAuthenticator } from 'aws-amplify-react';
import MySignUp from './MySignup.js'


export function withMyAuthenticator(Comp, includeGreetings=false) {
  return withAuthenticator(Comp, includeGreetings, [
      <SignIn/>,
      <SignOut/>,
      <ConfirmSignIn/>,
      <VerifyContact/>,
      <MySignUp/>,
      <ConfirmSignUp/>,
      <ForgotPassword/>
    ]);
}
