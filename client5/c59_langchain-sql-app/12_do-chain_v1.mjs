  
  import * as dotenv     from "dotenv"; dotenv.config();
  import { SqlDatabase } from "langchain/sql_db";
  import { DataSource  } from "typeorm";

  import { ChatOpenAI  } from "@langchain/openai";
  import { createSqlQueryChain } from "langchain/chains/sql_db";

  import _ from 'lodash'

  try {
//  var pDatasource = setDS_MySQL( 'world' )
//  var pDatasource = setDS( 'mysql',  'world' );             var aDBType = "MySQL"
  const pDatasource = setDS( 'sqlite', 'assets/chinook.db' ); var aDBType = "SQLite"
  const  datasource = new DataSource( {  type: "sqlite", database: "./assets/chinook.db", });

  //      console.log('\n[12.1]     Using MySQL database: ' + `world` ); 
        console.log('\n[12.1]     Loading SQLite3 database: ' + `./assets/chinook.db` ); 

  const  db = await SqlDatabase.fromDataSourceParams( { appDataSource:  datasource } );
  const pDB = await SqlDatabase.fromDataSourceParams( { appDataSource: pDatasource } );

        console.log( `[12.2]     aDatasource.isInitialized: ${ pDatasource.isInitialized }` );
        console.log( `[12.3]     aDatasource.isConnected: ${   pDatasource.isConnected   }` );
        console.log( "[12.3a]    Are DB and pDB deeply equal:", isDeepEqual(db, pDB));    


//  var pLLM        =  new   ChatOpenAI( { modelName: "gpt-3.5-turbo", temperature: 0 } );  // .(40202.01. RAM Was gpt-4)
  const  llm        =  new   ChatOpenAI( { temperature: 0 } );
  const pLLM        =  new   ChatOpenAI( { temperature: 0 } );                              // .(40202.01. RAM Using modelName causes bind error)

        console.log( "[12.4]     ChatOpenAI Model Created:" );
        console.log( "[12.4a]    Are llm and pLLM deeply equal:", isDeepEqual(llm, pLLM));    
      
//const pChain      =  await createSqlQueryChain( { pLLM, pDB, dialect: 'sqlite' } );
//const pChain      =  await createSqlQueryChain( {  llm, pDB, dialect: 'sqlite' } );
  const pChain      =  await createSqlQueryChain( {  llm,  db, dialect: 'sqlite' } );
  const  chain      =  await createSqlQueryChain( {  llm,  db, dialect: 'sqlite' } );
//const pChain      =  await createSqlQueryChain( { pLLM, pDB, dialect: aDBType.toLowerCase() } );
//const pChain      =  await createSqlQueryChain( { pLLM, pDB, dialect: 'sqlite' } );

        console.log( "[12.5]     Langchain SqlQueryChain Created:" );
        console.log( "[12.5a]    Are llm and pLLM deeply equal:", isDeepEqual(llm, pLLM));    

  var aQuestion = "How many employees are there?";
        console.log( "[12.6]     aQuestion:", aQuestion );

    var aResponse   =  await pChain.invoke( { question: aQuestion } );
        console.log( "[12.7]     pChain.invoke() pResponse:", aResponse );

    var aResult     =  await pDB.run( aResponse.toLowerCase() );
        console.log( "[12.8]     pDB.run() aResult",  aResult );

    } catch( pErr ) {
        console.error( `[12.9]   Error createSqlQueryChain to ${aDBType} db:`, pErr);
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
//  var aDataFile = `${aAppDir}/${aDBname}`
    var aDataFile = `./${aDBname}`
 
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
    
    function isDeepEqual(obj1, obj2) {

        if (obj1 === obj2) return true;
        return _.isEqual( obj1, obj2 ) ? "Yes" : "No"

        if (typeof obj1 !== 'object' || obj1 === null || typeof obj2 !== 'object' || obj2 === null) return false;
        const keys1 = Object.keys(obj1);
        const keys2 = Object.keys(obj2);
        if (keys1.length !== keys2.length) return false;
        for (const key of keys1) {
          if (!keys2.includes(key) || !isDeepEqual(obj1[key], obj2[key])) return false;
        }
        return true;
      }
      
