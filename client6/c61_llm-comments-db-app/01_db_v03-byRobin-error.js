 import dotenv from 'dotenv'; 
 import mysql  from 'mysql2/promise';
//mport mysql  from 'mysql2';

// 01.1 Write main() function which is run at the end
//----------------------------------------------------
  async function main() {
  
    try {
        dotenv.config( { path: 'E:\\Repos\\Robin\\AIApps_\\dev01-robin\\client6\\c61_llm-comments-db-app\\.env_v03', override: true, debug: 0 } ) 
    var pConnection = await mysql.createConnection(
          { host:     process.env.DB3_MYSQL_HOST
          , port:     3306 // Default MySQL port
          , user:     process.env.DB3_MYSQL_USER
          , password: process.env.DB3_MYSQL_PASSWORD
          , database: process.env.DB3_MYSQL_DATABASE
//        , pool:     true 
            } );
        console.log(   `You have successfully connected to MySQL at ${process.env.DB3_MYSQL_HOST}.`);

    } catch( pErr ) {
        console.log(   `Failed to connect to MySQL DB at: ${process.env.DB3_MYSQL_HOST}.`);
        console.error( `ERROR:`,  pErr );
//      console.error( `ERROR: ${ pErr }` );  // prints pErr.message
//      console.error( `ERROR ${-pErr.errno}: ${pErr.message}` );
        process.exit(1);
    } finally {
    if (pConnection) {
        await pConnection.end();
        }
        }
    } // eof main 
//----------------------------------------------------

// 01.2 Call main() function 
// 02.1 Add await and process.exit()
//----------------------------------------------------
        main() 
//await main() 
//      process.exit() 

