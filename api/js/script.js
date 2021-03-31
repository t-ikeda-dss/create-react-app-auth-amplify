// app.js
import { apigClientFactory } from './apigClient.js';


// aws region
const region = 'ap-northeast-1';
// aws user pool id
const userpoolid = 'ap-northeast-1_S01Kqn7pX';
// application client id
const clientid = '30j2k1vbmbsc85hqbi7omo8pp6';

//----------------------------------------------------------------------------------------
// Functions called from HTML
//----------------------------------------------------------------------------------------

// search API execution function
function callSearchApi() {

  // local storage key name
  var localStorageKey = "CognitoIdentityServiceProvider.30j2k1vbmbsc85hqbi7omo8pp6.dss_ikeda.idToken";
  // get cognito accesss token
  var idToken = localStorage.getItem( localStorageKey );
  var keyword = "aws";

  // parameter initialization
  var AWS = require("aws-sdk");
  AWS.config.region = region;
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: userpoolid,
  });

  // authentication parameters
  var apigClient = apigClientFactory.newClient({
    accessKey: AWS.config.credentials.accessKeyId,
    secretKey: AWS.config.credentials.secretAccessKey,
    sessionToken: AWS.config.credentials.sessionToken,
    region: AWS.config.region,
  });

  // query string
  var params = {
    q: keyword
  };

  // body
  var body = {
  };

  // additional parameters
  var additionalParams = {
    headers: {
      // access token by cognito
      Authorization: idToken
    },
    queryParams: {
    }
  };

  // output execution log to debug console
  console.log('call searchFunctionGet');
  // call search api
  //  -> Call the OPTIONS method as well as the GET method internally for authentication
  apigClient.searchFunctionGet(params, body, additionalParams).then(function(result){
    // api call success
    return result.data;

    // embedded html
    //embedded_html("root", result.data);
  }).catch( function(result){
    // api call failed

    // show message
    alert('åüçıÇÃé¿çsÇ…é∏îsÇµÇ‹ÇµÇΩÅB');
  });
}

//----------------------------------------------------------------------------------------
// Functions used internally
//----------------------------------------------------------------------------------------

// embed html in iframe tag
function embedded_html(framename, html_text) {
  var objEmb = document.getElementById('emb');
  objEmb.innerHTML = html_text;
}
