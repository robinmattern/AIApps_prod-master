  import   dotenv   from 'dotenv'; dotenv.config()
  import { google } from 'googleapis';

// 05.1 Write function getGooglePhotos
// -------------------------------------------------
    var pYouTube = google.youtube(
    photoslibrary.googleapis.com
         { version: 'v3'
         , auth: process.env.GOOGLE_API_KEY
           } );
// -------------------------------------------------

  async function getGooglePhotos( nPhotos ) {
    var nPhotos = nPhotos ? nPhotos : 20
        console.log( `\nRetreived ${nPhotos} photos from google.youtube.commentThreads API`)
 return new Promise( ( resolve, reject ) => {
        pYouTube.commentThreads.list(
         { part:      'snippet'
         , videoId:   'JTxsNm9IdYU'
         , maxResults: nPhotos }
        , (err, res) => {
           if ( err ) reject( err );
           resolve( res.data.items );
           } );
          } );
        } // eof getGooglePhotos
// -------------------------------------------------



 export default  getGooglePhotos
