  
  import * as dotenv     from "dotenv"; dotenv.config();
  import { SqlDatabase } from "langchain/sql_db";
  import { DataSource  } from "typeorm";

  import { ChatOpenAI  } from "@langchain/openai";
  import { createSqlQueryChain } from "langchain/chains/sql_db";

  try {
//  var pDatasource = setDS_MySQL( 'world' )
//  var pDatasource = setDS( 'mysql',  'world' );             var aDBType = "MySQL"
    var pDatasource = setDS( 'sqlite', 'assets/chinook.db' ); var aDBType = "SQLite"

//      console.log('\n[12.1]     Using MySQL database: ' + `world` ); 
        console.log('\n[12.1]     Loading SQLite3 database: ' + `./assets/chinook.db` ); 

    var pDB = await SqlDatabase.fromDataSourceParams( { appDataSource: pDatasource } );

        console.log( `[12.2]     aDatasource.isInitialized: ${ pDatasource.isInitialized }` );
        console.log( `[12.3]     aDatasource.isConnected: ${   pDatasource.isConnected   }` );

    var aQuestion = "How many employees are there?";
        console.log( "[12.4]     aQuestion:", aQuestion );

    var pLLM        =  new   ChatOpenAI( { modelName: "gpt-3.5-turbo", temperature: 0 } );  // .(40202.01. RAM Was gpt-4)
    var pChain      =  await createSqlQueryChain( { pLLM, pDB, dialect: aDBType.toLowerCase() } );
        
    var pResponse   =  await pChain.invoke( { question: aQuestion } );
        console.log( "[12.5]     pChain.invoke() pResponse", pResponse );

    var aResult     =  await pDB.run( pResponse );
        console.log( "[12.6]     pDB.run() aResult",  aResult );

    } catch( pErr ) {
        console.error( `[12.7]   Error createSqlQueryChain to ${aDBType} db:`, pErr);
        }

function setDS( aDBType, aDBname ) {
    if (aDBType == "mysql"  ) { return setDS_MySQL(   aDBname ) }
    if (aDBType == "sqlite" ) { return setDS_SQLite3( aDBname ) }
        }

function setDS_MySQL( aDBname ) {
    
    var pDatasource = new DataSource(
         { type: "mysql"
         , host: process.env.MYSQL_HOST
         , port: 3306 // Default MySQL port
         , username: process.env.MYSQL_USER
         , password: process.env.MYSQL_PASSWORD
         , database: aDBname ? aDBname : process.env.MYSQL_DATABASE
         , entities: [ "./path/to/your/entities/*.js"]  // Adjust entity path if needed
         , synchronize: true // Optional: Auto-generate database schema
           } )         
    return pDatasource
           }

function setDS_SQLite3( aDBname ) {
 //     console.log( "import.meta.url:",   import.meta.url.replace( import.meta.url.replace( /.+\//, "/" ), "" ) ) 
  var __dirname = import.meta.url.replace( import.meta.url.replace( /.+\//, "/" ), "" ).replace( /file:\/\//, "" ) // .replace( /:/, "" )
    var aAppDir = __dirname.replace(/\/[Ee]:/, "") 
 
 // var aDataFile = `${aAppDir}/assets/chinook.db`
 // var aDataFile = `${aAppDir}/assets/sakila.db`
    var aDataFile = `${aAppDir}/${aDBname}`
 
    var datasource = new DataSource(
         { type: "sqlite"
 //      , database: `./assets/chinook.db`              // .(40201.91.1 RAM Was ../../../../Chinook.db)
         , database: aDataFile                          // .(40201.91.1 RAM Was ../../../../Chinook.db)
           } );
 
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