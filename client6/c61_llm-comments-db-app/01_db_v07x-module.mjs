 import dotenv from 'dotenv'; dotenv.config() 
 import mysql  from 'mysql2/promise';

// 03.1 Write insert() function to be run inside main
//----------------------------------------------------
  async function insert( { pConnection, pComment } ) {      // .(40203.03.1 RAM Write insert(), was create())
    const [ results ] = await pConnection.execute(
//  const   results   = await pConnection.execute(
            'INSERT INTO comments (commentid, commenter, comment, gpt, flag, respond) VALUES ( ?, ?, ?, ?, ?, ? )'
        , [ pComment.commentid, pComment.commenter, pComment.comment, pComment.gpt, pComment.flag, pComment.respond ]
          );
   return results.insertId;
        }
//----------------------------------------------------

//#01.1 Write main() function which is run at the end
// 07.1 Change main() into into addComments()) to insert mComments array
//----------------------------------------------------
  async function addComments( mComments) {                  // .(40204.07.1 RAM Change main() into addComments())
    var pConnection 
    var pDBconfig = getDBconfig( 'DB3' )                    // .(40203.05.1 RAM Use getDBconfig())
    try {
    var pConnection = await mysql.createConnection( pDBconfig )
        console.log( `Successful connection to MySQL DB at: ${pDBconfig.host}.`);

//#03.2 Use insert() function inside main
// 06.1 Loop through mComments array calling insert() for each one
//----------------------------------------------------
   for (let i = 0; i < mComments.length; i++) {             // .(40204.08.1 RAM Add loop)

    var id = await insert( { pConnection, pComment:         // .(40203.03.2 RAM Use insert, was create())
           { commentid: mComments[i].id                     // .(40204.08.2 RAM Beg Add data for ith comment)
           , commenter: mComments[i].snippet.topLevelComment.snippet.authorDisplayName
           , comment  : mComments[i].snippet.topLevelComment.snippet.textOriginal
           , gpt      : ""
           , flag     : 0
           , respond  : 0                                   // .(40204.08.3 RAM End)
             } 
          } );
          console.log( `Inserted row id: ${id} - '${pSnippet.textOriginal.substr(0,50).replace( /\n/g, "<br>" ) }...'` );    
        }
    } catch( pErr ) {
        console.log(   `Failed to connect to MySQL DB at: ${pDBconfig.host}.`);
        console.error( `ERROR ${-pErr.errno}: ${pErr.message}` );
        process.exit(1);
    } finally {
    if (pConnection) {
        await pConnection.end();
        }
      } // eof finally
    } // eof addComments 
//----------------------------------------------------

//#01.2 Call main() function 
// 06.3 Export addComments() function 
//----------------------------------------------------
//      main()                                              //#.(40204.01.2).(40204.06.3 RAM Don't run main() now)
 export default addComments                                 //#.(40204.06.3 RAM Don't export addComments())
//----------------------------------------------------

// 04.1 Write getDBconfig() function to be run inside main
//----------------------------------------------------
function getDBconfig(aDB) {                                 // .(40203.04.1 RAM Write getDBconfig())
    var pCfg =  
         { host:     process.env[`${aDB}_MYSQL_HOST`]
         , user:     process.env[`${aDB}_MYSQL_USER`]
         , password: process.env[`${aDB}_MYSQL_PASSWORD`]
         , database: process.env[`${aDB}_MYSQL_DATABASE`]
         , port:     3306 // Default MySQL port
           } 
 return pCfg            
        };
//----------------------------------------------------

