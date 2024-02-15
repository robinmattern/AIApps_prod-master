 import dotenv from 'dotenv'; dotenv.config( )  // npm install dotenv 
 import mysql  from 'mysql2/promise';           // npm install mysql2 mysql2-promise 

// 01.1 Write main() function which is run at the end
//----------------------------------------------------
  async function main() {
    var pConnection
    var pDBconfig = getDBconfig( 'DB1' )                    // .(40203.01.1 RAM Use getDBconfig())
    try {
    var pConnection = await mysql.createConnection( pDBconfig )
        console.log( `\nSuccessful connection to MySQL DB at: ${pDBconfig.host}`);

    } catch( pErr ) {
        console.log( `\nFailed to connect to MySQL DB at: ${pDBconfig.host}`);
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
function getDBconfig(aDB) {                                 // .(40203.03.1 RAM Write getDBconfig())
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
