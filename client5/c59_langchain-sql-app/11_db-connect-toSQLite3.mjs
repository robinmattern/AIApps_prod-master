
  import * as dotenv     from "dotenv"; dotenv.config();
  import { SqlDatabase } from "langchain/sql_db";
  import { DataSource  } from "typeorm";

  try {
    var pDatasource = setDS_SQLite3( 'assets/chinook.db' )
        console.log('\n[11.1]    Loading SQLite3 database: ' + `./assets/chinook.db` ); 

    var db = await SqlDatabase.fromDataSourceParams( { appDataSource: pDatasource } );

        console.log( `[11.2]    pDatasource.isInitialized: ${ pDatasource.isInitialized }` );
        console.log( `[11.3]    pDatasource.isConnected:   ${ pDatasource.isConnected }` );
          
    var aTables = '\n             ' + db.allTables.map( (t) => t.tableName ).join( '\n             ' )
        console.log( `[11.4]    db.allTables.map: ${ aTables }` );
        /**
        [
          'Album',       'Artist',
          'Customer',    'Employee',
          'Genre',       'Invoice',
          'InvoiceLine', 'MediaType',
          'Playlist',    'PlaylistTrack',
          'Track'
        ]
        */
// var  pResult = await db.run( 'SELECT * FROM  Employees  where EmployeeId = 1' )
// var  pResult = await db.run( 'SELECT * FROM "employees" where EmployeeId = 1' )
// var  pResult = await db.run( 'SELECT * FROM "employees" where employeeid = 1' )
   var  pResult = await db.run( 'SELECT * FROM  employees  where employeeid = 1' )
        console.log( "[12.8]     pDB.run() pResult",  pResult );

        await closeDS( pDatasource ) 

    } catch( pErr ) {
        console.error("[11.5]   Error connecting to SQLite3:", pErr);

        }

function closeDS( db ) {
        console.log( "[11.6]    pDatasourse closing." );
        db.close( ( err ) => {
    if (err) {
        console.error( "[11.5]    Error closing pDatasourse:", err.message );
    } else {
        console.log( "[11.6]    pDatasourse closed successfully." );
        }
      } );
    }; // eof closeDS
//  ---------------------------------------------------------------            

function setDS_SQLite3( aDBname ) {
  //      console.log( "import.meta.url:",   import.meta.url.replace( import.meta.url.replace( /.+\//, "/" ), "" ) ) 
    var __dirname = import.meta.url.replace( import.meta.url.replace( /.+\//, "/" ), "" ).replace( /file:\/\//, "" ) // .replace( /:/, "" )
      var aAppDir = __dirname.replace(/\/[Ee]:/, "") 
  
  //  var aDataFile = `${aAppDir}/assets/chinook.db`
  //  var aDataFile = `${aAppDir}/assets/sakila.db`
      var aDataFile = `${aAppDir}/${aDBname}`
  
      var datasource = new DataSource(
           { type: "sqlite"
  //       , database: `./assets/chinook.db`              // .(40201.91.1 RAM Was ../../../../Chinook.db)
           , database: aDataFile                          // .(40201.91.1 RAM Was ../../../../Chinook.db)
             } );
  
   return datasource
          }
  
  