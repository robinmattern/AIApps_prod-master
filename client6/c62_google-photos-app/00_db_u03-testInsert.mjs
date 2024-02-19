 import dotenv from 'dotenv'; dotenv.config()
 import mysql  from 'mysql2/promise';

// 03.1 Write insert() function to be run inside main
//----------------------------------------------------
  async function insert( { pConnection, pPhoto } ) {      // .(40203.02.1 RAM Was create())
    const [ results ] = await pConnection.execute(
//  const   results   = await pConnection.execute(
           'INSERT INTO photos (ID, URL, Size, UpdatedDT, CreatedDT, Action) VALUES ( ?, ?, ?, ?, ?, ? )'
        , [ pPhoto.ID, pPhoto.URL, pPhoto.Comment, pPhoto.Size, pPhoto.CreateDt, pPhoto.UpdateDt, DeleteDt, pPhoto.Action ]
          );
   return results.insertId;
        }
//----------------------------------------------------

// 01.1 Write main() function which is run at the end
//----------------------------------------------------
  async function main() {
    var pConnection
    var pDBconfig = getDBconfig( 'DB1' )                    // .(40203.01.1 RAM Use getDBconfig())
    try {
    var pConnection = await mysql.createConnection( pDBconfig )
        console.log( `\nSuccessful connection to MySQL DB at: ${pDBconfig.host}`);

// 03.2 Use insert() function inside main
//----------------------------------------------------
    var id = await insert( { pConnection, pPhoto:         // .(40203.02.2 RAM Was create())
         { ID       :  1
         , URL      : "Adrian Twarog"
         , Comment  : "Why did the database go on a diet? It had too many tables!"
         , Size     :  1024
         , CreateDt :  '2024-01-01'
         , UpdateDt :  '2024-01-02'
         , DeleteDt :  '2024-01-03'
         , Action   :  'dnload'
           }
        } );
        console.log( `Inserted row id: ${id}.` );

    } catch( pErr ) {
        console.log(   `\nFailed to connect to MySQL DB at: ${pDBconfig.host}`);
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
