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
        console.log( `\nRetreived ${nComments} comments from google.youtube.commentThreads API`)
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
//  var mComments = await getYoutubeComments();                           //#.(40204.08.1 RAM Don't run it now)  
//      console.log( `YouTube Comments Returned: ${mComments.length}.` ); //#.(40204.08.1)

// 06.4 Export getYoutubeComments
// 12.1 Export getYoutubeComments as getComments               
// -------------------------------------------------
//xport default getYoutubeComments                                         //#.(40204.06.4 RAM Export getYoutubeComments)             
//xport { getYoutubeComments as getComments }                              //#.(40204.08.1 RAM Export getComments())             
//xport function getComments() { getYoutubeComments() }                    //#.(40204.08.1 RAM Export getComments())             
//export default getComments = getYoutubeComments                          //#.(40204.08.1 RAM Export getComments())             
//nction getComments() { return getYoutubeComments() }                     // .(40204.08.1 RAM Export getComments()).(40206.04.4)              
function getComments( nCnt ) { return getYoutubeComments( nCnt) }          // .(40206.04.4 RAM Pass the nComments arg) 

 export default getComments                                                // .(40204.08.2 RAM Export getComments())             
   
// -------------------------------------------------
  
    if (import.meta.url.replace( /.+\//, "" ) == process.argv[1].replace( /.+[\\\/]/, "" ) ) {
        getComments( 5 )  
        }