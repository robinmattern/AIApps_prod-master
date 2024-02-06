
  import * as dotenv     from "dotenv"; dotenv.config();
  import { SqlDatabase } from "langchain/sql_db";
  import { DataSource  } from "typeorm";

  try {
    var pDatasource = setDS_MySQL( 'world' )
        console.log('\n[11.1]    Loading MySQL database: ' + `world` ); 

    var pDB = await SqlDatabase.fromDataSourceParams( { appDataSource: pDatasource } );

        console.log( `[11.2]    pDatasource.isInitialized: ${ pDatasource.isInitialized }` );
        console.log( `[11.3]    pDatasource.isConnected:   ${ pDatasource.isConnected }` );

    var aTables = '\n             ' + pDB.allTables.map( (t) => t.tableName ).join( '\n             ' )
        console.log( `[11.4]    db.allTables.map: ${ aTables }` );
    /**
        [
          'Album',       'Artist',
          'Customer',    'Employee',
          'Genre',       'Invoice',
          'InvoiceLine', 'MediaType',
          'Playlist',    'PlaylistTrack',
          'Track'
        ] */ 

        await closeDS( pDatasource ) 

    } catch ( pErr ) {
        console.error("[11.5]   Error connecting to MySQL:", pErr);
        }
// ------------------------------------------------------------------

  function setDS_MySQL( aDBname ) {
    
    var datasource = new DataSource(
         { type:    'mysql'
         , host:     process.env.MYSQL_HOST
         , port:     3306 // Default MySQL port
         , username: process.env.MYSQL_USER
         , password: process.env.MYSQL_PASSWORD
         , database: aDBname ? aDBname : process.env.MYSQL_DATABASE
         , entities: [ "./path/to/your/entities/*.js"]  // Adjust entity path if needed
         , synchronize: true // Optional: Auto-generate database schema
           } )         
    return datasource
           }

function closeDS( db ) {
        console.log( "[11.6]    pDatasourse closing." );
        db.close( ( err ) => {
    if (err) {
        console.error( "[11.5]    Error closing pDatasourse:", err.message );
    } else {
        console.log( "[11.6]    pDatasourse closed successfully." );
        }
      } )
    } // eof closeDS           
