//const fs = require('fs');
//const { google } = require('googleapis');
import   dotenv   from 'dotenv'; dotenv.config() 
import { google } from 'googleapis';

// Read credentials from file   
//const credentialsPath = './path/to/your/credentials.json';   // Replace with your downloaded credentials file path
//const credentials     =  JSON.parse( fs.readFileSync( credentialsPath ) );
//const credentials     =  JSON.parse( await fs.promises.readFile( credentialsPath ) );

 async function getAlbumsList() {
        try {
  const credentials = { "web" :
         { "client_id"       :  process.env.GOOGLE_CLIENT_ID + ".apps.googleusercontent.com"  // 1098022921730-duu95t6fljj20rtildv07km7q55oapfb
         , "project_id"      : "photos-dev02-rob-1693697865078"
         , "auth_uri"        : "https://accounts.google.com/o/oauth2/auth"
         , "token_uri"       : "https://oauth2.googleapis.com/token"
         , "auth_provider_x509_cert_url" : "https://www.googleapis.com/oauth2/v1/certs"
         , "client_secret"   :  process.env.GOOGLE_SECRET   // "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"
         }  }    
/*
//const scopes = [ 'https://www.googleapis.com/auth/photoslibrary.readonly' ]; // Set scopes for the API

  const oAuth2Client = new google.auth.OAuth2(  // Initialize OAuth2 client
            credentials.client_id,
            credentials.client_secret,
       //   credentials.redirect_uris[0],
       //   scopes
            );
           
//await oAuth2Client.getAccessToken();  // Get an access token
  await oAuth2Client.getAccessToken( { scope: scopes } ); // Use scopes here
*/  
     
  const accessToken = 'YOUR_ACCESS_TOKEN'; // Access token (replace with your actual token)
      
  const url      = 'https://photoslibrary.googleapis.com/v1/albums';  // API endpoint
  
  const headers  = {  // Authorization header
          Authorization: `Bearer ${accessToken}`,
          };
  
  const response =  await fetch( url, { headers } );  // Fetch albums data
  
   if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
        }
  
  const data     =  await response.json();
  
  const albums   =  data.albums;  // Process albums data
        console.log( '--- Albums ---' );
   for (const album of albums) {
        console.log( `ID: ${album.id}` );
        console.log( `Title: ${album.title}` );
        console.log( `Product URL: ${album.productUrl}` );
        console.log( `Cover Photo URL: ${album.coverPhotoBaseUrl}` );
        console.log( `Number of media items: ${album.mediaItemsCount }`);
        console.log( '---' );
        }
    
    if (data.nextPageToken) {   // Handle pagination if needed
        console.log('--- More albums available, use nextPageToken for pagination ---');
        }
    } catch (error) {
        console.error( error );
        }
    } // eof getAlbumsList
// --------------------------------------------------------------------------

  getAlbumsList();
  