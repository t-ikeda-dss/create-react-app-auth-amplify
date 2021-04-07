import React from 'react';
import { ConfirmSignIn, ConfirmSignUp, ForgotPassword, SignIn, SignOut, VerifyContact, withAuthenticator } from 'aws-amplify-react';
import MySignUp from './MySignUp'

export function withMyAuthenticator(Comp, setting) {
  return withAuthenticator(Comp, setting, [
      <SignIn/>,
      <SignOut/>,
      <ConfirmSignIn/>,
      <VerifyContact/>,
      <MySignUp override={'SignUp'}/>,
      <ConfirmSignUp/>,
      <ForgotPassword/>
    ]);
}
