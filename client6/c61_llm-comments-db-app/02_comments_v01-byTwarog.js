  import   dotenv   from 'dotenv'; dotenv.config() 
  import { google } from 'googleapis';
  import   fs       from 'fs' 

    var pYouTube = google.youtube(
         { version: 'v3'
         , auth: process.env.GOOGLE_API_KEY
           } );

        pYouTube.commentThreads.list(
         { part:      'snippet'   // only show the text original from the snippet
         , videoId:   'JTxsNm9IdYU'
         , maxResults: 100 }
       , ( pErr, pRes) => {
      if ( pErr ) { throw pErr };
        console.log( pRes.data.items );
    var aJSON = JSON.stringify( pRes.data.items );
        fs.writeFile( 'client6/c61_llm-comments-db-app/comments.json' 
                    ,  aJSON, 'utf8', ( pErr ) => { if ( pErr ) { throw pErr; }
        console. log( 'The file has been saved!' );
        } );
      } );
// -------------------------------------------------
