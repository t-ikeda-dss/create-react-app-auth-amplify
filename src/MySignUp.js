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
import { AmplifyThemeType } from 'AmplifyTheme';
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
            <FormSection data-component="FormSection" theme={theme}>
              <div className="App">
                <SectionHeader theme={theme}>サインアップ</SectionHeader>
                <SectionBody theme={theme}>
                    <input 
                        autoFocus
                        placeholder="ユーザー名入力"
                        theme={theme}
                        key="username"
                        name="username"
                        onChange={this.handleInputChange}
                        data-component="InputRow"
                    />
                    <input
                        placeholder="パスワード"
                        theme={theme}
                        type="password"
                        key="password"
                        name="password"
                        onChange={this.handleInputChange}
                    />
                    <input
                        placeholder="メールアドレス"
                        theme={AmplifyTheme}
                        key="email"
                        name="email"
                        onChange={this.handleInputChange}
                    />
                    <button data-component="Button" class="Button" onClick={this.signUp} theme={AmplifyThemeType}>
                        サインアップ
                    </button>
                </SectionBody>
                <SectionFooter theme={theme}>
                    <div style={theme.col6}>
                        <Link theme={theme} onClick={() => this.changeState('confirmSignUp')}>
                            {I18n.get('Confirm a Code')}
                        </Link>
                    </div>
                    <div style={theme.col6}>
                        <Link theme={theme} onClick={() => this.changeState('signIn')}>
                            サインイン
                        </Link>
                    </div>
                </SectionFooter>
              </div>
            </FormSection>
        )
    }
}
