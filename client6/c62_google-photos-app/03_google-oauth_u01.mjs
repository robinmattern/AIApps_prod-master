//import  fs   from 'fs/promises';
  import { exec   } from 'child_process';  // const { exec } = require('child_process');
  import { google } from 'googleapis';

//Replace with your downloaded credentials file path
//const credentialsPath = './path/to/your/credentials.json';
//const credentials     = JSON.parse( await fs.readFile( credentialsPath ) );  // Read credentials from file

    if (process.argv[1].replace( /.*[\\/]/, '' ).match( /google.oauth.*\.mjs/ )) {
        process.env.GOOGLE_PHOTOS_ACCESS_TOKEN = '' 
        process.env.GOOGLE_PHOTOS_AUTH_CODE = '' 
    var aAccessToken = await getAccessToken()
        console.log( "\n  aAccessToken: ", aAccessToken ) 
        }

  async function getAccessToken() {
  try {
    
  const existingToken = process.env.GOOGLE_PHOTOS_ACCESS_TOKEN;  // Check if access token exists and is not expired
    if (existingToken && isTokenValid( existingToken )) {
 return existingToken;
        }

  const credentials = { "web" :
        { "client_id"       :  process.env.GOOGLE_CLIENT_ID + ".apps.googleusercontent.com"  // 1098022921730-duu95t6fljj20rtildv07km7q55oapfb
        , "project_id"      : "photos-dev02-rob-1693697865078"
        , "auth_uri"        : "https://accounts.google.com/o/oauth2/auth"
        , "token_uri"       : "https://oauth2.googleapis.com/token"
        , "auth_provider_x509_cert_url" : "https://www.googleapis.com/oauth2/v1/certs"
        , "client_secret"   :  process.env.GOOGLE_SECRET   // "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"
        }  }    

  const scopes = ['https://www.googleapis.com/auth/photoslibrary.readonly'];  // Scopes for the API
//const redirectUri = 'YOUR_REDIRECT_URI';  //Replace with your redirect URI (configured in Google Cloud Console)
    
  const oAuth2Client = new google.auth.OAuth2(  // Initialize OAuth2 client
        credentials.web.client_id,
        credentials.web.client_secret,
//      redirectUri
        );
     
  const authorizationCode = process.env.GOOGLE_PHOTOS_AUTH_CODE;  // User needs to put AUTH_CODE into .env 
    if (authorizationCode) {                                      // Check if authorization code is available
     
const { tokens } = await oAuth2Client.getToken( authorizationCode );
        process.env.GOOGLE_PHOTOS_ACCESS_TOKEN  = tokens.access_token;
        process.env.GOOGLE_PHOTOS_REFRESH_TOKEN = tokens.refresh_token;
        return tokens.access_token;
        }  // eif authorizationCode 
//      -----------------------------------------------------------

  const authorizationUrl = oAuth2Client.generateAuthUrl( {  // Redirect user for authorization if no code or token available
        access_type: 'offline',
        scope: scopes,
        } );

        console.log( '\n Please visit this URL to authorize the application and get a GOOGLE_PHOTOS_AUTH_CODE:\n', authorizationUrl );
        openChrome( authorizationUrl )
// throw new Error('User authorization required');

  } catch (error) {
        console.error( error );
  throw error;
        }
   } // eof getAccessToken
// -------------------------------------------------------------------

function isTokenValid( token ) {
  // Implement logic to check token expiration (e.g., using token expiry time)
  // Replace with your actual token validation logic
  return true; // Placeholder for actual validation
         }
// -------------------------------------------------------------------

function openChrome ( aURL ) {
        aURL = aURL ? aURL : 'https://www.example.com';
//  var Chrome = '/C/Program Files/Google/Chrome/Application/chrome.exe'
    var Chrome = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
        exec( `"${Chrome}" "${aURL}"`, ( error, stdout, stderr ) => {
    if (error) {
        console.error(`Error opening URL: ${error.message}`);
    } else {
        console.log(`URL opened successfully`);
    }
  }); // exe Chrome
}

export default getAccessToken;

