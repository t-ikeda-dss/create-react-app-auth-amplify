import React, { Component } from 'react';
import { FormSection, SectionHeader, SectionBody, SectionFooter, InputRow, ButtonRow, Link, } from 'aws-amplify-react';
import { AmplifyTheme } from 'aws-amplify-react';
import file from './api/search.htm';
import logo from './logo.svg';
import './App.css';
import { withMyAuthenticator } from './MyAuth';
import Amplify, { Auth } from 'aws-amplify';
//--import { AmplifyAuthenticator } from '@aws-amplify/ui-react'; 
import { I18n } from 'aws-amplify';
import aws_exports from './aws-exports';
Amplify.configure(aws_exports);

const myTheme = {
    ...AmplifyTheme,
    BackgroundColor: { color: 'blue',backgroundColor: 'blue' },
    button: { color: 'green',backgroundColor: 'green' },
    amazonSignInButton: { color: 'blue',backgroundColor: 'blue' },
    signInButton: { backgroundColor: 'blue' , color: 'blue'}
};
 
const dict = {
  'ja': {
    'User does not exist.': "ユーザー名またはパスワードが正しくありません",
    'Incorrect username or password.': "ユーザー名またはパスワードが正しくありません",
    'Password did not conform with policy: Password not long enough': "パスワードが短すぎます",
    'Invalid session for the user, session is expired.': "セッションが無効です",
    'Password attempts exceeded': "パスワードを一定回数以上間違えたため、アカウントを無効にしました",
    'Account recovery requires verified contact information': "アカウントを復旧するには連絡先の確認が必要です",
    'Back to Sign In': "サインイン画面へ戻る",
    'Change Password': "パスワード変更",
    'Change': "変更",
    'Code': "確認コード",
    'Confirm a Code': "コードを確認する",
    'Confirm Sign In': "確認",
    'Confirm Sign Up': "サインアップ",
    'Confirm': "確認",
    'Email': "メールアドレス",
    'Forgot Password': "パスワードをお忘れの場合",
    'Loading...': "ロード中...",
    'New Password': "新しいパスワード",
    'No MFA': "MFAなし",
    'Password': "パスワード",
    'Phone Number': "電話番号",
    'Pick a File': "ファイルを選択する",
    'Resend a Code': "確認コードを再送する",
    'Resend Code': "確認コードを再送する",
    'Select MFA Type': "MFAタイプの選択",
    'Select your preferred MFA Type': "MFAタイプを選択してください",
    'Sign In Account': "サインイン",
    'Sign In': "サインイン",
    'Sign Out': "サインアウト",
    'Sign Up Account': "サインアップ",
    'Sign Up': "サインアップ",
    'Skip': "スキップする",
    'Submit': "保存",
    'Username': "ユーザー名",
    'Verify Contact': "確認",
    'Verify': "確認する"
   }
};

I18n.putVocabularies(dict);
I18n.setLanguage('ja');

function useScript(url) {
  const script = document.createElement('script');
  script.src = url;
  script.async = true;
  document.body.appendChild(script);
}

class App extends Component {
  
  componentDidMount() {
    useScript('https://sdk.amazonaws.com/js/aws-sdk-2.7.19.min.js');
    useScript('https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js');
    useScript('/api/js/script.js');
    useScript('/api/js/apigClient.js');
    useScript('/api/js/amazon-cognito-identity.min.js');
    useScript('/api/js/lib/axios/dist/axios.standalone.js');
    useScript('/api/js/lib/CryptoJS/components/hmac.js');
    useScript('/api/js/lib/CryptoJS/components/enc-base64.js');
    useScript('/api/js/lib/url-template/url-template.js');
    useScript('/api/js/lib/apiGatewayCore/sigV4Client.js');
    useScript('/api/js/lib/apiGatewayCore/apiGatewayClient.js');
    useScript('/api/js/lib/apiGatewayCore/simpleHttpClient.js');
    useScript('/api/js/lib/apiGatewayCore/utils.js');
    useScript('/api/js/lib/CryptoJS/rollups/hmac-sha256.js');
    useScript('/api/js/lib/CryptoJS/rollups/sha256.js');
    sessionStorage.setItem( "aws_region" , aws_exports.aws_project_region );
    sessionStorage.setItem( "aws_poolid" , aws_exports.aws_user_pools_id );
    sessionStorage.setItem( "aws_clitid" , aws_exports.aws_user_pools_web_client_id );
    
    fetch(file)
      .then( res => res.text() )
      .then( text => document.querySelector('#inner').innerHTML = text );
  }

  render() {
    return (
      <div id="inner"></div>
    );
  }
}

export default withMyAuthenticator(App, true, myTheme);
