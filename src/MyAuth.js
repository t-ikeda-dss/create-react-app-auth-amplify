import React from 'react';
import { ConfirmSignIn, ConfirmSignUp, ForgotPassword, SignIn, VerifyContact, withAuthenticator } from 'aws-amplify-react';
import MySignUp from './MySignup.js'


export function withMyAuthenticator(Comp, includeGreetings=false) {
  return withAuthenticator(Comp, includeGreetings, [
      <SignIn/>,
      <ConfirmSignIn/>,
      <VerifyContact/>,
      <MySignUp/>,
      <ConfirmSignUp/>,
      <ForgotPassword/>
    ]);
}
