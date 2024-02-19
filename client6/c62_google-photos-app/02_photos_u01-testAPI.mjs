  import   dotenv   from 'dotenv'; dotenv.config()
  import { google } from 'googleapis';

// 05.1 Write function getGooglePhotos
// -------------------------------------------------
    var pYouTube = google.youtube(

         { version: 'v3'
         , auth: process.env.GOOGLE_API_KEY
           } );
// -------------------------------------------------

  async function getGooglePhotos() {


 return new Promise( ( resolve, reject ) => {
        pYouTube.commentThreads.list(
         { part:      'snippet'
         , videoId:   'JTxsNm9IdYU'
         , maxResults: 100 }
        , (err, res) => {
           if ( err ) reject( err );
           resolve( res.data.items );
           } );
        } );
        } // eof getGooglePhotos
// -------------------------------------------------

// 05.2 Run function getYoutubeComments
// -------------------------------------------------
    var mComments = await getGooglePhotos();
        console.log( `Google Photos Returned: ${mPhoto.length}.` );
