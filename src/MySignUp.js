import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Amplify, { Auth, I18n } from 'aws-amplify';
import {
    SignUp,
    FormSection,
    SectionHeader,
    SectionBody,
    SectionFooter,
    InputRow,
    ButtonRow,
    Link,
} from 'aws-amplify-react';
//--import theme from "./theme";
import { AmplifyTheme } from 'aws-amplify-react';
//--import aws_exports from './aws-exports';
import awsconfig from './aws-exports';
//--Amplify.configure(aws_exports);
Amplify.configure(awsconfig);


export default class MySignUp extends SignUp {

    signUp() {
        const { username, password, email, phone_number, address } = this.inputs;
        const param = {
            username: username,
            password: password,
            attributes:{
                email: email,
            //--    phone_number: phone_number,
            //--    address: address
            }
        }
        alert(awsconfig.aws_user_pools_id);
        Auth.signUp(param)
            .then(() => this.changeState('confirmSignUp', username))
            .catch(err => this.error(err));
    }
    
    showComponent(theme) {
        const { hide } = this.props;
        if (hide && hide.includes(MySignUp)) { return null; }

        return (
            <div>
              <SignUp/>
            </div>
        )
    }
}
