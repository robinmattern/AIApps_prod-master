 import dotenv from 'dotenv'; dotenv.config() 
 import mysql  from 'mysql2/promise';

// 03.1 Write insert() function to be run inside main
//----------------------------------------------------
  async function insert( { pConnection, pComment } ) {      // .(40203.03.1 RAM Write insert(), was create())
    var [ results ] = await pConnection.execute(
//  var   results   = await pConnection.execute(
         'INSERT INTO comments (commentid, commenter, comment, gpt, flag, respond) VALUES ( ?, ?, ?, ?, ?, ? )'
        , [ pComment.commentid, pComment.commenter, pComment.comment, pComment.gpt, pComment.flag, pComment.respond ]
          );
   return results.insertId;
        }
//----------------------------------------------------
    var TheDB = 'DB1'

//#01.1 Write main() function which is run at the end
//#06.1 Change main() into into addComments()) to insert mComments array
// 07.1 Turn addComments() general SQL exec function
//----------------------------------------------------
//async function addComments( mComments) {                  //#.(40204.07.1 RAM Change main() into addComments()).(40204.07.4)
  async function doComments( aVerb, mComments) {            // .(40204.07.1 RAM Change addComments() into execComments() )
    var pConnection 

//  var pDBconfig = getDBconfig( 'DB1' )                    //#.(40203.05.1 RAM Use getDBconfig())
    if (TheDB > "") {
//  var aDB       =  mComments ? mComments : 'DB1'          // .(40205.01.1)
    var pDBconfig =  getDBconfig( TheDB )                   // .(40205.01.2 RAM Use DB arg).(40203.05.1 RAM Use getDBconfig())
        pConnection = await mysql.createConnection( pDBconfig )
//      console.log( `Successful connection to MySQL DB at: ${pDBconfig.host}.`);
        }
    try {

// 03.2 Use insert() function inside main
// 07.2 Add switch statement 
//----------------------------------------------------
 switch(aVerb) {

  case 'lengths':  
// 07.9 Loop through mComments displaying length of each comment
//----------------------------------------------------
for (let i = 0; i < mComments.length; i++) {                // .(40204.07.9 RAM Add loop to get length)
    var pSnippet  =  mComments[i].snippet.topLevelComment.snippet  
        console.log( i, pSnippet.textOriginal.length );     // max: 3365 
        }
        break;

  case 'insert':  
// 06.2 Loop through mComments array calling insert() for each one
//----------------------------------------------------
        console.log( `Inserting ${mComments.length} comments into MySQL database.` )
for (let i = 0; i < mComments.length; i++) {               // .(40204.06.1 RAM Add loop)
    var pSnippet  =  mComments[i].snippet.topLevelComment.snippet // .(40204.08.2 RAM Create subObject) 
    var pComment  =                                         // .(.(40206.01.1 RAM Use object for argument )
         { commentid: mComments[i].id                       // .(40204.06.2 RAM Add data for ith comment)
         , commenter: pSnippet.authorDisplayName            // .(40204.08.3).(40204.06.3)
//       , comment  : pSnippet.textOriginal                 // .(40204.08.4).(40204.06.4)
//       , comment  : mComments[i].snippet.topLevelComment.snippet.textOriginal,           
         , comment  : cleanNonAscii(pSnippet.textOriginal) // .(40204.08.3 RAM replace single quotes).(40204.06.4)
         , gpt      : ""
         , flag     : 0
         , respond  : 0                                    
           } 
    var id = await insert( { pConnection, pComment } )      // .(40206.01.2).(40203.03.2 RAM Use insert, was create())
        console.log( `Inserted row id: ${id} - '${pComment.comment.substr(0,40).replace( /\n/g, "<br>" ) }...'` );    
        }
        break;
      
// 07.3 Delete all records from comments table
//----------------------------------------------------
  case 'delete':  
        await pConnection.execute( 'DELETE FROM comments;' );
        console.log( `Deleted all rows from comments table`);    
        break;

// 07.4 Select all records from comments table
//----------------------------------------------------
  case 'select': 
  var   aWhere = mComments ? `WHERE ${mComments}`  : ''                             // .(40204.12.1)  
  var [ mRows ] = await pConnection.execute( `SELECT * FROM comments ${aWhere}` );   // .(40204.12.2 RAM Add Where clause)  
        console.log( `Selected ${mRows.length} rows from comments table`);    
 return mRows;
        break;

// 07.5 Select all records from comments table
//----------------------------------------------------
  case 'update':  
//  var aCommentId = mComments[0]
    var pUpdate = mComments
//      await pConnection.execute( `UPDATE comments SET respond = 1 WHERE id = ${aCommentId}`);
        await pConnection.execute( `UPDATE comments SET ${pUpdate.set} WHERE ${pUpdate.where}`);
        break;

// 07.8 Connect
//----------------------------------------------------
  case 'connect':                                           // .)40204.07.8 RAM Added verb: connect)
    var aDB       =  mComments ? mComments : 'DB1'          // .(40205.01.1)
    var pDBconfig = getDBconfig(  aDB  )                    // .(40205.01.2 RAM Use DB arg).(40203.05.1 RAM Use getDBconfig())
        pConnection = await mysql.createConnection( pDBconfig )
        console.log( `\nSuccessful connection to MySQL DB at: ${pDBconfig.host}.`);
        TheDB = aDB 
//eturn pConnection      
        break;

// 07.6 Unknown doComments verb 
//----------------------------------------------------
      default: 
        console.log( `ERROR: Unknown doComments verb: ${aVerb}.`)
        break;
      } 
//----------------------------------------------------

    } catch( pErr ) {
        pErr.errno = pErr.errno ? pErr.errno : -999                               // .(40206.03.1 RAM Beg Modify error handling)
    if (`${pErr.errno}`.match( /1045|-999/)) {
        console.log(   `Failed to connect to MySQL DB at: ${pDBconfig.host}.`);
    } else { 
        console.log(   `Failure processing SQL ${aVerb} statement.`);
        }  
    if (pErr.errno == 1406) { 
        pErr.message = pErr.message.replace( /long /, `long (${pComment.comment.length}) `)
        }                                                                         // /(40206.03.2 RAM End)
        console.error( `* ERROR ${-pErr.errno}: ${pErr.message}` );
        process.exit(1);
    } finally {
    if (pConnection) {
        await pConnection.end();
        }
        }
    } // eof main 
//----------------------------------------------------

//#01.2 Call main() function 
//#06.3 Export addComments() function 
// 07.7 Export doComments() function 
//----------------------------------------------------
//      main()                                              //#.(40204.01.2).(40204.06.3 RAM Don't run main() now)
//xport default addComments                                 //#.(40204.06.3 RAM Don't export addComments()).(40204.07.7 RAM Export addComments())
 export default doComments                                  // .(40204.07.7 RAM Export doComments())
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

function cleanNonAscii( aStr ) {
        aStr = (TheDB == "DB2") ? aStr.replace(/[^\x00-\x7F]/g, "") : aStr
 return aStr.replace( /'/g, "\\'" );
        }
