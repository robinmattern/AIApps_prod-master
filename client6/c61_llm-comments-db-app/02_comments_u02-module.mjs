  import   dotenv   from 'dotenv'; dotenv.config()
  import { google } from 'googleapis';

// 05.1 Write function getYoutubeComments
// -------------------------------------------------
    var pYouTube = google.youtube(
         { version: 'v3'
         , auth: process.env.GOOGLE_API_KEY
           } );
// -------------------------------------------------

  async function getYoutubeComments( nComments ) {          // .(40206.04.1 RAM Add nComments )
    var nComments = nComments ? nComments : 20              // .(40206.04.2)
        console.log( `\nRetreiving ${nComments} comments from google.youtube.commentThreads API`)
 return new Promise( ( resolve, reject ) => {
        pYouTube.commentThreads.list(
         { part:      'snippet'
         , videoId:   'JTxsNm9IdYU'
         , maxResults: nComments }                          // .(40206.04.3)
        , (err, res) => {
           if ( err ) reject( err );
           resolve( res.data.items );
           } );
          } );
        } // eof getYoutubeComments
// -------------------------------------------------

// 05.2 Run function getYoutubeComments
// -------------------------------------------------
//  var mComments = await getYoutubeComments();                           //#.(40204.05.3 RAM Don't run it now)
//      console.log( `YouTube Comments Returned: ${mComments.length}.` ); //#.(40204.05.3)

// 05.3 Export getYoutubeComments
// -------------------------------------------------
 export default getYoutubeComments                                        //#.(40204.05.3 RAM Export getYoutubeComments)
