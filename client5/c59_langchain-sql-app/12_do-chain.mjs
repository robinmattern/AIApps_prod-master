  import * as dotenv     from "dotenv"; dotenv.config();
  import { SqlDatabase } from "langchain/sql_db";
  import { DataSource  } from "typeorm";

  import { ChatOpenAI  } from "@langchain/openai";
  import { createSqlQueryChain } from "langchain/chains/sql_db";

  var __dirname     =  import.meta.url.replace( import.meta.url.replace( /.+\//, "/" ), "" ).replace( /file:\/\//, "" ) // .replace( /:/, "" );
    var aAppDir     = __dirname.replace( /\/[Ee]:/, ""); 
    var aDataFile   = `${aAppDir}/assets/chinook.db`;

// try {
        console.log('\n[12.1]     Using SQLite3 database: ' + `./assets/chinook.db` ); 

    var pDatasource =  new   DataSource( { type: "sqlite", database: aDataFile } );
    var pDB         =  await SqlDatabase.fromDataSourceParams( { appDataSource: pDatasource } );

        console.log( `[12.2]     aDatasource.isInitialized: ${ pDatasource.isInitialized }` );
//      console.log( `[12.3]     aDatasource.isConnected: ${   pDatasource.isConnected   }` );

    var aQuestion = "How many employees are there?";
        console.log( "[12.4]     aQuestion:", aQuestion );

    try { 
    var pLLM        =  new   ChatOpenAI( { modelName: "gpt-4", temperature: 0 } );
    var pChain      =  await createSqlQueryChain( { pLLM, pDB, dialect: "sqlite" } );
        
    var pResponse   =  await pChain.invoke( { question: aQuestion } );
        console.log( "[12.5]     pChain.invoke() pResponse", pResponse );

    var aResult     =  await pDB.run( pResponse );
        console.log( "[12.6]     pDB.run() aResult",  aResult );

    } catch( pErr ) {
        console.error( pErr )  
        }
