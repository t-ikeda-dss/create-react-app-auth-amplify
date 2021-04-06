import React, { Component } from 'react';
import { css } from 'glamor'
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
		        {...css(styles.input)}
                        placeholder="パスワード"
                        theme={theme}
                        type="password"
                        key="password"
                        name="password"
                        onChange={this.handleInputChange}
                    />
                    <input
                        placeholder="メールアドレス"
                        theme={theme}
                        key="email"
                        name="email"
                        onChange={this.handleInputChange}
                    />
                    <button data-component="Button" class="Button" onClick={this.signUp} theme={AmplifyTheme}>
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

const styles = {
  signUpHeader: {
    textAlign: 'left',
    margin: '0px 0px 20px'
  },
  button: {
    padding: '10px 60px',
    backgroundColor: '#ffb102',
    cursor: 'pointer',
    borderRadius: '30px',
    marginTop: 10,
    marginBottom: 10,
    ':hover': {
      backgroundColor: '#ffbb22'
    }
  },
  buttonText: {
    margin: 0,
    color: 'white'
  },
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    paddingTop: '15px',
  },
  formContainer: {
    padding: 20,
    width: 400,
    display: 'flex',
    flexDirection: 'column',
    boxShadow: "0px 0px 2px rgba(0, 0, 0, .2)",
    borderRadius: 20
  },
  input: {
    height: 40,
    marginBottom: '10px',
    border: 'none',
    outline: 'none',
    borderBottom: '2px solid #ffb102',
    fontSize: '16px',
    '::placeholder': {
      color: 'rgba(0, 0, 0, .3)'
    }
  },
}
