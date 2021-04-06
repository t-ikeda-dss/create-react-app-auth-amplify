//
//
//

//----------------------------------------------------------------------------------------
// Functions called from HTML
//----------------------------------------------------------------------------------------

// search API execution function
function callSearchApi() {

  // 
  var awsRegion = sessionStorage.getItem( "aws_region" );
  var awsPoolId = sessionStorage.getItem( "aws_poolid" );
  var awsclitid = sessionStorage.getItem( "aws_clitid" );

  // get user name
  var userNameKey = "CognitoIdentityServiceProvider." + awsclitid + ".LastAuthUser";
  var userName = localStorage.getItem( userNameKey );
  // get cognito id token
  var tokenKey = "CognitoIdentityServiceProvider." + awsclitid + "." + userName + ".idToken";
  var idToken = localStorage.getItem( tokenKey );
  
  // specified search word
  const searchwd = document.getElementById('scTxt').value;

  // parameter initialization
  AWS.config.region = awsRegion;
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: awsPoolId,
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
