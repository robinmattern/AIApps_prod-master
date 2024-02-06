 import dotenv from 'dotenv'; dotenv.config() 
 import mysql  from 'mysql2/promise';

// 03.1 Write insert() function to be run inside main
//----------------------------------------------------
  async function insert( { pConnection, pComment } ) {      // .(40203.02.1 RAM Was create())
    const [ results ] = await pConnection.execute(
//  const   results   = await pConnection.execute(
            'INSERT INTO comments (commentid, commenter, comment, gpt, flag, respond) VALUES ( ?, ?, ?, ?, ?, ? )'
        , [ pComment.commentid, pComment.commenter, pComment.comment, pComment.gpt, pComment.flag, pComment.respond ]
          );
   return results.insertId;
        }
//----------------------------------------------------

// 01.1 Write main() function which is run at the end
//----------------------------------------------------
  async function main() {
    var pConnection 
    var pDBconfig = getDBconfig( 'DB3' )                    // .(40203.01.1 RAM Use getDBconfig())
    try {
    var pConnection = await mysql.createConnection( pDBconfig )
        console.log( `Successful connection to MySQL DB at: ${pDBconfig.host}.`);

// 03.2 Use insert() function inside main
//----------------------------------------------------
    var id = await insert( { pConnection, pComment:         // .(40203.02.2 RAM Was create())
         { commentid:  1
         , commenter: "Adrian Twarog"
         , comment  : "Why did the database go on a diet? It had too many tables!"
         , gpt      : ""
         , flag     :  0
         , respond  :  0 
           } 
        } );
        console.log( `Inserted row id: ${id}.` );    

    } catch( pErr ) {
        console.log(   `Failed to connect to MySQL DB at: ${pDBconfig.host}.`);
        console.error( `ERROR ${-pErr.errno}: ${pErr.message}` );
        process.exit(1);
    } finally {
    if (pConnection) {
        await pConnection.end();
        }
        }
    } // eof main 
//----------------------------------------------------

// 01.2 Call main() function 
//----------------------------------------------------
        main() 

//----------------------------------------------------

// 04.1 Write getDBconfig() function to be run inside main
//----------------------------------------------------
function getDBconfig(aDB) {                                 // .(40203.01.2 RAM Write getDBconfig())
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
