// aws region
const region = 'ap-northeast-1';
// aws user pool id
const userpoolid = 'ap-northeast-1_Pif7YAiJv';
// application client id
const clientid = '57b2eetaf7vo2jo7gkvj2g0g4d';

//----------------------------------------------------------------------------------------
// Functions called from HTML
//----------------------------------------------------------------------------------------

// search API execution function
function callSearchApi() {

  // get cognito accesss token
  //--const idToken  = document.getElementById('result').value;
  var idToken = sessionStorage.getItem( "apitoken" );
  // specified search word
  const searchwd = document.getElementById('scTxt').value;

  // check input data
  if(!idToken) {
    alert('ログインしてください。');
    window.location.href = '../auth/auth.html';
    return;
  }
  if(!searchwd) {
    alert('検索キーワードを入力してください。');
    return;
  }

  // clear text-box
  //--document.getElementById('apiresult').value = "";

  // parameter initialization
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
  console.log('call testSearchGet');
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
  // get iframe tag
  var iframe = document.getElementById(framename);

  // make html
  var htmlTag = "<html>\n";
  htmlTag +=    "  <head>\n";
  htmlTag +=    "  </head>\n";
  htmlTag +=    "  <body class=\"m-auto\">\n";
  htmlTag +=    "    <font size=\"1\">";
  htmlTag +=    html_text;
  htmlTag +=    "\n";
  htmlTag +=    "    </font>\n";
  htmlTag +=    "  </body>\n";
  htmlTag +=    "</html>";

  var objEmb = document.getElementById('emb');
  objEmb.innerHTML = htmlTag;

  // embed execution
  //iframe.contentWindow.document.open();
  //iframe.contentWindow.document.write(htmlTag);
  //iframe.contentWindow.document.close();
}
