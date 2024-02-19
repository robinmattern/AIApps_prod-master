//const fs = require('fs');
//const { google } = require('googleapis');
import   dotenv   from 'dotenv'; dotenv.config() 
import { google } from 'googleapis';

// Read credentials from file   
//const credentialsPath = './path/to/your/credentials.json';   // Replace with your downloaded credentials file path
//const credentials     =  JSON.parse( fs.readFileSync( credentialsPath ) );

 async function getPhotosList() {
 try {
  const credentials = { "web" :
         { "client_id"       :  process.env.GOOGLE_CLIENT_ID + ".apps.googleusercontent.com"  // 1098022921730-duu95t6fljj20rtildv07km7q55oapfb
         , "project_id"      : "photos-dev02-rob-1693697865078"
         , "auth_uri"        : "https://accounts.google.com/o/oauth2/auth"
         , "token_uri"       : "https://oauth2.googleapis.com/token"
         , "auth_provider_x509_cert_url" : "https://www.googleapis.com/oauth2/v1/certs"
         , "client_secret"   :  process.env.GOOGLE_SECRET   // "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"
         }  }    

  const scopes = [ 'https://www.googleapis.com/auth/photoslibrary.readonly' ]; // Set scopes for the API

  const oAuth2Client = new google.auth.OAuth2(  // Initialize OAuth2 client
            credentials.client_id,
            credentials.client_secret,
       //   credentials.redirect_uris[0],
       //   scopes
            );
           
//await oAuth2Client.getAccessToken();  // Get an access token
  await oAuth2Client.getAccessToken( { scope: scopes } ); // Use scopes here

  const photos   =  google.photoslibrary( { version: 'v1', auth: oAuth2Client } );  // Create Photos library service
   
  const response =  await photos.albums.list({ pageSize: 10 });  // List albums
  const albums   =  response.data.albums;
   
  const photosList = [];  // Extract photos from each album
   for (const album of albums) {
        const albumPhotos = await photos.mediaItems.list({ albumId: album.id });
        photosList.push( ...albumPhotos.data.mediaItems );
        }

        console.log( photosList );

    } catch (error) {
         console.error(error);
        }
   }



        getPhotosList();