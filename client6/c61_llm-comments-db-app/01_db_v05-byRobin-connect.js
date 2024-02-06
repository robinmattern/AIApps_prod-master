 import dotenv from 'dotenv'; dotenv.config() 
 import mysql  from 'mysql2/promise';

// 01.1 Write main() function which is run at the end
//----------------------------------------------------
  async function main() {
    var pConnection 
    try {
    var pConnection = await mysql.createConnection(
          { host:     process.env.DB2_MYSQL_HOST
          , user:     process.env.DB2_MYSQL_USER
          , password: process.env.DB2_MYSQL_PASSWORD
          , database: process.env.DB2_MYSQL_DATABASE
          , port:     3306 // Default MySQL port
//        , pool:     true 
          } );
        console.log(   `Successful connection to MySQL DB at: ${process.env.DB2_MYSQL_HOST}.`);

    } catch( pErr ) {
        console.log(   `Failed to connect to MySQL DB at: ${process.env.DB2_MYSQL_HOST}.`);
//      console.error( `ERROR:`,  pErr );
//      console.error( `ERROR: ${ pErr }` );
        console.error( `ERROR ${-pErr.errno}: ${pErr.message}` );
        process.exit(1);
    } finally {
    if (pConnection) {
        await pConnection.end();
        }
        }
    } // eof main 
//----------------------------------------------------

// 01.1 Call main() function 
//----------------------------------------------------
        main() 

//----------------------------------------------------

