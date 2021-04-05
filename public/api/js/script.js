// aws region
const cogniteRegion = 'ap-northeast-1';
// aws user pool id
const cognitoUserPoolId = 'ap-northeast-1_S01Kqn7pX';
// application client id
const cognitoClientId = '30j2k1vbmbsc85hqbi7omo8pp6';

//----------------------------------------------------------------------------------------
// Functions called from HTML
//----------------------------------------------------------------------------------------

// search API execution function
function callSearchApi() {

  // local storage key name
  var localStorageKey = "CognitoIdentityServiceProvider.30j2k1vbmbsc85hqbi7omo8pp6.dss_ikeda.idToken";
  // get cognito accesss token
  var idToken = localStorage.getItem( localStorageKey );
  // specified search word
  const searchwd = document.getElementById('scTxt').value;

  // parameter initialization
  //--AWS.config.region = cogniteRegion;
  //--AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  //--  IdentityPoolId: cognitoUserPoolId,
  //--});

  // authentication parameters
  var apigClient = apigClientFactory.newClient({
    accessKey: AWS.config.credentials.accessKeyId,
    secretKey: AWS.config.credentials.secretAccessKey,
    sessionToken: AWS.config.credentials.sessionToken,
    region: AWS.config.region,
  });

  // query string
  var params = {
    q: searchwd
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

    // embedded html
    embedded_html("apiresult", result.data);
  }).catch( function(result){
    // api call failed

    // show message
    alert('検索の実行に失敗しました。');
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
