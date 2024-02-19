import { google } from 'googleapis';

// Replace with your downloaded JSON key file path
//const credentialsPath = './path/to/your/credentials.json';
  const pCredentials = { "web" :
       { "client_id"       :  process.env.GOOGLE_CLIENT_ID + ".apps.googleusercontent.com"  // 1098022921730-duu95t6fljj20rtildv07km7q55oapfb
       , "project_id"      : "photos-dev02-rob-1693697865078"
       , "auth_uri"        : "https://accounts.google.com/o/oauth2/auth"
       , "token_uri"       : "https://oauth2.googleapis.com/token"
       , "auth_provider_x509_cert_url" : "https://www.googleapis.com/oauth2/v1/certs"
       , "client_secret"   :  process.env.GOOGLE_SECRET   // "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"
    }  }    

async function getPhotosCredentials() {
  try {
    const auth = await google.auth.getClient({
      scopes: ['https://www.googleapis.com/auth/photoslibrary.readonly'],
      credentials: pCredentials   // await import( credentialsPath )
    });

    console.log('Successfully obtained credentials for Google Photos API');
    return auth;
  } catch (error) {
    console.error('Error obtaining credentials:', error);
    return null;
  }
}

getPhotosCredentials().then( auth => {
  if (auth) {
    // Use the 'auth' object to make API calls to the Google Photos Library
    // ... your code for using the Photos Library API
  }
});