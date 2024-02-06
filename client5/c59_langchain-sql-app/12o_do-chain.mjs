  import * as dotenv      from "dotenv"; dotenv.config();
  import { SqlDatabase }  from "langchain/sql_db";
  import { DataSource  }  from "typeorm";

  import { ChatOpenAI  }  from "@langchain/openai";
  import { createSqlQueryChain } from "langchain/chains/sql_db";

       var __dirname   =  import.meta.url.replace( import.meta.url.replace( /.+\//, "/" ), "" ).replace( /file:\/\//, "" ) // .replace( /:/, "" );
       var aAppDir     = __dirname.replace( /\/[Ee]:/, "");
       var aDataFile   = `${aAppDir}/assets/chinook.db`;

     try {
  const datasource = new DataSource(
         { type:    "sqlite"
         , database: aDataFile
           } );

  const db = await SqlDatabase.fromDataSourceParams(
         { appDataSource: datasource
           } );

  const llm = new ChatOpenAI( { modelName: "gpt-3.5-turbo", temperature: 0 } );
  const chain = await createSqlQueryChain(
		     { llm
		     , db
		     , dialect: "sqlite"
		       } );

  const response = await chain.invoke(
         { question: "How many employees are there?",
           } );

        console.log( "response", response );
		/**
		response SELECT COUNT(*) FROM "Employee"
		 */

        console.log( "db run result", await db.run(response ) );
		/**
		db run result [{"COUNT(*)":8}]
		 */

    } catch( pErr ) {
        console.error( pErr )
        }

